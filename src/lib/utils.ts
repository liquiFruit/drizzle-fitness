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


export function humanNumber(num: number) {
  if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(1) + "k"
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  } else {
    return num.toString()
  }
}