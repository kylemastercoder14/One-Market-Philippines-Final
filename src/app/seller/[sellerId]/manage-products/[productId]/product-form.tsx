"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Editor from "@/components/globals/editor";
import MultipleImageUpload from "@/components/globals/multiple-image-upload";
import { TagsInput } from "@/components/ui/tags-input";
import { generateSKU } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import ComboBox from "@/components/ui/combo-box";
import { SellerSubCategory } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { createProduct, updateProduct } from "@/actions/products";

interface SellerProductVariantOption {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface SellerProductVariant {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  sellerProductId: string;
  sellerProductVariantsOptions: SellerProductVariantOption[]; // Ensure this is included
}

export interface ProductFormProps {
  id: string;
  name: string;
  description: string;
  status: string;
  images: string[];
  brand: string;
  materials: string[];
  height: number;
  weight: number;
  sku: string;
  sellerProductVariants: SellerProductVariant[]; // Ensure this includes the updated type
  category: string;
  tags: string[];
  warrantyPeriod: string;
  warrantyPolicy: string;
  discount: number;
}

type Variation = {
  name: string;
  options: { name: string; price: number; stock: number }[];
  locked: boolean;
};

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Product name is required" })
    .max(100, { message: "Product name can't be more than 100 characters" }),
  description: z
    .string()
    .min(1, { message: "Product description is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  tags: z.array(z.string()).nonempty("Please at least one tag"),
  category: z.string().min(1, { message: "Category is required" }),
  discount: z.coerce.number().optional(),
  warrantyPeriod: z.string().optional(),
  warrantyPolicy: z.string().optional(),
  media: z
    .array(
      z.union([z.string().url(), z.instanceof(File)]).refine(
        (file) => {
          if (typeof file === "string") {
            return true; // URL is fine
          } else if (file instanceof File) {
            return file.size < 5 * 1024 * 1024; // Validate file size
          }
          return false;
        },
        {
          message: "Image size must be less than 5MB",
        }
      )
    )
    .max(7, {
      message: "Maximum 7 files are allowed",
    })
    .nullable(),
  brand: z.string().optional(),
  materials: z.array(z.string()).nonempty("Please at least one material"),
  height: z.coerce.number().optional(),
  weight: z.coerce.number().optional(),
  sku: z.string().min(1, { message: "SKU is required" }),
  variations: z
    .array(
      z.object({
        name: z.string().optional(),
        options: z
          .array(
            z.object({
              name: z.string().min(1, { message: "Option name is required" }),
              price: z.coerce
                .number()
                .min(0, { message: "Price must be a positive number" }),
              stock: z.coerce
                .number()
                .min(0, { message: "Stock must be a positive number" }),
            })
          )
          .min(1, { message: "At least one option is required" })
          .optional(),
      })
    )
    .optional(),
});

const ProductForm = ({
  subCategories,
  sellerId,
  initialData,
}: {
  subCategories: SellerSubCategory[];
  sellerId: string;
  initialData: ProductFormProps;
}) => {
  const [variations, setVariations] = useState<Variation[]>(
    initialData?.sellerProductVariants?.map((variant) => ({
      name: variant.name,
      options: variant.sellerProductVariantsOptions.map((option) => ({
        name: option.name,
        price: option.price,
        stock: option.stock,
      })),
      locked: false,
    })) || []
  );
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.name || "",
      description: initialData.description || "",
      status: initialData.status || "",
      media: initialData.images || [],
      brand: initialData.brand || "",
      materials: initialData.materials || [],
      height: initialData.height || 0,
      weight: initialData.weight || 0,
      sku: initialData.sku || "",
      variations:
        initialData?.sellerProductVariants?.map((variant) => ({
          name: variant.name,
          options: variant.sellerProductVariantsOptions.map((option) => ({
            name: option.name,
            price: option.price,
            stock: option.stock,
          })),
        })) || [],
      category: initialData.category || "",
      tags: initialData.tags || [],
      warrantyPeriod: initialData.warrantyPeriod || "",
      warrantyPolicy: initialData.warrantyPolicy || "",
      discount: initialData.discount || 0,
    },
  });

  useEffect(() => {
      setVariations(initialData?.sellerProductVariants?.map((variant) => ({
        name: variant.name,
        options: variant.sellerProductVariantsOptions.map((option) => ({
          name: option.name,
          price: option.price,
          stock: option.stock,
        })),
        locked: false,
      })) || []);
    }, [initialData]);

  useEffect(() => {
    form.setValue("variations", variations);
  }, [variations, form]);

  const handleOptionChange = (
    variationIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedVariations = [...variations];
    updatedVariations[variationIndex].options[optionIndex].name = value;

    // Add a new option when the last option is filled in
    if (
      optionIndex === updatedVariations[variationIndex].options.length - 1 &&
      value
    ) {
      updatedVariations[variationIndex].options.push({
        name: "",
        price: 0,
        stock: 0,
      });
    }

    setVariations(updatedVariations);
  };

  const handleLockVariation = (index: number) => {
    const updatedVariations = [...variations];
    updatedVariations[index].locked = !updatedVariations[index].locked;
    setVariations(updatedVariations);
  };

  const handleAddVariation = () => {
    setVariations([
      ...variations,
      { name: "", options: [{ name: "", price: 0, stock: 0 }], locked: false },
    ]);
  };

  const handleDeleteVariation = (index: number) => {
    const updatedVariations = [...variations];
    updatedVariations.splice(index, 1); // Remove variation at the given index
    setVariations(updatedVariations);
  };

  const handleDeleteOption = (variationIndex: number, optionIndex: number) => {
    const updatedVariations = [...variations];
    updatedVariations[variationIndex].options.splice(optionIndex, 1); // Remove option at the given index
    setVariations(updatedVariations);
  };

  const { isSubmitting } = form.formState;

  const handleGenerateSKU = () => {
    const newSKU = generateSKU();
    form.setValue("sku", newSKU);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (initialData) {
        const res = await updateProduct(values, initialData.id, sellerId);
        if (res.success) {
          toast.success(res.success);
          router.push(`/seller/${sellerId}/manage-products`);
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await createProduct(values, sellerId);
        if (res.success) {
          toast.success(res.success);
          router.push(`/seller/${sellerId}/manage-products`);
        } else {
          toast.error(res.error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-5 grid md:grid-cols-10 grid-cols-1 gap-5">
          <div className="md:col-span-7">
            <div className="bg-white border shadow rounded md p-3 mt-4 space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g 'Short sleeve t-shirt"
                        {...field}
                        maxLength={100}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      The product name cannot exceed 100 characters or contain
                      prohibited words.
                    </FormDescription>
                    <span className="absolute top-8 text-sm text-muted-foreground right-3">
                      {form.watch("title")?.length || 0}/100
                    </span>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                disabled={isSubmitting}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Editor {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="bg-white border shadow rounded md p-3 mt-4 space-y-4">
              <div className="grid md:grid-cols-2 grid:cols-1 gap-3">
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Brand{" "}
                        <span className="text-muted-foreground">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          {...field}
                          placeholder="Enter the brand name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="materials"
                  disabled={isSubmitting}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Materials</FormLabel>
                      <FormControl>
                        <TagsInput
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Enter the materials used"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid md:grid-cols-2 grid:cols-1 gap-3">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>
                        Weight{" "}
                        <span className="text-muted-foreground">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={isSubmitting}
                          {...field}
                          placeholder="Enter the weight"
                        />
                      </FormControl>
                      <span className="absolute top-8 text-sm text-muted-foreground right-3">
                        kg
                      </span>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>
                        Height{" "}
                        <span className="text-muted-foreground">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={isSubmitting}
                          {...field}
                          placeholder="Enter the height"
                        />
                      </FormControl>
                      <span className="absolute top-8 text-sm text-muted-foreground right-3">
                        cm
                      </span>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        {...field}
                        placeholder="Enter the sku"
                      />
                    </FormControl>
                    <span
                      onClick={handleGenerateSKU}
                      className="absolute cursor-pointer top-8 text-sm text-orange-600 font-semibold right-3"
                    >
                      Generate
                    </span>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="bg-white border shadow rounded md p-3 mt-4 space-y-4">
              <FormField
                control={form.control}
                name="media"
                disabled={isSubmitting}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Images</FormLabel>
                    <FormControl>
                      <MultipleImageUpload
                        onImageUpload={(urls) => field.onChange(urls)}
                        disabled={isSubmitting}
                        defaultValues={field.value?.map((file) =>
                          typeof file === "string"
                            ? file
                            : URL.createObjectURL(file)
                        )}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload 1 to 7 images in .png, .jpg, .jpeg, .webp format with a
                      resolution of at least 100*100 px. The file must not be
                      bigger than 5 MB and the aspect ratio should be 1:1.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="bg-white border shadow rounded md p-3 mt-4">
              {variations.map((variation, variationIndex) => (
                <div key={variationIndex} className="space-y-3">
                  <div className="flex items-center gap-2 w-full">
                    <FormField
                      control={form.control}
                      name={`variations.${variationIndex}.name` as const}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Variation Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Size, Color, Shape, Theme, Flavor"
                              {...field}
                              value={variation.name}
                              onChange={(e) => {
                                const updatedVariations = [...variations];
                                updatedVariations[variationIndex].name =
                                  e.target.value;
                                setVariations(updatedVariations);
                              }}
                              disabled={variation.locked || isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {variationIndex > 0 && (
                      <Button
                        type="button"
                        className="mt-7"
                        size="sm"
                        variant="ghost"
                        disabled={isSubmitting}
                        onClick={() => handleDeleteVariation(variationIndex)} // Delete Variation
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    )}
                  </div>

                  {/* Show options only if the variation name is not empty */}
                  {variation.name && (
                    <div className="ml-5">
                      <Label>Option Values</Label>
                      {variation.options.map((option, optionIndex) => (
                        <div
                          className="flex items-center gap-2"
                          key={optionIndex}
                        >
                          <Input
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option.name}
                            onChange={(e) =>
                              handleOptionChange(
                                variationIndex,
                                optionIndex,
                                e.target.value
                              )
                            }
                            disabled={variation.locked || isSubmitting}
                            className="mb-2"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            disabled={isSubmitting}
                            onClick={() =>
                              handleDeleteOption(variationIndex, optionIndex)
                            }
                          >
                            <Trash2 className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Show 'Done' button only if the variation name is not empty */}
                  {variation.name && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isSubmitting}
                      className="mt-2"
                      onClick={() => handleLockVariation(variationIndex)}
                    >
                      {variation.locked ? "Edit" : "Done"}
                    </Button>
                  )}

                  <Separator />
                </div>
              ))}

              {/* Show 'Add another variation' button only if at least one variation has a name */}
              {variations.some((variation) => variation.name) && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="text-orange-600 font-semibold hover:text-orange-500 bg-transparent hover:bg-transparent"
                  onClick={handleAddVariation}
                  disabled={isSubmitting}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add another variation
                </Button>
              )}
              <div className="mt-7">
                <Table className="mt-3">
                  <TableCaption>A list of your added variations.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[500px]">Variant</TableHead>
                      <TableHead>Price (₱)</TableHead>
                      <TableHead>Available Stocks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {variations.map((variation, variationIndex) =>
                      variation.options.map((option, optionIndex) => (
                        <TableRow key={`${variationIndex}-${optionIndex}`}>
                          <TableCell>{option.name}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={option.price}
                              onChange={(e) => {
                                const updatedVariations = [...variations];
                                updatedVariations[variationIndex].options[
                                  optionIndex
                                ].price = Number(e.target.value);
                                setVariations(updatedVariations);
                              }}
                              disabled={isSubmitting}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={option.stock}
                              onChange={(e) => {
                                const updatedVariations = [...variations];
                                updatedVariations[variationIndex].options[
                                  optionIndex
                                ].stock = Number(e.target.value);
                                setVariations(updatedVariations);
                              }}
                              disabled={isSubmitting}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="bg-white border shadow rounded md p-3 mt-4 space-y-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Product category</FormLabel>
                    <FormControl>
                      <ComboBox
                        disabled={isSubmitting}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select the product category"
                        data={subCategories.map((subCategory) => ({
                          label: subCategory.name,
                          value: subCategory.name,
                        }))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                disabled={isSubmitting}
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <TagsInput
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Enter the product tags"
                      />
                    </FormControl>
                    <FormDescription>
                      This will help customers find your product when they
                      search for it.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select the status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="In stock">In stock</SelectItem>
                          <SelectItem value="Out of stock">
                            Out of stock
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="bg-white border shadow rounded md p-3 mt-4 space-y-4">
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>
                      Discount{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder="Enter the discount"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <span className="text-muted-foreground absolute top-8 right-3">
                      %
                    </span>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="bg-white border shadow rounded md p-3 mt-4 space-y-4">
              <FormField
                control={form.control}
                name="warrantyPeriod"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>
                      Warranty period{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select the warranty period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1 week">1 week</SelectItem>
                          <SelectItem value="2 weeks">2 weeks</SelectItem>
                          <SelectItem value="3 weeks">3 weeks</SelectItem>
                          <SelectItem value="1 month">1 month</SelectItem>
                          <SelectItem value="3 months">3 months</SelectItem>
                          <SelectItem value="6 months">6 months</SelectItem>
                          <SelectItem value="9 months">9 months</SelectItem>
                          <SelectItem value="1 year">1 year</SelectItem>
                          <SelectItem value="2 years">2 years</SelectItem>
                          <SelectItem value="3 years">3 years</SelectItem>
                          <SelectItem value="5 years">5 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="warrantyPolicy"
                disabled={isSubmitting}
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>
                      Warranty Policy{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Editor
                        onChange={field.onChange}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-3 justify-end mt-5">
              <Button disabled={isSubmitting} type="submit">
                {initialData ? "Save Changes" : "Create Product"}
              </Button>
              <Button
                disabled={isSubmitting}
                onClick={() => router.back()}
                type="button"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
