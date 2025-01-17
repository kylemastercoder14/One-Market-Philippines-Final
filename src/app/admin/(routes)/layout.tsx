/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";
import { useAdmin } from "@/hooks/use-admin";
import { redirect } from "next/navigation";
import AppHeader from "../_components/app-header";
import db from '@/lib/db';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { admin } = await useAdmin();
  const sellers = await db.seller.findMany()
  if (!admin) {
    return redirect("/admin");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={admin} sellers={sellers} />
      <SidebarInset>
        <AppHeader />
        <main className="px-6 py-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
