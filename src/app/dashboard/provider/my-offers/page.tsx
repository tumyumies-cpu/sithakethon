import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const offers = [
  {
    id: "OFF-001",
    item: "Vegetable Biryani",
    status: "Reserved",
    weight: "5 kg",
    expires: "in 2 hours",
    createdAt: "2 hours ago",
  },
  {
    id: "OFF-002",
    item: "Surplus Bread & Pastries",
    status: "Active",
    weight: "10 kg",
    expires: "in 8 hours",
    createdAt: "6 hours ago",
  },
  {
    id: "OFF-005",
    item: "Paneer Butter Masala",
    status: "Active",
    weight: "4 kg",
    expires: "in 12 hours",
    createdAt: "8 hours ago",
  },
  {
    id: "OFF-003",
    item: "Mixed Dal & Rice",
    status: "Picked Up",
    weight: "8 kg",
    expires: "Yesterday",
    createdAt: "1 day ago",
  },
    {
    id: "OFF-004",
    item: "Idli & Sambar",
    status: "Delivered",
    weight: "6 kg",
    expires: "Yesterday",
    createdAt: "2 days ago",
  },
];

const getStatusBadgeVariant = (status: string): "default" | "secondary" | "outline" | "destructive" | "success" => {
    switch (status) {
        case "Active":
            return "default";
        case "Reserved":
            return "secondary";
        case "Picked Up":
            return "outline";
        case "Delivered":
            return "success";
        default:
            return "destructive";
    }
}


export default function MyOffersPage() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>My Surplus Offers</CardTitle>
          <CardDescription>
            A list of all the food surplus offers you have created.
          </CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Offer
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Food Item</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell className="font-medium">{offer.item}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(offer.status)}>{offer.status}</Badge>
                </TableCell>
                <TableCell>{offer.weight}</TableCell>
                <TableCell>{offer.expires}</TableCell>
                <TableCell>{offer.createdAt}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
