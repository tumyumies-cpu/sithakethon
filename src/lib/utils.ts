
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStatusBadgeVariant = (status: string): "default" | "secondary" | "outline" | "destructive" | "success" => {
    switch (status) {
        case "Active":
            return "default";
        case "Reserved":
            return "secondary";
        case "Picked Up":
            return "outline";
        case "In Transit":
            return "outline";
        case "Driver Assigned":
            return "default";
        case "Awaiting Pickup":
            return "secondary";
        case "Delivered":
            return "success";
        default:
            return "destructive";
    }
}
