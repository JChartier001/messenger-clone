"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { UnitLabel } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import Separator from "@/app/components/ui/Separator";
import Heading from "@/app/components/ui/Heading";
import AlertModal from "@/app/components/modals/AlertModal";

interface SizeFormProps {
  initialData: UnitLabel | null;
}

const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit  unit label" : "Create unit label";
  const description = initialData
    ? "Edit a unit label."
    : "Add a new unit label";
  const toastMessage = initialData ? "Size updated." : "Size created.";
  const action = initialData ? "Save changes" : "Create";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: initialData || {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params?.farmId}/sizes/${params?.sizeId}`,
          data,
        );
      } else {
        await axios.post(`/api/${params?.farmId}/sizes`, data);
      }
      router.refresh();
      router.push(`/farm/${params?.farmId}/sizes`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params?.farmId}/sizes/${params?.sizeId}`);
      router.refresh();
      router.push(`/farm/${params?.farmId}/sizes`);
      toast.success("Size deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all products using this label first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
        <div className="gap-8 md:grid md:grid-cols-3">
          <Input
            id="name"
            label="Label"
            register={register}
            errors={errors}
            disabled={loading}
            placeholder="Label name i.e. bunch of 5 bananas, 1lb of apples, etc."
          />

          <Input
            id="value"
            label="Weight"
            register={register}
            errors={errors}
            disabled={loading}
            placeholder="approximate weight of the unit i.e. 1lb, 5oz, etc."
          />
        </div>
        <Button disabled={loading} className="ml-auto" type="submit">
          {action}
        </Button>
      </form>
    </>
  );
};

export default SizeForm;
