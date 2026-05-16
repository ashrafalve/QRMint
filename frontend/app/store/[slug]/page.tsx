"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { storeService } from "@/services/store.service";
import type { Store } from "@/types/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Loader2, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Share2,
  ExternalLink,
  MessageCircle,
  Copy,
  Check,
  Moon,
  Sun,
  QrCode
} from "lucide-react";
import { 
  FaInstagram, 
  FaFacebook, 
  FaLinkedin, 
  FaYoutube, 
  FaWhatsapp,
  FaTwitter,
  FaTiktok,
  FaGithub
} from "react-icons/fa";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export default function PublicStorePage() {
  const { slug } = useParams();
  const [store, setStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchStore();
  }, [slug]);

  const fetchStore = async () => {
    try {
      const data = await storeService.getStoreBySlug(slug as string);
      setStore(data);
    } catch (error) {
      toast.error("Store profile not found");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="h-10 w-10 text-primary" />
          </motion.div>
          <p className="text-sm font-medium animate-pulse text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-background">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xs"
        >
          <div className="h-20 w-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Share2 className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-muted-foreground mb-8">The profile you are looking for does not exist or has been moved.</p>
          <Button onClick={() => window.location.href = '/'}>Go Back Home</Button>
        </motion.div>
      </div>
    );
  }

  const socialLinks = [
    { icon: Globe, label: "Website", url: store.socialLinks?.website, color: "bg-blue-500", brand: "Website" },
    { icon: FaInstagram, label: "Instagram", url: store.socialLinks?.instagram, color: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600", brand: "Instagram" },
    { icon: FaFacebook, label: "Facebook", url: store.socialLinks?.facebook, color: "bg-[#1877F2]", brand: "Facebook" },
    { icon: FaLinkedin, label: "LinkedIn", url: store.socialLinks?.linkedin, color: "bg-[#0A66C2]", brand: "LinkedIn" },
    { icon: FaYoutube, label: "YouTube", url: store.socialLinks?.youtube, color: "bg-[#FF0000]", brand: "YouTube" },
    { icon: FaTiktok, label: "TikTok", url: store.socialLinks?.tiktok, color: "bg-black", brand: "TikTok" },
    { icon: FaWhatsapp, label: "WhatsApp", url: store.socialLinks?.whatsapp ? `https://wa.me/${store.socialLinks.whatsapp}` : null, color: "bg-[#25D366]", brand: "WhatsApp" },
  ].filter(link => link.url);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const logoUrl = store.logoUrl ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${store.logoUrl}` : null;

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-purple-500/20 blur-[120px]" />
      </div>

      <div className="relative max-w-md mx-auto px-6 pt-8 pb-24">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-10">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-10 w-10 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-sm"
          >
            {mounted && (theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-700" />)}
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={copyToClipboard}
            className="h-10 w-10 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-sm"
          >
            {copied ? <Check className="h-5 w-5 text-green-500" /> : <Share2 className="h-5 w-5" />}
          </motion.button>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative mb-6"
          >
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110" />
            <div className="h-32 w-32 rounded-[2.5rem] bg-white dark:bg-card shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white dark:border-white/10 relative z-10">
              {logoUrl ? (
                <img src={logoUrl} alt={store.storeName} className="object-cover h-full w-full" />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <span className="text-5xl font-bold text-white">{store.storeName.charAt(0)}</span>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-black tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              {store.storeName}
            </h1>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-4">
              {store.category || "Business"}
            </div>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed font-medium">
              {store.shortDescription || "Welcome to our official business profile. Scan and connect with us."}
            </p>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4 mb-10"
        >
          {store.phone && (
            <Button size="lg" className="h-14 rounded-2xl shadow-lg shadow-primary/20 font-bold group" onClick={() => window.open(`tel:${store.phone}`)}>
              <Phone className="mr-2 h-4 w-4 group-hover:animate-bounce" /> Call Now
            </Button>
          )}
          {store.email && (
            <Button size="lg" variant="outline" className="h-14 rounded-2xl shadow-sm border-2 font-bold backdrop-blur-sm" onClick={() => window.open(`mailto:${store.email}`)}>
              <Mail className="mr-2 h-4 w-4" /> Message
            </Button>
          )}
        </motion.div>

        {/* Social Links Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4 mb-10"
        >
          {socialLinks.length > 0 && (
            <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 ml-1 opacity-70">
              Connect With Us
            </h3>
          )}
          <div className="grid grid-cols-1 gap-3">
            {socialLinks.map((link, index) => (
              <motion.a 
                key={index} 
                variants={item}
                href={link.url!} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-4 bg-white dark:bg-white/5 backdrop-blur-xl rounded-[1.25rem] shadow-sm hover:shadow-xl transition-all border border-white dark:border-white/10 group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className={`h-11 w-11 ${link.color} rounded-xl flex items-center justify-center text-white mr-4 shadow-lg shrink-0`}>
                  <link.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <span className="font-bold text-sm block">{link.label}</span>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Official Page</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <ExternalLink className="h-3 w-3" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
           {store.address && (
            <Card className="rounded-[1.5rem] border-white/40 dark:border-white/10 shadow-xl overflow-hidden bg-white/50 dark:bg-card/50 backdrop-blur-2xl">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-1">Our Location</h4>
                    <p className="text-sm font-semibold leading-relaxed">{store.address}</p>
                    <Button variant="link" className="p-0 h-auto text-xs font-bold text-primary mt-2" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(store.address!)}`)}>
                      Get Directions <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-4">
            {store.email && (
              <Card className="rounded-[1.5rem] border-white/40 dark:border-white/10 shadow-lg bg-white/50 dark:bg-card/50 backdrop-blur-2xl">
                <CardContent className="p-5 flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
                    <Mail className="h-5 w-5 text-blue-500" />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Email</h4>
                  <p className="text-xs font-bold truncate w-full">{store.email}</p>
                </CardContent>
              </Card>
            )}
            {store.phone && (
              <Card className="rounded-[1.5rem] border-white/40 dark:border-white/10 shadow-lg bg-white/50 dark:bg-card/50 backdrop-blur-2xl">
                <CardContent className="p-5 flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-3">
                    <Phone className="h-5 w-5 text-green-500" />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Phone</h4>
                  <p className="text-xs font-bold">{store.phone}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 pb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-white/20">
            <span className="text-[10px] font-bold text-muted-foreground">POWERED BY</span>
            <div className="flex items-center gap-1 font-black text-xs tracking-tighter">
              <QrCode className="h-3 w-3 text-primary" />
              <span>QRMint</span>
            </div>
          </div>
          <p className="text-[9px] text-muted-foreground mt-4 font-bold uppercase tracking-[0.2em] opacity-40">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>
        </motion.div>
      </div>

      {/* Floating Bottom Nav (Mobile Only) */}
      <AnimatePresence>
        {store.socialLinks?.whatsapp && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.open(`https://wa.me/${store.socialLinks?.whatsapp}`)}
            className="fixed bottom-6 right-6 h-14 w-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center z-50 border-4 border-white dark:border-slate-900"
          >
            <FaWhatsapp className="h-7 w-7" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
