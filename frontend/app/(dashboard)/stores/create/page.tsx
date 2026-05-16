"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { storeService } from "@/services/store.service";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const createStoreSchema = z.object({
  storeName: z.string().min(2, { message: "Store name must be at least 2 characters" }),
  slug: z.string().min(2, { message: "Slug must be at least 2 characters" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug can only contain lowercase letters, numbers, and hyphens" }),
  shortDescription: z.string().max(160).optional(),
  category: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type CreateStoreFormValues = z.infer<typeof createStoreSchema>;

export default function CreateStorePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStoreFormValues>({
    resolver: zodResolver(createStoreSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Filter out empty strings
      const submitData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== "")
      );
      const store = await storeService.createStore(submitData as any);
      toast.success("Store created successfully!");
      router.push(`/stores/${store.id}/edit`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create store");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link href="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>
      </Button>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create New Store</CardTitle>
            <CardDescription>
              Set up your business profile and generate your QR code.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    placeholder="My Awesome Store"
                    disabled={isLoading}
                    {...register("storeName")}
                  />
                  {errors.storeName && (
                    <p className="text-xs text-destructive">{errors.storeName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Public Slug</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-xs">
                      /store/
                    </span>
                    <Input
                      id="slug"
                      className="rounded-l-none"
                      placeholder="my-store"
                      disabled={isLoading}
                      {...register("slug")}
                    />
                  </div>
                  {errors.slug && (
                    <p className="text-xs text-destructive">{errors.slug.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea
                  id="shortDescription"
                  placeholder="A brief description of your business..."
                  className="resize-none"
                  disabled={isLoading}
                  {...register("shortDescription")}
                />
                {errors.shortDescription && (
                  <p className="text-xs text-destructive">{errors.shortDescription.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="Electronics, Fashion, etc."
                    disabled={isLoading}
                    {...register("category")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Business Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@store.com"
                    disabled={isLoading}
                    {...register("email")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1 234 567 890"
                    disabled={isLoading}
                    {...register("phone")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Physical Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, City"
                    disabled={isLoading}
                    {...register("address")}
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Store & Continue
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
