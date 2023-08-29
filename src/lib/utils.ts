import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


import dayjs from "dayjs"
import relativeTimePlugin from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTimePlugin)

export function fuzyTime(date: number) {
  return dayjs(date).fromNow()
}