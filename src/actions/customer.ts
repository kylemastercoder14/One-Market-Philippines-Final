"use server";

import bcryptjs from "bcryptjs";
import { z } from "zod";
import { UserAccount } from "@/validators";
import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof UserAccount>) => {
  const validatedFields = UserAccount.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { success: "Logging in..." };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  //   send verification token email

  return { success: "User registered" };
};
