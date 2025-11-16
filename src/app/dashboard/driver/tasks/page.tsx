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
import { useAppContext, Task } from "@/context/app-context";
import { format } from "date-fns";

export default function TasksPage() {
    const { tasks, setTasks, addReservation, user } = useAppContext();
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const { toast } = useToast();
    const router = useRouter();

    const handleAcceptTask = () => {
        if (!selectedTask) return;
        
        // Remove task from available tasks
        setTasks(prev => prev.filter(t => t.id !== selectedTask!.id));

        // Create a reservation for each item in the task
        selectedTask.items.forEach(item => {
            const [quantity, unit] = item.quantity.split(' ');
            addReservation({
                id: `RES-${Date.now()}-${item.name}`,
                item: item.name,
                quantity: parseFloat(quantity),
                quantityUnit: unit,
                provider: selectedTask.provider,
                providerLogo: selectedTask.providerLogo,
                providerAddress: selectedTask.pickupLocation,
                providerContact: { name: 'Provider Contact', phone: '999-999-9999' },
                status: 'Awaiting Pickup',
                pickupTime: `Today, ${format(new Date(), 'p')}`, // Simplified
                ngo: selectedTask.ngo,
                ngoAddress: 'Jayanagar, Bangalore', // Mocked
                driverName: user.name === 'Jane Doe' ? 'Sunita Sharma' : user.name, // Mock current driver
                driverAvatar: user.avatar,
            });
        });

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
        {tasks.length > 0 ? (
            tasks.map(task => (
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
