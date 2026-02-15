import LoginFormContainer from "@/components/login/LoginFormContainer";
import LoginLeftSection from "@/components/login/LoginLeftSection";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex ">
      <LoginLeftSection />
      <LoginFormContainer />
    </main>
  );
}
