import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@shared/schema';

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item._id === product._id);
        
        if (existingItem) {
          const updatedItems = items.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({
            items: updatedItems,
            total: calculateTotal(updatedItems),
          });
        } else {
          const newItems = [...items, { ...product, quantity }];
          set({
            items: newItems,
            total: calculateTotal(newItems),
          });
        }
      },
      removeItem: (productId) => {
        const newItems = get().items.filter((item) => item._id !== productId);
        set({
          items: newItems,
          total: calculateTotal(newItems),
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        const newItems = get().items.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        );
        set({
          items: newItems,
          total: calculateTotal(newItems),
        });
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
