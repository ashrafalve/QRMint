"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { storeService } from "@/services/store.service";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import type { Store } from "@/types/store";

const updateSchema = z.object({
  storeName: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  shortDescription: z.string().max(160).optional().or(z.literal('')),
  category: z.string().optional().or(z.literal('')),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
});

export function GeneralInfoForm({ store, onUpdate }: { store: Store; onUpdate: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      storeName: store.storeName,
      slug: store.slug,
      shortDescription: store.shortDescription || "",
      category: store.category || "",
      email: store.email || "",
      phone: store.phone || "",
      address: store.address || "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await storeService.updateStore(store.id, data);
      toast.success("Store updated successfully");
      onUpdate();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update store");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
        <CardDescription>Update your store&apos;s basic details and public URL.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input id="storeName" {...register("storeName")} disabled={isLoading} />
              {errors.storeName && <p className="text-xs text-destructive">Required</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Public Slug</Label>
              <Input id="slug" {...register("slug")} disabled={isLoading} />
              {errors.slug && <p className="text-xs text-destructive">Invalid slug</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea id="shortDescription" {...register("shortDescription")} disabled={isLoading} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" {...register("category")} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Business Email</Label>
              <Input id="email" type="email" {...register("email")} disabled={isLoading} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" {...register("phone")} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Physical Address</Label>
              <Input id="address" {...register("address")} disabled={isLoading} />
            </div>
          </div>

          <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
