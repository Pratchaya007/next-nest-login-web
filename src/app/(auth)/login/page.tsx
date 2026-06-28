import LoginForm from "@/components/features/auth/login";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="max-w-xl w-full px-8">
        <div className="flex justify-center">
          <Image src={"/fresh_fruits_image.png"} alt="Fakebuck" width={50} height={50} />
        </div>

        <h2 className="text-lg font-medium my-6">Login to Fakebuck</h2>

        {/* Form Login */}
        <LoginForm/>

        
        {/* Create new account */}
        <div className="mt-6">
          <Button className="w-full rounded-full border-primary text-primary hover:text-primary" variant={'outline'}>
            <Link href={"/register"}>Create new account</Link>
          </Button>
        </div>

        {/* Imgage */}
        <div className="flex justify-center mt-10">
          <Image src={'/meta.svg'} alt="Meta" width={60} height={12}/>
        </div>
      </div>
    </div>
  );
}
