
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, X, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const pendingVerifications = [
  { 
    id: 'NGO-NEW-001', 
    name: 'Feed the City Initiative', 
    type: 'NGO', 
    date: '2024-05-20', 
    avatar: 'https://picsum.photos/seed/ngo-new1/100/100',
    contact: 'info@feedthecity.org'
  },
  { 
    id: 'PRO-NEW-001', 
    name: 'Campus Corner Cafe', 
    type: 'Provider', 
    date: '2024-05-19', 
    avatar: 'https://picsum.photos/seed/pro-new1/100/100',
    contact: 'manager@campuscorner.com'
  },
   { 
    id: 'NGO-NEW-002', 
    name: 'Shelter for All', 
    type: 'NGO', 
    date: '2024-05-18', 
    avatar: 'https://picsum.photos/seed/ngo-new2/100/100',
    contact: 'contact@shelterforall.com'
  },
];


export default function VerificationPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Verifications</CardTitle>
        <CardDescription>Review and approve new organizations joining the platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingVerifications.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={item.avatar} alt={item.name} />
                  <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.contact}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={item.type === 'NGO' ? 'secondary' : 'outline'}>{item.type}</Badge>
                    <p className="text-xs text-muted-foreground">Applied on {item.date}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  View Docs
                </Button>
                <Button variant="outline" size="sm" className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200">
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button variant="outline" size="sm" className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200">
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>
          ))}
           {pendingVerifications.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
                <p>No pending verifications at this time.</p>
            </div>
        )}
        </div>
      </CardContent>
    </Card>
  );
}
