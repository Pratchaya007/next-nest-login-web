"use client";

import { Home, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import NavigationItem from "./navigation-item";

const NAVIGATION_ITEMS = [
  { href: "/", icon: <Home /> },
  { href: "/admin", icon: <Users /> },
] as const;

export default function MainNavigation() {
  const pathname = usePathname();
  console.log("ddddddd", pathname);

  return (
    <div className="flex items-center justify-center">
      {NAVIGATION_ITEMS.map((item) => (
        <NavigationItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          isActive={
            item.href === "/"
              ? pathname === item.href
              : pathname.startsWith(item.href)
          }
        />
      ))}
    </div>
  );
}
