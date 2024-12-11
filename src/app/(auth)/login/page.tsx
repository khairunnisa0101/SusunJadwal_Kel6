import LoginForm from "@/components/organisms/auth/LoginForm";
import LoginBanner from "@/components/organisms/banner/LoginBanner";
import { defineMetadata } from "@/lib/metadata";

export const metadata = defineMetadata({
  title: "Login",
});

export default function LoginPage() {
  return (
    <main className="h-screen">
      <div className="md:flex h-full w-full items-center">
        <LoginBanner />
        <LoginForm />
      </div>
    </main>
  );
}
