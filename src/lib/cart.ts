export const getCart = (): any[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product: any) => {
  if (typeof window === 'undefined') return;

  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  let updated;

  if (existing) {
    updated = cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
  } else {
    updated = [...cart, { ...product, quantity: 1 }];
  }

  localStorage.setItem('cart', JSON.stringify(updated));
};

export const removeFromCart = (id: number | string) => {
  if (typeof window === 'undefined') return;
  const cart = getCart();
  const updated = cart.filter((item) => item.id !== Number(id));
  localStorage.setItem('cart', JSON.stringify(updated));
};

