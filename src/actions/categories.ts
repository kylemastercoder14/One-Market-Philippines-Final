"use server";

import db from "@/lib/db";

export const createCategory = async (data: {
  name: string;
  slug: string;
  subCategories: string[];
}) => {
  if (!data || !data.name || !data.slug || !data.subCategories?.length) {
    return { error: "Please fill all required fields" };
  }

  try {
    const existingCategory = await db.sellerCategory.findFirst({
      where: {
        OR: [
          {
            name: data.name,
          },
          {
            slug: data.slug,
          },
        ],
      },
    });

    if (existingCategory) {
      return { error: "Category name or slug already exists" };
    }

    // Create the main category
    const category = await db.sellerCategory.create({
      data: {
        name: data.name,
        slug: data.slug,
      },
    });

    // Loop through subcategories
    for (const subCategory of data.subCategories) {
      if (!subCategory?.trim()) continue;

      // Create a new subcategory linked to this category, even if the name already exists elsewhere
      await db.sellerSubCategory.create({
        data: {
          name: subCategory.trim(),
          slug: `${data.slug}-${subCategory.trim().toLowerCase().replace(/\s+/g, "-")}`,
          sellerCategorySlug: category.slug,
        },
      });
    }

    return { success: "Category created successfully" };
  } catch (error) {
    console.error("Error creating category:", error);

    if (error instanceof Error) {
      return { error: `An error occurred: ${error.message}` };
    }

    return { error: "Something went wrong. Please try again." };
  }
};

export const updateCategory = async (data: {
  id: string;
  name: string;
  slug: string;
  subCategories: string[];
}) => {
  if (!data.name || !data.slug || !data.subCategories.length) {
    return { error: "Please fill all required fields" };
  }

  try {
    const res = await db.sellerCategory.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        slug: data.slug,
      },
    });

    if (!res) {
      return { error: "Something went wrong. Please try again" };
    }

    await db.sellerSubCategory.deleteMany({
      where: {
        sellerCategorySlug: data.slug,
      },
    });

    await Promise.all(
      data.subCategories.map(async (subCategory) => {
        await db.sellerSubCategory.create({
          data: {
            name: subCategory,
            sellerCategorySlug: data.slug,
            slug: subCategory.trim().toLowerCase().replace(/\s+/g, "-"),
          },
        });
      })
    );

    return { success: "Category updated successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again" };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    await db.sellerCategory.delete({
      where: {
        id,
      },
    });

    return { success: "Category deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again" };
  }
};
