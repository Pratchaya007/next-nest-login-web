import { LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { auth } from "@/lib/auth/auth";
import { logout } from "@/lib/actions/auth.action";
import Link from "next/link";

export default async function UserDropdown() {
  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-10 w-10">
          <AvatarImage
            alt="user"
            src={session?.user?.avatarUrl ?? "/profile_icon.png"}
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="h-[1.2rem] w-[1.2rem] mr-2" />
            {session?.user?.name}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/setting"} className="flex gap-2.5 items-center">
              <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={logout}>
            <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
