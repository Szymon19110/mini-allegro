export type CartItem = {
  id: number | string;
  name: string;
  price: number;
  image?: string;
  quantity?: number;
};

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('cart');
  return cart ? (JSON.parse(cart) as CartItem[]) : [];
};

export const addToCart = (product: CartItem): void => {
  if (typeof window === 'undefined') return;

  const cart: CartItem[] = getCart();
  const existing: CartItem | undefined = cart.find((item: CartItem) => item.id === product.id);

  let updated: CartItem[];

  if (existing) {
    updated = cart.map((item: CartItem): CartItem =>
      item.id === product.id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
  } else {
    updated = [...cart, { ...product, quantity: 1 }];
  }

  localStorage.setItem('cart', JSON.stringify(updated));
};

export const removeFromCart = (id: number | string): void => {
  if (typeof window === 'undefined') return;

  const cart: CartItem[] = getCart();
  const updated: CartItem[] = cart.filter((item: CartItem) => item.id !== Number(id));
  localStorage.setItem('cart', JSON.stringify(updated));
};
