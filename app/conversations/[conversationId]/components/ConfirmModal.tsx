"use client";
import React, { useState, useCallback } from "react";
import Modal from "@/app/components/modals/Modal";
import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import toast from "react-hot-toast";
import { IoTrash } from "react-icons/io5";
import { FiAlertTriangle } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import {Button} from "@/app/components/ui/Button";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);
    try {
      axios.delete(`/api/conversations/${conversationId}`).then((res) => {
        onClose();
        router.push("/conversations");
        router.refresh();
        toast.success("Conversation deleted successfully");
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, onClose, router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertTriangle
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base leading-6 font-semibold text-gray-900"
          >
            Delete Conversation
          </Dialog.Title>
          <div className="mt-2">
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this conversation? All of your
                data will be permanently removed. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
