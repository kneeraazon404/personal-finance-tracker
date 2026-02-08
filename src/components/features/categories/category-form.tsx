"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { categorySchema, type CategoryInput } from "@/lib/validations";
import { createCategory, updateCategory } from "@/actions/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

interface CategoryFormProps {
  category?: {
    id: string;
    name: string;
    color: string;
    icon?: string | null;
  };
  onSuccess?: () => void;
}

export function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? "",
      color: category?.color ?? "#6366f1",
      icon: category?.icon ?? "",
    },
  });

  const onSubmit = (data: CategoryInput) => {
    const payload: CategoryInput = {
      ...data,
      icon: data.icon?.trim() ? data.icon : undefined,
    };

    startTransition(async () => {
      try {
        if (category) {
          await updateCategory(category.id, payload);
          toast.success("Category updated.");
        } else {
          await createCategory(payload);
          toast.success("Category created.");
        }
        onSuccess?.();
        form.reset({
          name: "",
          color: "#6366f1",
          icon: "",
        });
      } catch {
        toast.error("Unable to save category.");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Groceries" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input type="color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon (optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., shopping-cart" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending
            ? "Saving..."
            : category
              ? "Update Category"
              : "Create Category"}
        </Button>
      </form>
    </Form>
  );
}
