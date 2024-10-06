"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { User } from "@/index";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden ", className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

interface UserAvatarProps {
  user: Partial<User>;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const UserAvatar = ({ user, className, size = "md" }: UserAvatarProps) => {
  return (
    <Avatar
      className={cn(
        className,
        size === "xs"
          ? "h-6 w-6"
          : size === "sm"
          ? "h-8 w-8"
          : size === "md"
          ? "h-10 w-10"
          : "h-12 w-12"
      )}
    >
      <AvatarImage src={user.avatar || ""} />
      <AvatarFallback>{user?.name?.charAt(0) || "A"}</AvatarFallback>
    </Avatar>
  );
};

interface AvatarGroupProps {
  users: Partial<User>[];
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const AvatarGroup = ({ users, className, size = "md", ...props }: AvatarGroupProps) => {
  const colors = ["red", "green", "blue", "yellow", "purple", "orange"];
  return (
    <div className={cn("flex items-center -space-x-5 ", className)} {...props}>
      {users.map((user, index) => (
        <HoverCard>
          <HoverCardTrigger>
            <UserAvatar
              key={index}
              user={user}
              className={`border bg-white  border-slate-800`}
              size={size}
            />
          </HoverCardTrigger>
          <HoverCardContent className="w-max px-6 ">
            <div className="flex flex-col ">
              <span className="text-xs font-semibold">{user.name}</span>
              <span className="text-[10px] text-slate-500">{user.email}</span>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, UserAvatar };
