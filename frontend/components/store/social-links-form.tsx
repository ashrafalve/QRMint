"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { storeService } from "@/services/store.service";
import { toast } from "sonner";
import { Loader2, Save, Globe } from "lucide-react";
import { 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube, 
  FaWhatsapp,
  FaGlobe
} from "react-icons/fa";
import type { SocialLinks } from "@/types/store";

export function SocialLinksForm({ 
  storeId, 
  initialLinks, 
  onUpdate 
}: { 
  storeId: string; 
  initialLinks?: SocialLinks; 
  onUpdate: () => void 
}) {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      facebook: initialLinks?.facebook || "",
      instagram: initialLinks?.instagram || "",
      website: initialLinks?.website || "",
      linkedin: initialLinks?.linkedin || "",
      tiktok: initialLinks?.tiktok || "",
      youtube: initialLinks?.youtube || "",
      whatsapp: initialLinks?.whatsapp || "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const submitData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== "")
      );
      await storeService.upsertSocialLinks(storeId, submitData);
      toast.success("Social links updated");
      onUpdate();
    } catch (error) {
      toast.error("Failed to update social links");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Presence</CardTitle>
        <CardDescription>Connect your social media accounts to your store profile.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><FaGlobe className="h-4 w-4 text-blue-500" /> Website</Label>
              <Input placeholder="https://yoursite.com" {...register("website")} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><FaInstagram className="h-4 w-4 text-pink-500" /> Instagram</Label>
              <Input placeholder="https://instagram.com/username" {...register("instagram")} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><FaFacebook className="h-4 w-4 text-blue-600" /> Facebook</Label>
              <Input placeholder="https://facebook.com/page" {...register("facebook")} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><FaLinkedin className="h-4 w-4 text-blue-700" /> LinkedIn</Label>
              <Input placeholder="https://linkedin.com/in/username" {...register("linkedin")} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><FaYoutube className="h-4 w-4 text-red-600" /> YouTube</Label>
              <Input placeholder="https://youtube.com/@channel" {...register("youtube")} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><FaWhatsapp className="h-4 w-4 text-green-500" /> WhatsApp</Label>
              <Input placeholder="+1234567890" {...register("whatsapp")} disabled={isLoading} />
            </div>
          </div>

          <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Social Links
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
