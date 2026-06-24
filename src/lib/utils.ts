import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const simLoading = (secoud: number = 3) =>
  new Promise((resovle) => setTimeout(() => resovle(null), secoud * 1000))