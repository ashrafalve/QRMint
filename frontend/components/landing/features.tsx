import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Smartphone, Globe, Share2, BarChart3, Palette } from "lucide-react";

const features = [
  {
    title: "Dynamic QR Codes",
    description: "Update your profile anytime without changing the QR code. Your link stays the same.",
    icon: QrCode,
  },
  {
    title: "Mobile-First Design",
    description: "Stunning store profiles optimized for mobile devices and social media platforms.",
    icon: Smartphone,
  },
  {
    title: "Custom Branding",
    description: "Add your logo, custom themes, and social links to match your brand identity.",
    icon: Palette,
  },
  {
    title: "Global Reach",
    description: "Your business profile is accessible from anywhere in the world with just one scan.",
    icon: Globe,
  },
  {
    title: "Easy Sharing",
    description: "Share your profile on Instagram, Facebook, WhatsApp, and more with a single click.",
    icon: Share2,
  },
  {
    title: "Basic Analytics",
    description: "Track scans and views to understand your customer engagement better.",
    icon: BarChart3,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need to grow.</h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive suite of tools designed to bridge the gap between your offline and online presence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
