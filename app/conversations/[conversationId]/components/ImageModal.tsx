import React from "react";
import Modal from "../../../components/modals/Modal";
import Image from "next/image";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-80 w-80">
        <Image src={src} fill alt="image" />
      </div>
    </Modal>
  );
};

export default ImageModal;
