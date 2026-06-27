import ForgotPasswordPage from "@/components/features/auth/forgot-password";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Forgot-Password'
}

export default function ForgotPage() {
  return (
    <div className="min-h-screen flex justify-center items-center px-2">
      <ForgotPasswordPage/>
    </div>
  )
}