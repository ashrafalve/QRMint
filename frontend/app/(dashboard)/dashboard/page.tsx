"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { storeService } from "@/services/store.service";
import type { Store } from "@/types/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ExternalLink, QrCode, MoreVertical, Edit2, Trash2, Store as StoreIcon } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const data = await storeService.getMyStores();
      setStores(data);
    } catch (error) {
      toast.error("Failed to fetch stores");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this store?")) return;
    try {
      await storeService.deleteStore(id);
      toast.success("Store deleted successfully");
      fetchStores();
    } catch (error) {
      toast.error("Failed to delete store");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Stores</h1>
          <p className="text-muted-foreground">Manage your digital profiles and QR codes</p>
        </div>
        <Button asChild>
          <Link href="/stores/create">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Store
          </Link>
        </Button>
      </div>

      {stores.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <StoreIcon className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mb-2">No stores yet</CardTitle>
          <CardDescription className="mb-6 max-w-sm">
            Create your first digital business profile to generate your unique QR code.
          </CardDescription>
          <Button asChild>
            <Link href="/stores/create">Create My First Store</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <Card key={store.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center overflow-hidden border">
                    {store.logoUrl ? (
                      <img src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${store.logoUrl}`} alt={store.storeName} className="object-cover h-full w-full" />
                    ) : (
                      <StoreIcon className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <Link href={`/stores/${store.id}/edit`}>
                        <Edit2 className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(store.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="mt-4">{store.storeName}</CardTitle>
                <CardDescription className="line-clamp-1">{store.shortDescription || "No description provided"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <QrCode className="h-4 w-4" />
                  <span>Slug: {store.slug}</span>
                </div>
              </CardContent>
              <div className="p-4 border-t bg-secondary/20 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href={`/store/${store.slug}`} target="_blank">
                    <ExternalLink className="mr-2 h-3 w-3" /> View Public
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href={`/stores/${store.id}/edit?tab=qr`}>
                    <QrCode className="mr-2 h-3 w-3" /> Get QR
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
