"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { storeService } from "@/services/store.service";
import { toast } from "sonner";
import { Loader2, Upload, Store, X } from "lucide-react";

export function LogoUpload({ 
  storeId, 
  initialLogo, 
  onUpdate 
}: { 
  storeId: string; 
  initialLogo?: string; 
  onUpdate: () => void 
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialLogo ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${initialLogo}` : null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size too large (max 5MB)");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setIsLoading(true);
    try {
      await storeService.uploadLogo(storeId, file);
      toast.success("Logo uploaded successfully");
      onUpdate();
    } catch (error) {
      toast.error("Failed to upload logo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Logo</CardTitle>
        <CardDescription>Upload a square logo for your business (max 5MB).</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="relative group">
          <div className="h-32 w-32 rounded-xl bg-secondary flex items-center justify-center overflow-hidden border-2 border-dashed border-muted-foreground/20">
            {preview ? (
              <img src={preview} alt="Store logo" className="object-cover h-full w-full" />
            ) : (
              <Store className="h-12 w-12 text-muted-foreground/40" />
            )}
          </div>
          <label 
            htmlFor="logo-upload" 
            className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity rounded-xl"
          >
            <Upload className="h-6 w-6" />
          </label>
          <input 
            id="logo-upload" 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </div>
        
        <div className="mt-6 flex flex-col items-center gap-2">
          <p className="text-xs text-muted-foreground text-center">
            Click the box or the button below to upload your logo.
          </p>
          <Button variant="outline" size="sm" onClick={() => document.getElementById('logo-upload')?.click()} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
            Select Image
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
