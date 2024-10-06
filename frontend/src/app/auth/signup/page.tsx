"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/api";

function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "manager",
    orgName: "",
    name: "",
  });
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(formData);
    setPending(true);
    try {
      await api.post("/auth/register", formData);
      toast.success("Signup successful");
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setPending(false);
    }
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const goBack = () => {
    setStep(prev => prev - 1);
  };

  const pageTitle = () => {
    switch (step) {
      case 1:
        return "Create your FinTask account";
      case 2:
        return "Enter your password";
      case 3:
        return "Select your role";
      case 4:
        return "Enter your organization name";
      default:
        return "";
    }
  };

  return (
    <div className="dark:bg-slate-200 flex justify-center mt-32 min-h-screen">
      <div className="w-full mx-auto max-w-sm">
        <form className="space-y-6" onSubmit={e => e.preventDefault()}>
          <h5 className="text-2xl font-medium text-slate-800 text-center">Signup to FinTask</h5>
          <p className="text-slate-800 text-center">{pageTitle()}</p>
          {step === 1 && (
            <div className="input-slide email-slide">
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
          )}
          {step === 2 && (
            <div className="input-slide password-slide">
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
          )}
          {step === 3 && (
            <div>
              <Label htmlFor="role" className="block mb-2 text-sm font-medium text-slate-800">
                Role
              </Label>
              <Select
                value={formData.role}
                onValueChange={val => setFormData(prev => ({ ...prev, role: val }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {step === 4 && (
            <div>
              <Label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-800">
                Your Name
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="E.g. FinTask"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {step === 5 && formData.role === "manager" && (
            <>
              <div>
                <Label htmlFor="orgName" className="block mb-2 text-sm font-medium text-slate-800">
                  Organization Name
                </Label>
                <Input
                  type="text"
                  name="orgName"
                  id="orgName"
                  placeholder="E.g. FinTask"
                  value={formData.orgName}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          {step < (formData.role === "manager" ? 5 : 4) && (
            <Button pending={pending} onClick={nextStep} className="w-full">
              Next
            </Button>
          )}
          {step === (formData.role === "manager" ? 5 : 4) && (
            <Button onClick={handleSubmit} pending={pending} className="w-full">
              Finish
            </Button>
          )}
          {step > 1 && (
            <Button onClick={goBack}>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
        </form>
        <div className="text-sm font-medium text-slate-800 text-center mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-700 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
