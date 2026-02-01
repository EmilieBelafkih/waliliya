'use client';

import { CartProvider } from '@/context/CartContext';
import { Cart } from '@/lib/shopify/types';
import { useEffect } from 'react';

export default function ClientProviders({
  children,
  cart,
}: {
  children: React.ReactNode;
  cart: Cart | undefined;
}) {
  useEffect(() => {
    if (!cart) {
      document.cookie =
        'cartId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }, [cart]);

  return <CartProvider cart={cart}>{children}</CartProvider>;
}
