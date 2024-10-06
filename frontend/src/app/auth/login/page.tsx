"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { useAuth } from "@/lib/context/AuthProvider";
import { Copy } from "lucide-react"
function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setPending(true);
      const res = await api.post("/auth/login", formData);
      const token = res.data.token;
      localStorage.setItem("token", token);
      login();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setPending(false);
    }
  };
    return (
      <div className=" dark:bg-slate-200  flex justify-center mt-16 min-h-screen">
        <div className="w-full mx-auto max-w-sm  ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-2xl font-medium text-slate-800 text-center">Login with FinTask</h5>
            <p className="text-slate-800 text-center">Sign in to your account to continue</p>
            <div>
              <Label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-800">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="E.g. anoop@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-800">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="E.g. welcome"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-start"></div>
            </div>
            <Button pending={pending} type="submit" className="w-full ">
              Login to your Account
            </Button>
            <div className="flex gap-2 flex-1 [&>*]:flex-1">
              <Button
                onClick={() => {
                  setFormData({
                    email: "anoop@gmail.com",
                    password: "welcome",
                  });
                }}
              >
                <Copy className="mr-2"/>
                Demo Manager
              </Button>
              <Button
                onClick={() => {
                  setFormData({
                    email: "mayank@gmail.com",
                    password: "welcome",
                  });
                }}
              >
                <Copy className="mr-2"/>
                Demo User
              </Button>
            </div>
            <div className="text-sm font-medium text-slate-800 text-center">
              Not registered?{" "}
              <Link href="/auth/signup" className="text-blue-700 hover:underline">
                Create account
              </Link>
            </div>
          </form>
        </div>
    </div>
  );
}

export default LoginForm;
