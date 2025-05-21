<template>
    <TransitionRoot appear :show="show" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black/75" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div
                    class="flex min-h-full items-center justify-center p-4 text-center"
                >
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
                        >
                            <Spinner
                                v-if="loading"
                                class="absolute left-0 top-0 bg-white right-0 bottom-0 flex items-center justify-center z-50"
                            />
                            <header
                                class="py-3 px-4 flex justify-between items-center"
                            >
                                <DialogTitle
                                    as="h3"
                                    class="text-lg leading-6 font-medium text-gray-900"
                                >
                                    {{
                                        product.id
                                            ? `Update product: "${product.props.title}"`
                                            : "Create New Product"
                                    }}
                                </DialogTitle>
                                <button
                                    @click="closeModal()"
                                    class="w-8 h-8 flex justify-center items-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </header>
                            <form @submit.prevent="onSubmit">
                                <div class="col-span-2 px-4 pt-3 pb-4">
                                    <CustomInput
                                        class="mb-2"
                                        v-model="product.title"
                                        label="Product Title"
                                    />
                                    <CustomInput
                                        type="file"
                                        class="mb-2"
                                        @change="
                                            (file) => (product.image = file)
                                        "
                                        label="Product image"
                                    />
                                    <CustomInput
                                        type="textarea"
                                        class="mb-2"
                                        v-model="product.description"
                                        label="Description"
                                    />
                                    <CustomInput
                                        type="number"
                                        class="mb-2"
                                        v-model="product.pricing"
                                        label="Price"
                                        prepend="$"
                                    />
                                </div>
                                <footer
                                    class="bg-gray-50 rounded-b-lg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                                >
                                    <button
                                        type="submit"
                                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        ref="cancelButtonRef"
                                        @click="closeModal"
                                    >
                                        Cancel
                                    </button>
                                </footer>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { computed, onUpdated, ref } from "vue";
import { useProductStore } from "../../stores/products";
import Spinner from "../../components/core/Spinner.vue";
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from "@headlessui/vue";
import { defineEmits, defineProps } from "vue";
import CustomInput from "../../components/core/CustomInput.vue";

const store = useProductStore();

const loading = ref(false);

const emit = defineEmits(["update:modelValue", "close"]);

const props = defineProps({
    modelValue: Boolean,
    product: {
        required: true,
        type: Object,
    },
});

const product = ref({
    id: props.product.id,
    title: props.product.title,
    image: props.product.image,
    description: props.product.description,
    pricing: props.product.pricing,
});

const show = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});
function closeModal() {
    show.value = false;
    emit("close");
}

onUpdated(() => {
    product.value = {
        id: props.product.id,
        title: props.product.title,
        image: props.product.image,
        description: props.product.description,
        pricing: props.product.pricing,
    };
});

// function onSubmit() {
//     loading.value = true
//     if (product.value.id){
//         store.updateProduct(product.value)
//         .then(response => {
//             loading.value = false
//             if(response.status === 200){
//                 store.getProducts()
//                 closeModal()
//             }
//         })
//     } else {
//         store.createProduct(product.value)
//          .then(response => {
//             loading.value = false
//             if(response.status === 201){
//                 store.getProducts()
//                 closeModal()
//             }
//         })
//     }
// }

async function onSubmit() {
    loading.value = true;
    try {
        let response;
        if (product.value.id) {
            response = await store.updateProduct(product.value);
            if (response.status === 200) {
                await store.getProducts();
                closeModal();
            }
        } else {
            response = await store.createProduct(product.value);
            if (response.status === 201) {
                await store.getProducts();
                closeModal();
            }
        }
    } catch (error) {
        if (error.response && error.response.status === 422) {
            console.log("Validation errors:", error.response.data.errors);
            alert(
                "Please check your input: " +
                    JSON.stringify(error.response.data.errors)
            );
        } else {
            alert("An unexpected error occurred.");
        }
    } finally {
        loading.value = false;
    }
}
</script>

<style scoped></style>
