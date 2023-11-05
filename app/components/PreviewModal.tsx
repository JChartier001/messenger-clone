"use client";

import usePreviewModal from "@/app/hooks/usePreviewModal";
import Gallery from "@/app/components/gallery";
import Info from "@/app/components/Info";
import Modal from "@/app/components/modals/StoreModal";

const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);
  const farm =
    product && product.farm
      ? {
          name: product?.farm.name,
          logo: product?.farm.logo,
          city: product?.farm.city,
          state: product?.farm.state,
        }
      : null;

  if (!product) {
    return null;
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery images={product.images} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <Info data={product} farm={farm} />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
