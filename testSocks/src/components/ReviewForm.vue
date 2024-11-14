<template>
  <form class="review-form" @submit.prevent="onSubmit">
    <h3>Leave a review</h3>
    <label for="name">Name:</label>
    <input id="name" v-model="name" />

    <label for="review">Review:</label>
    <textarea id="review" v-model="review"></textarea>

    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option disabled value="">Select rating</option>
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>

    <label for="recommend">Would you recommend this product?</label>
    <select id="recommend" v-model="recommend">
      <option disabled value="">Select</option>
      <option>Yes</option>
      <option>No</option>
    </select>

    <input class="button" type="submit" value="Submit" />
  </form>
</template>

<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";

const emit = defineEmits(["review-submitted"]);

const name = ref("");
const review = ref("");
const rating = ref(null);
const recommend = ref(null);

function onSubmit() {
  if (
    !name.value ||
    !review.value ||
    rating.value === null ||
    recommend.value === null
  ) {
    alert("Review is incomplete. Please fill out every field.");
    return;
  }

  const productReview = {
    name: name.value,
    review: review.value,
    rating: rating.value,
    recommend: recommend.value,
  };
  emit("review-submitted", productReview);

  name.value = "";
  review.value = "";
  rating.value = null;
  recommend.value = null;
}
</script>
