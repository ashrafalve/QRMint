import api from './api';
import { Store, CreateStoreData, UpdateStoreData, SocialLinks } from '../types/store';

export const storeService = {
  async getMyStores(): Promise<Store[]> {
    const response = await api.get('/stores/my-stores');
    return response.data;
  },

  async getStoreBySlug(slug: string): Promise<Store> {
    const response = await api.get(`/stores/${slug}`);
    return response.data;
  },

  async createStore(data: CreateStoreData): Promise<Store> {
    const response = await api.post('/stores', data);
    return response.data;
  },

  async updateStore(id: string, data: UpdateStoreData): Promise<Store> {
    const response = await api.patch(`/stores/${id}`, data);
    return response.data;
  },

  async deleteStore(id: string): Promise<void> {
    await api.delete(`/stores/${id}`);
  },

  async upsertSocialLinks(storeId: string, data: SocialLinks): Promise<any> {
    const response = await api.post(`/social-links/${storeId}`, data);
    return response.data;
  },

  async uploadLogo(storeId: string, file: File): Promise<{ logoUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/uploads/logo/${storeId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getQrCode(slug: string): Promise<{ qrDataUrl: string }> {
    const response = await api.get(`/qr/${slug}`);
    return response.data;
  },
};
