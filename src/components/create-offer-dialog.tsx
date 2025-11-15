
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CreateOfferForm } from '@/components/create-offer-form';

interface CreateOfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateOfferDialog({ open, onOpenChange }: CreateOfferDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Surplus Offer</DialogTitle>
          <DialogDescription>
            Fill out the details below to list your surplus food. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <CreateOfferForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
