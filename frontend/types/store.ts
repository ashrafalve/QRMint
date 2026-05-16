export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  website?: string;
  linkedin?: string;
  tiktok?: string;
  youtube?: string;
  whatsapp?: string;
}

export interface Store {
  id: string;
  userId: string;
  storeName: string;
  slug: string;
  shortDescription?: string;
  category?: string;
  logoUrl?: string;
  theme?: string;
  phone?: string;
  email?: string;
  address?: string;
  socialLinks?: SocialLinks;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStoreData {
  storeName: string;
  slug: string;
  shortDescription?: string;
  category?: string;
  theme?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface UpdateStoreData extends Partial<CreateStoreData> {}
