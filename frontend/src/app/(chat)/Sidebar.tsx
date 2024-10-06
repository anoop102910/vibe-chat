"use client"
import { Button } from "@/components/ui/button"
import { AlertTriangle, MessageSquare, Users, Newspaper, Archive, User, Settings, LogOut } from 'lucide-react'
import { clearCache } from "@/lib/services/util";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthProvider";

const Sidebar = () => {
  const router = useRouter();
  const {logout} = useAuth();
  return (
    <div className="w-16 bg-gray-900 h-screen flex flex-col items-center py-4 space-y-8 ">
      <AlertTriangle className="text-yellow-500" />
      <div className="flex flex-col space-y-4">
        {[MessageSquare, Users, Newspaper, Archive].map((Icon, index) => (
          <Button key={index} variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Icon />
          </Button>
        ))}
      </div>
      <div className="mt-auto flex flex-col space-y-4">
        {[User, Settings, LogOut].map((Icon, index) => (
          <Button onClick={()=>{
            if(Icon === LogOut){
              clearCache();
              logout();
              router.push("/auth/login");
            }
          }} key={index} variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Icon />
          </Button>
        ))}
      </div>
    </div>
  )
  
}
export default Sidebar;