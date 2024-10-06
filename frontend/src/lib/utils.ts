import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import reactToast from "react-hot-toast";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export const toast = {
  success: (message: string) => {
    reactToast.success(message);
  },
  error: (error: any) => {
    reactToast.error(error?.response?.data?.message ?? error?.message ?? "Something went wrong");
  },
};
