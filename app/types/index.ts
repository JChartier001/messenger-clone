import { Conversation, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};

export interface Product {
	id: string;
	category: Category;
	name: string;
	price: number;
	isFeatured: boolean;
	images: Image[];
	label: Label;
	longDescription: string;
	slug: string;
	shortDescription: string;
	dietary: Dietary[];
	stockQuantity: number;
}
export type Label = {
	name: string;
};

export interface Image {
	id?: string;
	url: string;
}
export interface Category {
	id: string;
	name: string;
	slug: string;
}
export interface Dietary {
	id: string;
	name: string;
	slug: string;
}
export interface Item extends Product {
	id: string;
	farmId?: string; // Ensuring this is a string and not optional
	price: number;
	quantity?: number; // Since we're setting it during add, it can be optional here
	subtotal?: number;
	farm?: Farm; // Optional because it's calculated later
	// ... Add other properties as needed (category, name, etc.)
}
export interface Farm {
  id: string;
  name: string;
  slug: string;
  logo: Image[];
  image: Image[];
  bio: string;
  city: string;
  state: string;
  policies: string;
  certifications?: string;
  pickupInfo: string;
  deliveryRadius: string;
  products?: Product[];
}
export type FarmLogoType = {
	name: string;
	city: string;
	state: string;
	logo: Image[];
};

export interface ColumnDef<T> {
	accessorKey: keyof T;
	header: string;
	className?: string; 
}