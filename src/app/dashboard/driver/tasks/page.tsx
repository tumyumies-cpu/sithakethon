
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Package, Users, Truck } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


const availableTasks = [
  {
    id: "TASK-001",
    provider: "City Bakery",
    providerLogo: "https://picsum.photos/seed/p-logo1/40/40",
    pickupLocation: "Koramangala",
    distance: "1.2 km",
    items: [
      { name: "Surplus Bread & Pastries", quantity: "10 kg" },
    ],
    ngo: "Good Samaritan Shelter",
    pickupWindow: "4:00 PM - 5:00 PM",
  },
  {
    id: "TASK-002",
    provider: "Spicy Delights",
    providerLogo: "https://picsum.photos/seed/p-logo4/40/40",
    pickupLocation: "BTM Layout",
    distance: "3.5 km",
    items: [
      { name: "Chicken Biryani", quantity: "8 kg" },
    ],
    ngo: "Helping Hands Foundation",
    pickupWindow: "7:00 PM - 7:30 PM",
  },
];

type Task = typeof availableTasks[0];

export default function TasksPage() {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const { toast } = useToast();
    const router = useRouter();

    const handleAcceptTask = () => {
        if (!selectedTask) return;
        toast({
            title: "Task Accepted!",
            description: `You are now assigned to the pickup from ${selectedTask.provider}.`,
        });
        setSelectedTask(null);
        router.push("/dashboard/driver/pickups");
    }

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Available Tasks</CardTitle>
        <CardDescription>
          Browse and accept available pickup and delivery tasks. Tasks are shown based on your current location.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {availableTasks.length > 0 ? (
            availableTasks.map(task => (
            <Card key={task.id} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4 bg-muted/50 p-4">
                    <Image src={task.providerLogo} alt={task.provider} width={40} height={40} className="rounded-full" />
                    <div>
                        <CardTitle className="text-lg">{task.provider}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                            <MapPin size={14} /> {task.pickupLocation} ({task.distance})
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                     <div className="mb-2">
                        <p className="font-medium text-sm">Items:</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {task.items.map(item => (
                                <li key={item.name}>{item.name} ({item.quantity})</li>
                            ))}
                        </ul>
                    </div>
                     <p className="text-sm text-muted-foreground flex items-center gap-2"><Users size={14} /> Delivering to: <span className="font-medium text-foreground">{task.ngo}</span></p>
                     <p className="text-sm text-muted-foreground flex items-center gap-2"><Clock size={14} /> Pickup window: <span className="font-medium text-foreground">{task.pickupWindow}</span></p>
                </CardContent>
                <CardFooter className="bg-muted/50 p-4 flex justify-end">
                    <Button onClick={() => setSelectedTask(task)}>View and Accept</Button>
                </CardFooter>
            </Card>
            ))
        ) : (
            <div className="text-center py-8">
                <p className="text-muted-foreground">No available tasks in your area right now. Check back soon!</p>
            </div>
        )}
      </CardContent>
    </Card>

    {selectedTask && (
        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Accept Task Confirmation</DialogTitle>
                    <DialogDescription>Review the details below before accepting the task.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="p-4 rounded-lg border">
                        <p className="font-bold text-lg mb-2">Pickup From:</p>
                        <div className="flex items-center gap-3 mb-2">
                            <Image src={selectedTask.providerLogo} alt={selectedTask.provider} width={32} height={32} className="rounded-full" />
                             <p className="font-semibold">{selectedTask.provider}</p>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-2"><MapPin size={14} /> {selectedTask.pickupLocation} ({selectedTask.distance})</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2"><Clock size={14} /> Pickup Window: {selectedTask.pickupWindow}</p>
                    </div>

                    <div className="p-4 rounded-lg border">
                        <p className="font-bold text-lg mb-2">Deliver To:</p>
                        <p className="font-semibold flex items-center gap-2"><Users size={16}/> {selectedTask.ngo}</p>
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                        <p className="font-bold text-lg mb-2">Items:</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {selectedTask.items.map(item => (
                                <li key={item.name}>{item.name} ({item.quantity})</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleAcceptTask}><Truck className="mr-2"/> Accept Task</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )}
    </>
  );
}
