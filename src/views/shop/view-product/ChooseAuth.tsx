"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import Modal from "@/components/shared/cards/modals/General";
import { authStorage } from "@/lib/auth-storage";
import { login } from "@/api/features/auth";

const ChooseAuth = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: login,

    onSuccess: (response) => {
      authStorage.setToken(response.data.accessToken);

      setOpen(false);
      router.push("/");
    },

    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loginMutation.mutate({
      email,
      password,
    });
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="My Modal"
        description="This is a reusable modal."
      >
        <form onSubmit={handleSubmit} className="py-5 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border p-3 rounded"
            required
          />

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="ml-3 border px-4 py-2 rounded"
          >
            Close
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ChooseAuth;
