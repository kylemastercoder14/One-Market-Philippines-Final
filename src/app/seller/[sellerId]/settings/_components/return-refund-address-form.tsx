/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Seller, SellerAddress } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Contact, Flag, MapPinned, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import ComboBox from "@/components/ui/combo-box";
import { Textarea } from "@/components/ui/textarea";
import { updateSellerBilling } from "@/actions/seller";

interface ReturnRefundAddressFormProps extends Seller {
  sellerAddress: SellerAddress[];
}

const formSchema = z.object({
  residentialAddress: z
    .string()
    .min(1, { message: "Residential address is required" }),
  contactPerson: z.string().min(1, { message: "Contact person is required" }),
  contactNumber: z.string().min(1, { message: "Contact number is required" }),
  nationality: z.string().min(1, { message: "Nationality is required" }),
});

const ReturnRefundAddressForm = ({
  seller,
}: {
  seller: ReturnRefundAddressFormProps;
}) => {
  const router = useRouter();
  const [nationalities, setNationalities] = React.useState<string[]>([]);
  const [focusOrange, setFocusOrange] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      residentialAddress:
        seller.sellerAddress.find((address) => address.isReturnAddress)
          ?.residentialAddress ?? undefined,
      contactPerson:
        seller.sellerAddress.find((address) => address.isReturnAddress)
          ?.contactPerson ?? undefined,
      contactNumber:
        seller.sellerAddress.find((address) => address.isReturnAddress)
          ?.contactNumber ?? undefined,
      nationality:
        seller.sellerAddress.find((address) => address.isReturnAddress)
          ?.nationality ?? undefined,
    },
  });

  React.useEffect(() => {
    // Fetch the nationalities from the REST Countries API
    const fetchNationalities = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        // Extract unique nationalities (demonym), remove duplicates, and sort alphabetically
        const demonyms = data
          .map(
            (country: any) =>
              country.demonyms?.eng?.m || country.demonyms?.eng?.f
          )
          .filter(Boolean); // Remove null/undefined values
        const uniqueSortedNationalities = Array.from(new Set(demonyms)).sort(); // Remove duplicates and sort
        setNationalities(uniqueSortedNationalities as string[]);
      } catch (error) {
        console.error("Error fetching nationalities:", error);
      }
    };

    fetchNationalities();
  }, []);

  const handleFocus = () => {
    setFocusOrange(true);
  };

  const handleBlur = () => {
    setFocusOrange(false);
  };

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const returnAddress = seller.sellerAddress.find(
        (address) => address.isReturnAddress
      );
      if (returnAddress) {
        await updateSellerBilling(values, returnAddress.id);
      } else {
        toast.error("Return address not found");
      }
      toast.success("Billing address updated successfully");
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
        <h2 className="font-semibold">Billing information</h2>
        <Button onClick={toggleEdit} variant="ghost" size="sm">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <Pencil className="w-4 h-4" />
              Edit billing information
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="space-y-5 mt-3">
          <div className="flex items-center gap-3">
            <Flag className="w-5 h-5" />
            <div>
              <h3 className="text-muted-foreground text-sm">Nationality</h3>
              <p className="">
                {
                  seller.sellerAddress.find(
                    (address) => address.isReturnAddress
                  )?.nationality
                }
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="w-5 h-5" />
            <div>
              <h3 className="text-muted-foreground text-sm">Contact Person</h3>
              <p className="">
                {
                  seller.sellerAddress.find(
                    (address) => address.isReturnAddress
                  )?.contactPerson
                }{" "}
                (
                {
                  seller.sellerAddress.find(
                    (address) => address.isReturnAddress
                  )?.contactNumber
                }
                )
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPinned className="w-5 h-5" />
            <div>
              <h3 className="text-muted-foreground text-sm">
                Return/Refund Address
              </h3>
              <p className="">
                {
                  seller.sellerAddress.find(
                    (address) => address.isReturnAddress
                  )?.residentialAddress
                }
              </p>
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
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <ComboBox
                      className="w-[688px]"
                      data={nationalities.map((national) => ({
                        label: national,
                        value: national,
                      }))}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select your nationality"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        className="bg-white"
                        placeholder="Enter the contact person"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        className={`flex h-9 ${focusOrange ? "border-orange-600" : "border-input"} w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-orange-600 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                        placeholder="Enter the phone number"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        defaultCountry="PH"
                        countries={["PH"]}
                        international
                        countryCallingCodeEditable={false}
                        withCountryCallingCode
                        limitMaxLength={true}
                        value={field.value}
                        onChange={field.onChange}
                        numberInputProps={{
                          className: `rounded-md px-4 focus:outline-none bg-transparent h-full w-full !bg-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed`,
                        }}
                        maxLength={16}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="residentialAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Residential Address</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isSubmitting}
                      className="bg-white"
                      placeholder="Enter the residential address"
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

export default ReturnRefundAddressForm;
