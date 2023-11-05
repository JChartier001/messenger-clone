"use client";

import { useEffect, useState } from "react";

import Modal from "@/app/components/modals/Modal";
import Button from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading?: boolean;
  action?: string;
}

const MustBeSignedInModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  loading,
  action,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={`You must be signed in to ${action}`}
      description={`Please sign in to ${action} and continue.`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          variant="default"
          onClick={() => router.push("/auth")}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default MustBeSignedInModal;
