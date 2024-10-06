'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/utils";
import api from "@/lib/api";
import { useAuth } from "@/lib/context/AuthProvider";
import { Copy } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
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
    <div className="flex min-h-screen">
      {/* Left side with illustration */}
      <div className="hidden w-1/2 bg-gray-100 lg:flex items-center justify-center p-12">
        <div className="relative w-full max-w-md aspect-square">
          <div className="absolute bottom-0 left-0 w-1/2 h-1/4 bg-orange-400 rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/4 w-1/5 h-3/4 bg-purple-600 rounded-lg"></div>
          <div className="absolute bottom-1/4 left-1/2 w-1/5 h-2/3 bg-black rounded-lg"></div>
          <div className="absolute bottom-1/4 right-0 w-1/4 h-1/2 bg-yellow-400 rounded-lg"></div>
          {/* Eyes and smile */}
          <div className="absolute bottom-[15%] left-[30%] w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute bottom-[15%] left-[40%] w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute bottom-[5%] left-[28%] w-16 h-2 bg-white rounded-full"></div>
        </div>
      </div>
      
      {/* Right side with login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Welcome back!</h2>
            <p className="text-sm text-gray-600">Please enter your details</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">Remember for 30 days</Label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <Button pending={pending} type="submit" className="w-full">Log in</Button>
            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Log in with Google
            </Button>
          </form>
          
          <p className="text-center text-sm text-gray-600">
            Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  )
}