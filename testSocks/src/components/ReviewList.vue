<template>
  <div class="review-list">
    <h3>Reviews</h3>
    <ul>
      <li v-for="(review, index) in reviews" :key="index">
        <h4>{{ review.name }}</h4>
        <p>{{ review.review }}</p>
        <p>Rating: {{ review.rating }}</p>
        <p>Recommendation: {{ review.recommend }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  reviews: {
    type: Array,
    default: () => [],
  },
});
</script>
