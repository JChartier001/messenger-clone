import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  conversationId: string;
}

export default async function POST(request: Request, { params }: { params: IParams }) { 
  try {

    const currentUser = await getCurrentUser();
    const { conversationId } = params;
    
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        messages: {
          include: {
            seen:true
          }
        },
        users: true
      }
    });

    if(!conversation) {
      return new NextResponse('Conversation not found', { status: 404 })
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if(!lastMessage) {
      return NextResponse.json(conversation)
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id
      },
      include: {
        sender: true,
        seen: true
      },
      data: {
        seen:{
      connect: {
            id: currentUser.id
          }
        }
      }
    })
return NextResponse.json(updatedMessage)
    
  } catch (error) {
    console.error(error, "MESSAGES_SEEN_ERROR");
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}