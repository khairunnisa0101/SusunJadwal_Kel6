import RegisterForm from "@/components/organisms/auth/RegisterForm";
import LoginBanner from "@/components/organisms/banner/LoginBanner";
import { defineMetadata } from "@/lib/metadata";

export const metadata = defineMetadata({
  title: "Register",
});

export default function RegisterPage() {
  return (
    <main className="h-screen">
      <div className="md:flex h-full w-full items-center">
        <LoginBanner />
        <RegisterForm />
      </div>
    </main>
  );
}
