<template>
    <div class="flex items-center justify-between mb-3">
        <h1 class="text-3xl font-semibold">Products</h1>
        <button
            @click="openModal"
            type="submit"
            class="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600"
        >
            Add New Product
        </button>
    </div>
    <ProductsModal v-model="show" />
    <ProductsTable />


</template>

<script setup>
import { ref } from 'vue';
import ProductsModal from './ProductsModal.vue';
import ProductsTable from './ProductsTable.vue';

const show = ref(false)

function openModal (){
    show.value = true
}


</script>

<style scoped></style>
