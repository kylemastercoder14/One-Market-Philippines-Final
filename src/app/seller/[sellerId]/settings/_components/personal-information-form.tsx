"use client";

import { Seller } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Inbox, Pencil, Store, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { updateSellerProfile } from "@/actions/seller";

const formSchema = z.object({
  storeName: z.string().min(1, { message: "Store name is required" }),
  email: z.string().min(1, { message: "Email address is required" }),
  givenName: z.string().min(1, { message: "Given name is required" }),
  middleName: z.string().optional(),
  familyName: z.string().min(1, { message: "Family name is required" }),
});

const PersonalInformationForm = ({ seller }: { seller: Seller }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: seller.name || "",
      email: seller.email || "",
      givenName: seller.givenName || "",
      middleName: seller.middleName || "",
      familyName: seller.familyName || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateSellerProfile(values, seller.id);
      toast.success("Profile updated successfully");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow border rounded-md p-3">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Profile</h2>
        <Button onClick={toggleEdit} variant="ghost" size="sm">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <Pencil className="w-4 h-4" />
              Edit profile
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="space-y-5 mt-3">
          <div className="flex items-center gap-3">
            <Store className="w-5 h-5" />
            <div>
              <h3 className="text-muted-foreground text-sm">Store Name</h3>
              <p className="">{seller.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5" />
            <div>
              <h3 className="text-muted-foreground text-sm">
                Owner&apos;s Name
              </h3>
              <p className="">
                {seller.givenName} {seller.middleName} {seller.familyName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Inbox className="w-5 h-5" />
            <div>
              <h3 className="text-muted-foreground text-sm">Store Email</h3>
              <p className="">{seller.email}</p>
            </div>
          </div>
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            autoComplete="off"
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="storeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      className="bg-white"
                      placeholder="e.g. 'One Market Philippines'"
                    />
                  </FormControl>
                  <FormDescription>
                    You cannot change your store name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="givenName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Given Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        className="bg-white"
                        placeholder="Enter the given name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name (optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        className="bg-white"
                        placeholder="Enter the middle name (optional)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="familyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Family Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        className="bg-white"
                        placeholder="Enter the family name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      className="bg-white"
                      placeholder="Enter the email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                size="sm"
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default PersonalInformationForm;
