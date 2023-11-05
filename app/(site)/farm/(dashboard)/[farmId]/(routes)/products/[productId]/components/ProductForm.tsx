"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/app/components/ui/use-toast";
import { Trash } from "lucide-react";
import { Category, Image, Product, UnitLabel, Dietary } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Separator } from "@/app/components/ui/separator";
import Heading from "@/app/components/ui/Heading";
import AlertModal from "@/app/components/modals/AlertModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import ImageUpload from "@/app/components/ui/ImageUpload";
import { Checkbox } from "@/app/components/ui/checkbox";
import MultiSelect from "@/app/components/ui/MultiSelect";

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  dietaryId: z.array(z.string().min(1)),
  labelId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  shortDescription: z.string().min(1),
  longDescription: z.string().optional(),
  stockQuantity: z.coerce.number().min(1).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;
  categories: Category[];
  dietary: Dietary[];
  sizes: UnitLabel[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  dietary,
  sizes,
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product." : "Add a new product";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? {
        ...initialData,
        price: parseFloat(String(initialData?.price)),
      }
    : {
        name: "",
        images: [],
        price: undefined,
        categoryId: undefined,
        labelId: undefined,
        isFeatured: false,
        dietaryId: [],
        isArchived: false,
        shortDescription: undefined,
        longDescription: undefined,
        stockQuantity: undefined,
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.farmId}/products/${params.productId}`,
          data,
        );
      } else {
        await axios.post(`/api/${params.farmId}/products`, data);
      }
      router.refresh();
      router.push(`/farm/${params.farmId}/products`);
      toast({ description: toastMessage });
    } catch (error: any) {
      toast({ description: "Something went wrong.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.farmId}/products/${params.productId}`);
      router.refresh();
      router.push(`/farm/${params.farmId}/products`);
      toast({ description: "Product deleted." });
    } catch (error: any) {
      toast({ description: "Something went wrong.", variant: "destructive" });
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <div className='gap-8 md:grid md:grid-cols-2'> */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Product name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem className="mt-4 md:mt-0">
                <FormLabel>Product Subtitle</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Short Product description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* </div> */}
          {/* <div className='flex flex-col space-y-4'> */}
          <FormField
            control={form.control}
            name="longDescription"
            render={({ field }) => (
              <FormItem className="mt-4 md:mt-0">
                <FormLabel>Full Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    disabled={loading}
                    placeholder="Product Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* </div> */}
          {/* <div className='gap-8 md:grid md:grid-cols-3 lg:grid-cols-4'> */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="9.99"
                    {...field}
                    // type='number'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stockQuantity"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Stock Quantity</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Quantity in stock"
                    // type='number'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Category</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a category"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(
                      (category) =>
                        category.slug !== "all" && (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ),
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dietaryId"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Dietary</FormLabel>
                <MultiSelect
                  name={field.name}
                  label={"Select dietary option"}
                  value={field.value}
                  defaultValue={field.value}
                  onChange={(selection: string) =>
                    field.onChange([...field.value, selection])
                  }
                  onRemove={(selection) =>
                    field.onChange([
                      ...field.value.filter((current) => current !== selection),
                    ])
                  }
                  options={dietary.map(
                    (dietary: { name: string; id: string }) => ({
                      label: dietary.name,
                      value: dietary.id,
                    }),
                  )}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="labelId"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Label</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a label"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sizes.map((size: { name: string; id: string }) => (
                      <SelectItem key={size.id} value={size.id}>
                        {size.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="mt-4 flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    // @ts-ignore
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Featured</FormLabel>
                  <FormDescription>
                    This product will appear on the home page
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isArchived"
            render={({ field }) => (
              <FormItem className="mt-4 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    // @ts-ignore
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Archived</FormLabel>
                  <FormDescription>
                    This product will not appear anywhere in the farm.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          {/* </div> */}
          <Button
            disabled={loading}
            className="ml-auto"
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
