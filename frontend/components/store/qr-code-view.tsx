"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { storeService } from "@/services/store.service";
import { toast } from "sonner";
import { Loader2, Download, Share2, Printer, ExternalLink } from "lucide-react";
import Link from "next/link";

export function QrCodeView({ slug, storeName }: { slug: string; storeName: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [qrData, setQrData] = useState<string | null>(null);

  useEffect(() => {
    fetchQr();
  }, [slug]);

  const fetchQr = async () => {
    setIsLoading(true);
    try {
      const data = await storeService.getQrCode(slug);
      setQrData(data.qrDataUrl);
    } catch (error) {
      toast.error("Failed to generate QR code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrData) return;
    const link = document.createElement("a");
    link.href = qrData;
    link.download = `${slug}-qr-code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/store/${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: storeName,
          text: `Check out my digital store profile: ${storeName}`,
          url: url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Your QR Code</CardTitle>
          <CardDescription>Scan this code to visit your public store profile.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-6">
          <div className="h-64 w-64 bg-white p-4 rounded-xl shadow-inner border flex items-center justify-center">
            {isLoading ? (
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            ) : qrData ? (
              <img src={qrData} alt="QR Code" className="h-full w-full" />
            ) : (
              <p className="text-destructive text-sm text-center">Failed to generate</p>
            )}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 w-full">
            <Button variant="outline" className="w-full" onClick={handleDownload} disabled={!qrData}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Button variant="outline" className="w-full" onClick={() => window.print()} disabled={!qrData}>
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sharing Options</CardTitle>
          <CardDescription>Promote your business online.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded-lg bg-secondary/50 border">
            <p className="text-xs font-medium text-muted-foreground mb-2">Public Profile Link</p>
            <div className="flex items-center gap-2">
              <code className="text-xs bg-background p-1.5 rounded border flex-1 truncate">
                {typeof window !== 'undefined' ? `${window.location.origin}/store/${slug}` : `/store/${slug}`}
              </code>
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href={`/store/${slug}`} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" /> Open Public Page
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" /> Share with Friends
            </Button>
          </div>

          <div className="pt-4 border-t">
            <h4 className="text-sm font-semibold mb-2">QR Code Tips</h4>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
              <li>Print the QR code and place it at your store checkout.</li>
              <li>Add it to your business cards or flyers.</li>
              <li>Share the digital version on your social media stories.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
