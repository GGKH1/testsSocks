<template>
  <div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img
          :class="{ 'out-of-stock-img': !currentInventory }"
          :src="currentImage"
        />
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>{{ stockStatus }}</p>
        <p>Shipping: {{ shipping }}</p>
        <ul>
          <li v-for="detail in details" :key="detail">{{ detail }}</li>
        </ul>
        <div
          v-for="(variant, index) in variants"
          :key="variant.id"
          @mouseover="updateVariant(index)"
          class="color-circle"
          :style="{ backgroundColor: variant.color }"
        ></div>
        <button
          class="button"
          :class="{ disabledButton: !currentInventory }"
          :disabled="!currentInventory"
          @click="addToCart"
        >
          Add to Cart
        </button>
        <button
          class="button"
          @click="decrease"
          :class="{ disabledButton: cart.length === 0 }"
          :disabled="cart.length === 0"
        >
          Remove
        </button>
        <!-- Only render ReviewList if there are reviews -->
        <ReviewList v-if="reviews.length > 0" :reviews="reviews" />
        <ReviewForm @review-submitted="addReview" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";
import ReviewForm from "./components/ReviewForm.vue";
import ReviewList from "./components/ReviewList.vue";

const props = defineProps({
  cart: {
    type: Array,
    required: true,
  },
  premium: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update-cart", "decrease-cart"]);

const product = "Socks";
const brand = "G&G";
const selectedVariant = ref(0);
const details = ["50% cotton", "30% wool", "20% polyester"];
const variants = [
  {
    id: 2234,
    color: "green",
    image: "./assets/images/socks_green.jpg",
    inventory: 10,
  },
  {
    id: 2235,
    color: "blue",
    image: "./assets/images/socks_blue.jpg",
    inventory: 0,
  },
];
const reviews = ref([]); // reviews are handled locally

const title = computed(() => `${brand} ${product}`);
const currentImage = computed(() => variants[selectedVariant.value].image);
const currentInventory = computed(
  () => variants[selectedVariant.value].inventory
);
const stockStatus = computed(() => {
  if (currentInventory.value === 0) return "Out of Stock";
  if (currentInventory.value <= 10) return "Almost Sold Out";
  return "In Stock";
});
const shipping = computed(() => (props.premium ? "Free" : "$2.99"));

function addToCart() {
  if (currentInventory.value > 0) {
    emit("update-cart", variants[selectedVariant.value].id);
  }
}

function decrease() {
  emit("decrease-cart", variants[selectedVariant.value].id);
}

function updateVariant(index) {
  selectedVariant.value = index;
}

function addReview(review) {
  reviews.value.push(review);
}
</script>
