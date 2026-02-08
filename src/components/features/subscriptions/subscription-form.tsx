"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { subscriptionSchema, type SubscriptionInput } from "@/lib/validations";
import {
  createSubscription,
  updateSubscription,
} from "@/actions/subscriptions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { toDateInputValue } from "@/utils/date";

interface SubscriptionFormProps {
  subscription?: {
    id: string;
    name: string;
    cost: number;
    date: Date;
    status: "ACTIVE" | "INACTIVE";
    billing: "MONTHLY" | "YEARLY";
  };
  onSuccess?: () => void;
}

const subscriptionStatuses = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
] as const;

const billingCycles = [
  { value: "MONTHLY", label: "Monthly" },
  { value: "YEARLY", label: "Yearly" },
] as const;

export function SubscriptionForm({
  subscription,
  onSuccess,
}: SubscriptionFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SubscriptionInput>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: subscription?.name ?? "",
      cost: subscription ? String(subscription.cost) : "0",
      date: subscription?.date ? new Date(subscription.date) : new Date(),
      status: subscription?.status ?? "ACTIVE",
      billing: subscription?.billing ?? "MONTHLY",
    },
  });

  const onSubmit = (data: SubscriptionInput) => {
    startTransition(async () => {
      try {
        if (subscription) {
          await updateSubscription(subscription.id, data);
          toast.success("Subscription updated.");
        } else {
          await createSubscription(data);
          toast.success("Subscription created.");
        }
        onSuccess?.();
      } catch {
        toast.error("Something went wrong");
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
                <Input placeholder="e.g., Netflix" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Next Billing Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={toDateInputValue(field.value)}
                  onChange={(event) => field.onChange(event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="billing"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Cycle</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select billing cycle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {billingCycles.map((cycle) => (
                    <SelectItem key={cycle.value} value={cycle.value}>
                      {cycle.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subscriptionStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending
            ? "Saving..."
            : subscription
              ? "Update Subscription"
              : "Create Subscription"}
        </Button>
      </form>
    </Form>
  );
}
