'use client';

import { CartProvider } from '@/context/CartContext';
import { Cart } from '@/lib/shopify/types';

export default function ClientProviders({
  children,
  cart,
}: {
  children: React.ReactNode;
  cart: Cart | undefined;
}) {
  return <CartProvider cart={cart}>{children}</CartProvider>;
}
