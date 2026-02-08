"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryForm } from "@/components/features/categories/category-form";
import { deleteCategory } from "@/actions/categories";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteButton } from "@/components/shared/confirm-delete-button";
import { Pencil, Trash2 } from "lucide-react";
import type { CategorySummary } from "@/types/finance";

interface CategoryCardActionsProps {
  category: CategorySummary;
}

export function CategoryCardActions({ category }: CategoryCardActionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <ConfirmDeleteButton
          onDelete={() => deleteCategory(category.id)}
          variant="destructive"
          size="icon"
          confirmText="Delete this category?"
          successMessage="Category deleted."
        >
          <Trash2 className="h-4 w-4" />
        </ConfirmDeleteButton>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <CategoryForm category={category} onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
