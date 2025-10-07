"use client";
import LoginForm from "../../components/ui/LoginForm";

export default function LoginPage() {
  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <LoginForm />
    </main>
  );
}
