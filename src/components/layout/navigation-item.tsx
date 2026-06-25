import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface NavigationItemProps {
  href: string;
  icon: ReactNode;
  isActive?: boolean;
}

export default function NavigationItem({
  href,
  icon,
  isActive = false,
}: NavigationItemProps) {
  return <Link href={href}
    className={cn('relative w-20 h-12 flex items-center justify-center rouded-lg',
      isActive? 'text-primary' : 'hover:bg-muted text-muted-foreground'
    )}
  >
    {icon}
    {
      isActive && (
        <span className=" absolute -bottom-1 h-0.75 bg-primary w-full"></span>
      )
    }
  </Link>
}
