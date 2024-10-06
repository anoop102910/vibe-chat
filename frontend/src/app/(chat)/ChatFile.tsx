import React from 'react'
import { X, ChevronDown, ChevronUp, Image, Video, File, Music, Link2, Mic } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { RANDOM_IMAGE_URL } from '@/constant'

interface FileType {
  type: string
  count: number
  icon: React.ReactNode
  expanded?: boolean
}
const fileTypes: FileType[] = [
    { type: 'photos', count: 265, icon: <Image size={20} />, expanded: true },
    { type: 'videos', count: 13, icon: <Video size={20} /> },
    { type: 'files', count: 378, icon: <File size={20} /> },
    { type: 'audio files', count: 21, icon: <Music size={20} /> },
    { type: 'shared links', count: 45, icon: <Link2 size={20} /> },
    { type: 'voice messages', count: 2589, icon: <Mic size={20} /> },
  ]
  

export default function ChatFile() {
  const [expandedTypes, setExpandedTypes] = React.useState<string[]>(['photos'])

  const toggleExpanded = (type: string) => {
    setExpandedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  return (
      <ScrollArea className="h-[40vh]">
        {fileTypes.map((fileType) => (
          <Collapsible
            key={fileType.type}
            open={expandedTypes.includes(fileType.type)}
            onOpenChange={() => toggleExpanded(fileType.type)}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm hover:bg-gray-100 rounded-md px-2">
              <div className="flex items-center space-x-2">
                {fileType.icon}
                <span>{fileType.count} {fileType.type}</span>
              </div>
              {expandedTypes.includes(fileType.type) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </CollapsibleTrigger>
            <CollapsibleContent>
              {fileType.type === 'photos' && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <img src={RANDOM_IMAGE_URL} alt="Photo 1" className="rounded-md" />
                  <img src={RANDOM_IMAGE_URL} alt="Photo 2" className="rounded-md" />
                  <img src={RANDOM_IMAGE_URL} alt="Photo 3" className="rounded-md" />
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </ScrollArea>
  )
}