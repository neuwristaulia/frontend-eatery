import { create } from 'zustand';

export type User = {
  id: string;
  name: string;
  points: number;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

interface AppState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  
  discount: number;
  voucherCode: string;
  applyVoucher: (code: string, discountAmount: number) => void;
  removeVoucher: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null, cart: [] }),
  
  cart: [],
  addToCart: (item) => set((state) => {
    const existing = state.cart.find(c => c.id === item.id);
    if (existing) {
      return {
        cart: state.cart.map(c => 
          c.id === item.id ? { ...c, quantity: c.quantity + item.quantity } : c
        )
      };
    }
    return { cart: [...state.cart, item] };
  }),
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(c => c.id !== id)
  })),
  updateQuantity: (id, quantity) => set((state) => ({
    cart: state.cart.map(c => 
      c.id === id ? { ...c, quantity } : c
    )
  })),
  clearCart: () => set({ cart: [], discount: 0, voucherCode: "" }),
  
  discount: 0,
  voucherCode: "",
  applyVoucher: (code, discountAmount) => set({ voucherCode: code, discount: discountAmount }),
  removeVoucher: () => set({ voucherCode: "", discount: 0 }),
  
  cartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}));
