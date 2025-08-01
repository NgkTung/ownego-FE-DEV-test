<template>
  <Drawer
    :visible="props.cartVisible"
    position="right"
    @update:visible="emit('update:cartVisible', $event)"
  >
    <div class="p-2">
      <h2 class="text-xl font-bold mb-4">Your Cart</h2>
      <p v-if="items.length === 0">Your cart is empty</p>
      <div v-else>
        <div class="flex flex-col gap-y-10">
          <div v-for="(cartItem, index) in items" :key="cartItem.cartId">
            <p class="text-lg font-semibold mb-4">Order: #{{ index + 1 }}</p>
            <div class="flex flex-col rounded-lg shadow-lg relative">
              <div
                class="top-0 right-0 absolute text-red-500 cursor-pointer"
                @click="cartStore.removeFromCart(cartItem.cartId)"
              >
                <XCircleIcon size="30" />
              </div>
              <img
                :src="cartItem.product.image"
                :alt="cartItem.product.name"
                class="w-full h-56 object-cover mb-2 flex-shrink-0"
              />
              <div class="p-4">
                <p class="text-lg font-bold mb-2">
                  {{ cartItem.product.name }}
                </p>
                <p>Topping: {{ cartItem.topping }}</p>
                <p>Quantity: {{ cartItem.quantity }}</p>
                <p class="font-mogra text-lg mt-4">
                  Total price: ${{ cartItem.totalPrice.toFixed(2) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t-2 border-[#795548] mt-5">
          <div
            class="text-2xl font-mogra text-[#795548] mt-2 flex items-center justify-between"
          >
            <span>Total Price:</span> <span>${{ cartTotal.toFixed(2) }}</span>
          </div>
        </div>

        <button class="btn-add mt-10 mb-4" @click="handleConfirmOrder">
          Confirm Order
        </button>
        <button class="btn-clear" @click="useCartStore().clearCart()">
          Clear your cart
        </button>
      </div>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import Drawer from "primevue/drawer";

import { useCartStore } from "../stores/cart";
import { useGlobalStore } from "../stores/global";
import { storeToRefs } from "pinia";

import { XCircleIcon } from "lucide-vue-next";

const props = defineProps({
  cartVisible: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["update:cartVisible"]);

const cartStore = useCartStore();
const { setMsgConfirmModal, openConfirmModal } = useGlobalStore();

const { items, cartTotal } = storeToRefs(cartStore);

const handleConfirmOrder = () => {
  openConfirmModal();
  setMsgConfirmModal("Your order is all set. Thank you! (~￣³￣)~");
  cartStore.clearCart();
};
</script>
