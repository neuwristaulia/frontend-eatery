"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, categories } from "@/lib/dummy-data";
import { useStore, type CartItem } from "@/store/useStore";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Minus, Search } from "lucide-react";
import { toast } from "sonner";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = React.useState(categories[0].id);
  const [searchQuery, setSearchQuery] = React.useState("");
  const addToCart = useStore((state) => state.addToCart);
  const cart = useStore((state) => state.cart);

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = item.categoryId === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && (searchQuery ? true : matchesCategory);
  });

  const handleAddToCart = (item: any) => {
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    };
    addToCart(cartItem);
    toast.success(`Added ${item.name} to cart`, {
      description: "Tap the cart icon to checkout.",
      duration: 2000,
    });
  };

  const getQuantity = (id: string) => {
    return cart.find(item => item.id === id)?.quantity || 0;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-md px-4 md:px-8 pt-8 pb-4 border-b border-border">
        <h1 className="text-2xl font-bold mb-4">Our Menu</h1>
        
        {/* Search */}
        <div className="relative mb-4 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for kopi, toast, etc..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-muted border-none focus:ring-2 focus:ring-primary outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories (Horizontal Scroll) */}
        <div className="flex overflow-x-auto hide-scrollbar space-x-2 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === category.id && !searchQuery
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu List */}
      <div className="flex-1 p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const quantity = getQuantity(item.id);
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                <Card className="overflow-hidden border-border/50">
                  <CardContent className="p-0 flex h-32">
                    <div className="w-32 h-full bg-muted flex-shrink-0 relative overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-3 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-sm leading-tight line-clamp-2">{item.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-primary">
                          Rp {item.price.toLocaleString('id-ID')}
                        </span>
                        
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleAddToCart(item)}
                          className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shadow-md relative"
                        >
                          <Plus className="w-5 h-5" />
                          <AnimatePresence>
                            {quantity > 0 && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-card"
                              >
                                {quantity}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 text-muted-foreground w-full col-span-full"
          >
            No items found.
          </motion.div>
        )}
      </div>
    </div>
  );
}
