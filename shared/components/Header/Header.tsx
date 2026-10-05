"use client";

import { useState } from "react";
import Link from "next/link";
import { CartDrawer } from "@/modules/cart/components/CartDrawer";
import { CartIcon } from "@/modules/cart/components/CartIcon";
import "./header.sass";

export const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="site-header__fixed">
          <div className="site-header__container site-container">
            <div className="site-header__content">
              <Link href="/" className="site-header__logo">
                Delosi
              </Link>
              <div className="site-header__actions">
                <CartIcon
                  isOpen={isCartOpen}
                  onClick={() => setIsCartOpen((open) => !open)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
