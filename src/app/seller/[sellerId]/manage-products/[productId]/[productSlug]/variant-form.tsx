"use client";

import React, { useState } from "react";
import useProduct from "@/hooks/use-product";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VariantImageUpload from "@/components/globals/variant-image-upload";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { createProductWithVariants } from "@/actions/products";
import { useRouter } from "next/navigation";
import AlertModal from "@/components/ui/alert-modal";

const VariantForm = ({ productSlug }: { productSlug: string }) => {
  const items = useProduct((state) => state.items);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const addItem = useProduct((state) => state.addItem);
  const deleteAllItem = useProduct((state) => state.removeAll);
  const router = useRouter();
  const decodedSlug = decodeURIComponent(productSlug);
  const productIndex = items.findIndex((item) => item.slug === decodedSlug);
  const product = items[productIndex];

  const [variants, setVariants] = useState(
    (product?.variants?.length ?? 0 > 0)
      ? product.variants
      : [{ name: "", options: [{ name: "", price: 0, stock: 0, image: "" }] }]
  );

  const handleAddVariant = () => {
    setVariants([
      ...(variants ?? []),
      { name: "", options: [{ name: "", price: 0, stock: 0, image: "" }] },
    ]);
  };

  const handleAddOption = (variantIndex: number) => {
    const updatedVariants = [...(variants ?? [])];
    updatedVariants[variantIndex].options.push({
      name: "",
      price: 0,
      stock: 0,
      image: "",
    });
    setVariants(updatedVariants);
  };

  const handleDeleteOption = (variantIndex: number, optionIndex: number) => {
    const updatedVariants = [...(variants ?? [])];
    updatedVariants[variantIndex].options.splice(optionIndex, 1);
    setVariants(updatedVariants);
  };

  const handleDeleteVariant = (variantIndex: number) => {
    const updatedVariants = [...(variants ?? [])];
    updatedVariants.splice(variantIndex, 1);
    setVariants(updatedVariants);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const updatedProduct = { ...product, variants };
      addItem(updatedProduct);
      const res = await createProductWithVariants(updatedProduct);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.success);
        deleteAllItem();
        router.push(`/seller/${res.sellerId}/manage-products`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product variants");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    deleteAllItem();
    router.push(`/seller/${product.sellerId}/manage-products`);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleCancel}
      />
      <div>
        <h1 className="text-2xl font-bold">{product?.name}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveChanges();
          }}
        >
          {variants?.map((variant, variantIndex) => (
            <div
              key={variantIndex}
              className="bg-white border shadow rounded-md p-3 mt-4"
            >
              <div className="space-y-2 mb-4">
                <Label>Variant Name</Label>
                <Input
                  disabled={loading}
                  value={variant.name}
                  onChange={(e) => {
                    const updatedVariants = [...(variants ?? [])];
                    updatedVariants[variantIndex].name = e.target.value;
                    setVariants(updatedVariants);
                  }}
                  placeholder="e.g. 'Color, Size, Theme'"
                />
              </div>
              {variant.options.map((option, optionIndex) => (
                <div key={optionIndex} className="space-y-3 mb-3">
                  <div className="flex items-center w-full gap-3">
                    <div className="space-y-2 w-full">
                      <Label>Option Name</Label>
                      <Input
                        disabled={loading}
                        value={option.name}
                        onChange={(e) => {
                          const updatedVariants = [...variants];
                          updatedVariants[variantIndex].options[
                            optionIndex
                          ].name = e.target.value;
                          setVariants(updatedVariants);
                        }}
                        placeholder="e.g. 'S, Red, Dark'"
                      />
                    </div>
                    <div className="space-y-2 w-full">
                      <Label>Price (₱)</Label>
                      <Input
                        disabled={loading}
                        type="number"
                        value={option.price}
                        onChange={(e) => {
                          const updatedVariants = [...variants];
                          updatedVariants[variantIndex].options[
                            optionIndex
                          ].price = Number(e.target.value);
                          setVariants(updatedVariants);
                        }}
                        placeholder="e.g. '500'"
                      />
                    </div>

                    <div className="space-y-2 w-full">
                      <Label>Stock</Label>
                      <Input
                        disabled={loading}
                        type="number"
                        value={option.stock}
                        onChange={(e) => {
                          const updatedVariants = [...variants];
                          updatedVariants[variantIndex].options[
                            optionIndex
                          ].stock = Number(e.target.value);
                          setVariants(updatedVariants);
                        }}
                        placeholder="e.g. '20'"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Image</Label>
                    <VariantImageUpload
                      disabled={loading}
                      defaultValue={option.image}
                      onVariantImageUpload={(image) => {
                        const updatedVariants = [...variants];
                        updatedVariants[variantIndex].options[
                          optionIndex
                        ].image = image;
                        setVariants(updatedVariants);
                      }}
                    />
                  </div>
                  <Button
                    disabled={loading}
                    size="sm"
                    variant="ghost"
                    type="button"
                    onClick={() =>
                      handleDeleteOption(variantIndex, optionIndex)
                    }
                  >
                    Delete Option
                  </Button>
                </div>
              ))}
              <Button
                disabled={loading}
                size="sm"
                type="button"
                onClick={() => handleAddOption(variantIndex)}
              >
                + Add Another Option
              </Button>
              <Separator className="my-4" />
              <Button
                disabled={loading}
                size="sm"
                variant="ghost"
                type="button"
                onClick={() => handleDeleteVariant(variantIndex)}
              >
                Delete Variant
              </Button>
            </div>
          ))}
          <Button
            disabled={loading}
            variant="ghost"
            type="button"
            onClick={handleAddVariant}
            className="hover:bg-transparent text-orange-600 hover:text-orange-600/90"
          >
            + Add Another Variant
          </Button>
          <div className="flex gap-2 mt-5 items-center justify-end">
            <Button type="submit" disabled={loading}>
              Save Changes
            </Button>
            <Button
              onClick={() => setOpen(true)}
              disabled={loading}
              variant="ghost"
              type="button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default VariantForm;
