import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Phone, MoreVertical, Paperclip, Mic, Send, AlertTriangle, MessageSquare, Users, Newspaper, Archive, User, Settings, LogOut } from 'lucide-react'

const Sidebar = () => (
  <div className="w-16 bg-gray-900 h-screen flex flex-col items-center py-4 space-y-8">
    <AlertTriangle className="text-yellow-500" />
    <div className="flex flex-col space-y-4">
      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
        <MessageSquare />
      </Button>
      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
        <Users />
      </Button>
      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
        <Newspaper />
      </Button>
      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
        <Archive />
      </Button>
    </div>
    <div className="mt-auto flex flex-col space-y-4">
      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
        <User />
      </Button>
      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
        <Settings />
      </Button>
      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
        <LogOut />
      </Button>
    </div>
  </div>
)

const UserList = () => {
  const users = [
    { id: '1', name: 'Design chat', avatar: 'DC', message: 'Jessie Rollins sent...', time: '4m', unread: 1 },
    { id: '2', name: 'Osman Campos', avatar: '/placeholder.svg?height=32&width=32', message: 'You: Hey! We are read...', time: '20m' },
    { id: '3', name: 'Jayden Church', avatar: '/placeholder.svg?height=32&width=32', message: 'I prepared some varia...', time: '1h' },
    { id: '4', name: 'Jacob Mcleod', avatar: '/placeholder.svg?height=32&width=32', message: 'And send me the proto...', time: '10m', unread: 1 },
    { id: '5', name: 'Jasmin Lowery', avatar: '/placeholder.svg?height=32&width=32', message: "You: Ok! Let's discuss it on the call", time: '20m', seen: true },
    { id: '6', name: 'Zaid Myers', avatar: '/placeholder.svg?height=32&width=32', message: 'You: Hey! We are ready to m...', time: '45m', seen: true },
    { id: '7', name: 'Anthony Cordanes', avatar: '/placeholder.svg?height=32&width=32', message: 'What do you think?', time: '1d' },
    { id: '8', name: 'Conner Garcia', avatar: '/placeholder.svg?height=32&width=32', message: 'You: I think it would be perfe...', time: '2d', seen: true },
    { id: '9', name: 'Vanessa Cox', avatar: '/placeholder.svg?height=32&width=32', message: 'Voice message', time: '2d', seen: true },
  ]

  return (
    <ScrollArea className="h-screen">
      <div className="p-4">
        <Input placeholder="Search" className="mb-4" />
        {users.map(user => (
          <div key={user.id} className="flex items-center space-x-4 mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-semibold">{user.name}</span>
                <span className="text-xs text-gray-500">{user.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{user.message}</p>
            </div>
            {user.unread && (
              <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {user.unread}
              </span>
            )}
            {user.seen && (
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

const ChatArea = () => {
  const messages = [
    { id: '1', sender: 'Jasmin Lowery', content: 'I added new flows to our design system. Now you can use them for your projects!', time: '09:20', reactions: ['👍'] },
    { id: '2', sender: 'Alex Hunt', content: 'Hey guys! Important news!', time: '09:24', reactions: ['👋'] },
    { id: '3', sender: 'Alex Hunt', content: 'Our intern @jchurch has successfully completed his probationary period and is now part of our team!', time: '09:26', reactions: ['🎉', '👏', '👏'] },
    { id: '4', sender: 'Justin', content: 'Justin: my congratulations! I will be glad to work with you on a new project 😊', time: '09:27' },
    { id: '5', sender: 'Justin', content: '/placeholder.svg?height=200&width=300&text=Meeting+Image', time: '09:30', type: 'image' },
    { id: '6', sender: 'Jessie Rollins', content: 'audio-message.mp3', time: '09:30', type: 'audio' },
  ]

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="text-xl font-semibold">Design chat</h2>
          <p className="text-sm text-gray-500">23 members, 10 online</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon"><Search /></Button>
          <Button variant="ghost" size="icon"><Phone /></Button>
          <Button variant="ghost" size="icon"><MoreVertical /></Button>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        {messages.map(message => (
          <div key={message.id} className="mb-4">
            <div className="flex items-start space-x-2">
              <Avatar>
                <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${message.sender[0]}`} />
                <AvatarFallback>{message.sender[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{message.sender}</span>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                {message.type === 'image' ? (
                  <img src={message.content} alt="Shared" className="mt-2 rounded-lg max-w-xs" />
                ) : message.type === 'audio' ? (
                  <div className="mt-2 bg-blue-100 p-2 rounded-lg inline-flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36a1 1 0 00-1.5.86z" />
                      </svg>
                    </Button>
                    <div className="w-32 h-2 bg-blue-200 rounded-full">
                      <div className="w-1/2 h-full bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-xs">0:15</span>
                  </div>
                ) : (
                  <p className="mt-1">{message.content}</p>
                )}
                {message.reactions && (
                  <div className="flex mt-1 space-x-1">
                    {message.reactions.map((reaction, index) => (
                      <span key={index} className="bg-gray-100 text-sm rounded-full px-2 py-1">{reaction}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon"><Paperclip /></Button>
          <Input placeholder="Your message" className="flex-1" />
          <Button variant="ghost" size="icon"><Mic /></Button>
          <Button><Send /></Button>
        </div>
      </div>
    </div>
  )
}

const GroupInfo = () => {
  const files = [
    { type: 'Photos', count: 295 },
    { type: 'Videos', count: 13 },
    { type: 'Files', count: 379 },
    { type: 'Audio files', count: 21 },
    { type: 'Shared links', count: 45 },
    { type: 'Voice messages', count: 2589 },
  ]

  return (
    <div className="p-4 border-b">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Group info</h3>
        <Button variant="ghost" size="icon"><MoreVertical /></Button>
      </div>
      <h4 className="font-semibold mb-2">Files</h4>
      {files.map((file, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <span className="text-sm">{file.type}</span>
          <span className="text-sm text-gray-500">{file.count}</span>
        </div>
      ))}
    </div>
  )
}

const MemberList = () => {
  const members = [
    { name: 'Tanisha Combs', role: 'admin', avatar: '/placeholder.svg?height=32&width=32&text=TC' },
    { name: 'Alex Hunt', avatar: '/placeholder.svg?height=32&width=32&text=AH' },
    { name: 'Jasmin Lowery', avatar: '/placeholder.svg?height=32&width=32&text=JL' },
    { name: 'Max Padilla', avatar: '/placeholder.svg?height=32&width=32&text=MP' },
    { name: 'Jessie Rollins', avatar: '/placeholder.svg?height=32&width=32&text=JR' },
    { name: 'Lukas Mcgowan', avatar: '/placeholder.svg?height=32&width=32&text=LM' },
  ]

  return (
    <div className="p-4">
      <h3 className="font-semibold mb-4">23 members</h3>
      {members.map((member, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/9.x/personas/svg?seed=${member.name}`} />
            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <span>{member.name}</span>
          {member.role && <span className="text-xs bg-gray-200 px-2 py-1 rounded">{member.role}</span>}
        </div>
      ))}
    </div>
  )
}

export default function ChatPage() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="w-80 border-r">
        <UserList />
      </div>
      <div className="flex-1">
        <ChatArea />
      </div>
      <div className="w-80 border-l">
        <GroupInfo />
        <MemberList />
      </div>
    </div>
  )
}