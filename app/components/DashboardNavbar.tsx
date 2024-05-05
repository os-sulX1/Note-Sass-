'use client'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { navItems } from "./UserNavbar";

type Props = {};



const DashboardNavbar = (props: Props) => {
  const pathname = usePathname()

  
	return (
    <nav className="grid items-start gap-2">
     {navItems.map((navItem) => (
  <Link key={navItem.id} href={navItem.href}>
    <span className={cn("group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ",
      pathname === navItem.href ? 'bg-accent' : 'bg-transparent'
    )}>
      <navItem.icon className="mr-2 h-4 w-4 text-primary" />
      <span>{navItem.name}</span>
    </span>
  </Link>
))}

    
    </nav>
  );
};

export default DashboardNavbar;
