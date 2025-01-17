"use client";

import {
  ArrowUpRight,
  ChartSpline,
  MoreHorizontal,
  Plus,
  Send,
  ShoppingBag,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Seller } from "@prisma/client";
import { generateSellerIcon } from "@/lib/generate-seller-icon";
import { useRouter } from "next/navigation";

export function NavSellers({ sellers }: { sellers: Seller[] }) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <div className="flex items-center justify-between">
        <SidebarGroupLabel>Sellers</SidebarGroupLabel>
        <Plus
          className="text-sidebar-foreground/70 w-3 h-3 cursor-pointer"
          onClick={() => window.location.assign("https://www.facebook.com/")}
        />
      </div>

      <SidebarMenu>
        {sellers.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <div className='cursor-pointer'>
                <span>
                  {generateSellerIcon(item.sellerCategorySlug as string)}
                </span>
                <span>{item.name}</span>
              </div>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem
                  onClick={() => router.push(`/admin/sellers/${item.id}`)}
                >
                  <ArrowUpRight className="text-muted-foreground" />
                  <span>View Store</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <ShoppingBag className="text-muted-foreground" />
                  <span>Store&apos;s Product</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Send className="text-muted-foreground" />
                  <span>Notify Seller</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <ChartSpline className="text-muted-foreground" />
                  <span>Analytics</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
