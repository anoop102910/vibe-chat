import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from 'lucide-react'

interface Member {
  id: string
  name: string
  avatar: string
  role?: 'admin'
}

const members: Member[] = [
  { id: '1', name: 'Tanisha Combs', avatar: '/placeholder.svg?height=40&width=40', role: 'admin' },
  { id: '2', name: 'Alex Hunt', avatar: '/placeholder.svg?height=40&width=40' },
  { id: '3', name: 'Jasmin Lowery', avatar: '/placeholder.svg?height=40&width=40' },
  { id: '4', name: 'Max Padilla', avatar: '/placeholder.svg?height=40&width=40' },
  { id: '5', name: 'Jessie Rollins', avatar: '/placeholder.svg?height=40&width=40' },
  { id: '6', name: 'Lukas Mcgowan', avatar: '/placeholder.svg?height=40&width=40' },
  { id: '2', name: 'Alex Hunt', avatar: '/placeholder.svg?height=40&width=40' },
  { id: '3', name: 'Jasmin Lowery', avatar: '/placeholder.svg?height=40&width=40' },
  { id: '4', name: 'Max Padilla', avatar: '/placeholder.svg?height=40&width=40' },
  { id: '5', name: 'Jessie Rollins', avatar: '/placeholder.svg?height=40&width=40' },
  { id: '6', name: 'Lukas Mcgowan', avatar: '/placeholder.svg?height=40&width=40' },
]

export default function MemberList() {
  return (
    <div className="w-72 bg-purple-50 rounded-3xl p-4 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">23 members</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <X size={20} />
          <span className="sr-only">Close member list</span>
        </button>
      </div>
      <ScrollArea className="h-[50vh]">
        {members.map((member) => (
          <div key={member.id} className="flex items-center space-x-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{member.name}</p>
              {member.role === 'admin' && (
                <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                  {member.role}
                </span>
              )}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}