/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";

export const createProductWithVariants = async (values: any) => {
  try {
    // Destructure product data
    const {
      name,
      slug,
      description,
      tags,
      category,
      images,
      brand,
      materials,
      weight,
      height,
      sku,
      discount,
      warrantyPeriod,
      warrantyPolicy,
      sellerId,
      variants,
    } = values;

    // Check for an existing product with the same name and sellerId
    const existingProduct = await db.sellerProduct.findFirst({
      where: { name, sellerId },
    });

    if (existingProduct) {
      return { error: "Product with this name already exists" };
    }

    // Create the main product
    const createdProduct = await db.sellerProduct.create({
      data: {
        name,
        slug,
        description,
        tags,
        category,
        images,
        brand,
        materials,
        weight,
        height,
        sku,
        discount,
        warrantyPeriod,
        warrantyPolicy,
        sellerId,
      },
    });

    // Create variants and their options if provided
    if (variants && variants.length > 0) {
      for (const variant of variants) {
        const createdVariant = await db.sellerProductVariants.create({
          data: {
            name: variant.name,
            sellerProductSlug: createdProduct.slug,
          },
        });

        if (variant.options && variant.options.length > 0) {
          for (const option of variant.options) {
            await db.sellerProductVariantsOptions.create({
              data: {
                name: option.name,
                image: option.image || null,
                price: option.price || 0,
                stock: option.stock || 0,
                sellerProductVariantsId: createdVariant.id,
              },
            });
          }
        }
      }
    }

    return {
      success: "Product created successfully",
      product: createdProduct,
      sellerId: sellerId,
    };
  } catch (error: any) {
    console.error("Error creating product:", error.message, error.stack);
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export const createProduct = async (values: any, sellerId: string) => {
  try {
    // Destructure product data
    const {
      title,
      slug,
      description,
      tags,
      category,
      media,
      price,
      brand,
      materials,
      weight,
      height,
      sku,
      discount,
      warrantyPeriod,
      warrantyPolicy,
    } = values;

    // Check for an existing product with the same name and sellerId
    const existingProduct = await db.sellerProduct.findFirst({
      where: { name: title, sellerId },
    });

    if (existingProduct) {
      return { error: "Product with this name already exists" };
    }

    // Create the main product
    const createdProduct = await db.sellerProduct.create({
      data: {
        name: title,
        slug,
        description,
        tags,
        category,
        images: media,
        price,
        brand,
        materials,
        weight,
        height,
        sku,
        discount,
        warrantyPeriod,
        warrantyPolicy,
        sellerId,
      },
    });

    return {
      success: "Product created successfully",
      product: createdProduct,
    };
  } catch (error: any) {
    console.error("Error creating product:", error.message, error.stack);
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
