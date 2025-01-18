"use client";

import { Seller, SellerCategory } from "@prisma/client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  ExternalLink,
  FileText,
  IdCard,
  LayoutDashboard,
  ScrollText,
  Stamp,
} from "lucide-react";
import Link from "next/link";

interface DocumentsFormProps extends Seller {
  sellerCategory: SellerCategory | null;
}

const DocumentsForm = ({ seller }: { seller: DocumentsFormProps }) => {
  const router = useRouter();

  return (
    <div className="bg-white shadow border rounded-md p-3">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Documents</h2>
      </div>
      <div className="space-y-5 mt-3">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-5 h-5" />
          <div>
            <h3 className="text-muted-foreground text-sm">Store Category</h3>
            <p className="">{seller?.sellerCategory?.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ScrollText className="w-5 h-5" />
          <div>
            <h3 className="text-muted-foreground text-sm">Type of Business</h3>
            <p className="">{seller.type}</p>
          </div>
        </div>
        {seller.type === "Individual" && (
          <div className="flex items-center gap-3">
            <IdCard className="w-5 h-5" />
            <div>
              <h3 className="text-muted-foreground text-sm">Identity</h3>
              <div className="flex items-center">
                {seller.identityType}
                <ExternalLink
                  onClick={() => router.push(seller.identity as string)}
                  className="cursor-pointer text-muted-foreground w-4 mr-2 h-4"
                />
              </div>
            </div>
          </div>
        )}

        {seller.type === "Sole-Proprietorship" && (
          <div className="flex items-center gap-3">
            <IdCard className="w-5 h-5" />
            <div>
              <h3 className="text-muted-foreground text-sm">Identity</h3>
              <div className="flex items-center">
                {seller.dti}
                <ExternalLink
                  onClick={() => router.push(seller.dti as string)}
                  className="cursor-pointer text-muted-foreground w-4 mr-2 h-4"
                />
              </div>
            </div>
          </div>
        )}

        {seller.type === "Partnership" ||
          (seller.type === "Corporation" && (
            <div className="flex items-center gap-3">
              <IdCard className="w-5 h-5" />
              <div>
                <h3 className="text-muted-foreground text-sm">Identity</h3>
                <div className="flex items-center gap-2">
                  SEC Registration
                  <Link href={seller.sec || ""}>
                    <ExternalLink className="text-muted-foreground w-4 mr-2 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5" />
          <div>
            <h3 className="text-muted-foreground text-sm">
              Certificate of Registration
            </h3>
            <div className="flex items-center gap-2">
              BIR Registration
              <ExternalLink
                onClick={() => router.push(seller.bir as string)}
                className="cursor-pointer text-muted-foreground w-4 mr-2 h-4"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Stamp className="w-5 h-5" />
          <div>
            <h3 className="text-muted-foreground text-sm">Permit</h3>
            <div className="flex items-center gap-2">
              Barangay Business Permit {seller.barangayBusinessPermit}
              <Link href={seller.barangayBusinessPermit || ""}>
                <ExternalLink className="text-muted-foreground w-4 mr-2 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsForm;
