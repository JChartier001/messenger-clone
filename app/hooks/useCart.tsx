import { create } from 'zustand';
import { Item, FarmOrder } from '../types';

import { persist, createJSONStorage } from 'zustand/middleware';

interface CartState {
  order: FarmOrder[];
  addItem: (data: Item) => void;
  removeItem: (data: Item) => void;
  decreaseQuantity: (data: Item) => void;
  removeFarmOrder: (farmId: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartState>(
    (set, get) => ({
      order: [],

      addItem(data: Item) {
        const currentItems = get().order; // Assuming get() returns type State

        // Safeguard for undefined farmId
        if (!data.farmId) {
          console.error('No farmId provided for the item');
          return;
        }

        const existingFarm = currentItems.find(
          (order) => order.farmId === data.farmId
        );

        if (existingFarm) {
          const existingItem = existingFarm.items.find(
            (item) => item.id === data.id
          );

          if (existingItem) {
            set({
              order: currentItems.map((order: FarmOrder) =>
                order.farmId === data.farmId
                  ? {
                      ...order,
                      items: order.items.map((item: Item) =>
                        item.id === data.id
                          ? {
                              ...item,
                              quantity: (item.quantity || 0) + 1,
                              subtotal: ((item.quantity || 0) + 1) * data.price,
                            }
                          : item
                      ),
                      totalPrice: (order.totalPrice || 0) + data.price,
                    }
                  : order
              ),
            });
          } else {
            set({
              order: currentItems.map((order: FarmOrder) =>
                order.farmId === data.farmId
                  ? {
                      ...order,
                      items: [
                        ...order.items,
                        {
                          ...data,
                          quantity: 1,
                          subtotal: data.price,
                        },
                      ],
                      totalPrice: (order.totalPrice || 0) + data.price,
                    }
                  : order
              ),
            });
          }
        } else {
          set({
            order: [
              ...currentItems,
              {
                farmId: data.farmId,
                items: [
                  {
                    ...data,
                    quantity: 1,
                    subtotal: data.price,
                  },
                ],
                totalPrice: data.price,
              },
            ],
          });
        }
      },
      removeItem: (data: Item) => {
        const currentItems = get().order;

        // Check if the farm order exists
        const existingFarm = currentItems.find(
          (order) => order.farmId === data.farmId
        );

        if (existingFarm) {
          // Check if the item exists in the farm order
          const existingItem = existingFarm.items.find(
            (item) => item.id === data.id
          );

          if (existingItem) {
            if (existingItem.quantity! > 1) {
              // Decrease the item's quantity by 1
              set({
                order: currentItems.map((order) =>
                  order.farmId === data.farmId
                    ? {
                        ...order,
                        items: order.items.map((item) =>
                          item.id === data.id
                            ? { ...item, quantity: item.quantity! - 1 }
                            : item
                        ),
                      }
                    : order
                ),
              });
            } else {
              // Remove the item entirely from the farm order
              const updatedItems = existingFarm.items.filter(
                (item) => item.id !== data.id
              );

              if (updatedItems.length > 0) {
                set({
                  order: currentItems.map((order) =>
                    order.farmId === data.farmId
                      ? {
                          ...order,
                          items: updatedItems,
                        }
                      : order
                  ),
                });
              } else {
                // If no items left in the farm order, remove the farm order
                const updatedOrders = currentItems.filter(
                  (order) => order.farmId !== data.farmId
                );
                set({ order: updatedOrders });
              }
            }
          }
        }
      },
      decreaseQuantity: (data: Item) => {
        const currentItems = get().order;

        // Check if the farm order exists
        const existingFarm = currentItems.find(
          (order) => order.farmId === data.farmId
        );

        if (existingFarm) {
          // Check if the item exists in the farm order
          const existingItem = existingFarm.items.find(
            (item) => item.id === data.id
          );

          if (existingItem && existingItem.quantity! > 0) {
            // Decrease the item's quantity by 1
            set({
              order: currentItems.map((order) =>
                order.farmId === data.farmId
                  ? {
                      ...order,
                      items: order.items.map((item) =>
                        item.id === data.id
                          ? { ...item, quantity: item.quantity! - 1 }
                          : item
                      ),
                    }
                  : order
              ),
            });

            // If the item's quantity is 0 after decrement, remove the item
            if (existingItem.quantity! - 1 === 0) {
              const updatedItems = existingFarm.items.filter(
                (item) => item.id !== data.id
              );
              set({
                order: currentItems.map((order) =>
                  order.farmId === data.farmId
                    ? {
                        ...order,
                        items: updatedItems,
                      }
                    : order
                ),
              });
            }
          }
        }
      },
      removeFarmOrder: (farmId: string) => {
        const currentItems = get().order;

        // Remove all orders associated with the given farmId
        const updatedOrders = currentItems.filter(
          (order) => order.farmId !== farmId
        );

        set({ order: updatedOrders });
      },

      removeAll: () => set({ order: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
