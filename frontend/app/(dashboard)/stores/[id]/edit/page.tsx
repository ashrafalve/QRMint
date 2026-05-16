"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { storeService } from "@/services/store.service";
import type { Store, SocialLinks } from "@/types/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Save, Globe, Share2, Palette, QrCode, Upload } from "lucide-react";
import Link from "next/link";
import { GeneralInfoForm } from "../../../../../components/store/general-info-form";
import { SocialLinksForm } from "../../../../../components/store/social-links-form";
import { LogoUpload } from "../../../../../components/store/logo-upload";
import { QrCodeView } from "../../../../../components/store/qr-code-view";

export default function EditStorePage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [store, setStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const activeTab = searchParams.get("tab") || "general";

  useEffect(() => {
    fetchStore();
  }, [id]);

  const fetchStore = async () => {
    try {
      const stores = await storeService.getMyStores();
      const currentStore = stores.find((s) => s.id === id);
      if (!currentStore) {
        toast.error("Store not found");
        router.push("/dashboard");
        return;
      }
      setStore(currentStore);
    } catch (error) {
      toast.error("Failed to fetch store details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    router.push(`/stores/${id}/edit?tab=${value}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!store) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/store/${store.slug}`} target="_blank">
            <Globe className="mr-2 h-4 w-4" /> View Public Page
          </Link>
        </Button>
      </div>

      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Store</h1>
        <p className="text-muted-foreground">Update your store profile and social presence.</p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:max-w-2xl">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="logo">Logo</TabsTrigger>
          <TabsTrigger value="qr">QR Code</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralInfoForm store={store} onUpdate={fetchStore} />
        </TabsContent>

        <TabsContent value="social">
          <SocialLinksForm storeId={store.id} initialLinks={store.socialLinks} onUpdate={fetchStore} />
        </TabsContent>

        <TabsContent value="logo">
          <LogoUpload storeId={store.id} initialLogo={store.logoUrl} onUpdate={fetchStore} />
        </TabsContent>

        <TabsContent value="qr">
          <QrCodeView slug={store.slug} storeName={store.storeName} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
