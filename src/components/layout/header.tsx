import Image from "next/image";
import Link from "next/link";
import MainNavigation from "./main-navigation";
import UserDropdown from "./user-dropdown";
import DrakMode from "../darkmode/drak-mode";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20 backdrop-blur-xl font-medium bg-background dark:border-b">
      <div className="flex items-center justify-center">
        <Link href={"/"}>
          <Image
            src={"/Screenshot 2569-06-25 at 11.38.44.png"}
            width={60}
            height={60}
            alt="logo"
          />
        </Link>
        <h1 className="text-4xl font-black tracking-tight">
          <span className="bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Bread
          </span>
          <span className="text-zinc-800 dark:text-zinc-100">Talk</span>
        </h1>
      </div>
      {/* Icon  */}
      <MainNavigation />

      {/* Profile */}
      <div className="flex items-center justify-center gap-5">
        {/* Drak mode */}
        <DrakMode />
        <UserDropdown />
      </div>
    </div>
  );
}
