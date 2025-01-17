/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { redirect } from "next/navigation";

const SellerLayout = async ({ children }: { children: React.ReactNode }) => {
//   const { seller, sellerId } = await useUser();
//   if (!seller) {
//     return redirect("/seller/account/login");
//   }
  return (
    <div>
      <p>Navbar</p>
      <main className="px-40 py-10 grid md:grid-cols-6 grid-cols-1 gap-4">
        <div className="col-span-1">
          <p>Sidebar</p>
        </div>
        <div className="col-span-5">{children}</div>
      </main>
    </div>
  );
};

export default SellerLayout;
