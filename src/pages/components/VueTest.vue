<template>
  <div class="vue-component">
    <h2>🎵 Vue 3 is Working!</h2>
    <p>Current count: {{ count }}</p>
    <button @click="increment" class="btn">Click me! (+1)</button>
    <button @click="reset" class="btn btn-secondary">Reset</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const count = ref(0);

const increment = () => {
  count.value++;
};

const reset = () => {
  count.value = 0;
};
</script>

<style scoped>
.vue-component {
  padding: 20px;
  border: 2px solid #42b883;
  border-radius: 8px;
  margin: 20px 0;
  background: #f9f9f9;
}

.btn {
  background: #42b883;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 14px;
}

.btn:hover {
  background: #369870;
}

.btn-secondary {
  background: #6c757d;
}

.btn-secondary:hover {
  background: #545b62;
}
</style>
