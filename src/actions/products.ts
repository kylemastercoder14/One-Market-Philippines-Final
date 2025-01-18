/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { z } from "zod";
import db from "@/lib/db";

// Your schema definition remains unchanged
const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Product name is required" })
    .max(100, { message: "Product name can't be more than 100 characters" }),
  description: z
    .string()
    .min(1, { message: "Product description is required" }),
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

export const createProduct = async (
  values: z.infer<typeof formSchema>,
  sellerId: string
) => {
  try {
    console.log("Input Values:", values);

    // Validate input
    const validatedData = formSchema.parse(values);
    console.log("Validated Data:", validatedData);

    // Check if a product with the same name exists
    const existingProduct = await db.sellerProduct.findFirst({
      where: { name: validatedData.title, sellerId },
    });

    if (existingProduct) {
      return { error: "Product with this name already exists" };
    }

    // Prepare product data
    const productData = {
      name: validatedData.title,
      description: validatedData.description,
      tags: validatedData.tags,
      category: validatedData.category,
      discount: validatedData.discount || 0,
      warrantyPeriod: validatedData.warrantyPeriod || "",
      warrantyPolicy: validatedData.warrantyPolicy || "",
      images: (validatedData.media || []).filter(
        (item): item is string => typeof item === "string"
      ),
      brand: validatedData.brand || "",
      materials: validatedData.materials,
      height: validatedData.height || 0,
      weight: validatedData.weight || 0,
      sku: validatedData.sku,
      sellerId,
    };

    console.log("Product Data:", productData);

    // Create product
    const product = await db.sellerProduct.create({ data: productData });

    // Handle variations
    if (validatedData.variations) {
      for (const variation of validatedData.variations) {
        const variant = await db.sellerProductVariants.create({
          data: {
            name: variation.name || "",
            sellerProductId: product.id,
          },
        });

        if (variation.options) {
          const variantOptionsData = variation.options.map((option) => ({
            name: option.name,
            price: option.price,
            stock: option.stock,
            sellerProductVariantsId: variant.id,
          }));

          await db.sellerProductVariantsOptions.createMany({
            data: variantOptionsData,
          });
        }
      }
    }

    return { success: "Product created successfully" };
  } catch (error: any) {
    console.error("Error creating product:", error.message, error.stack);
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
