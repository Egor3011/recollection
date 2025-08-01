<template>
    <div class="cartItemContainet">
        <img :src="imgSrc" alt="">
        <div>
            <p style="color: #999999;">Артикул: {{ id }}</p>
            <h3>{{ title }}</h3>
            <p style="color: #999999;">{{ info }}</p>
        </div>
        <div class="priceInfo">
            <h2>{{ price }}</h2>    
            <img src="../assets/delete.png" style="height: 30px; width: 30px;" @click="deleteItem(id)" class="imgDelete">
        </div>
    </div>
</template>



<script setup>
import { inject } from 'vue';

const deleteItem = inject("delItem")

defineProps({
    id: String,
    title: String,
    price: String,
    imgSrc: String,
    info: String
})
</script>



<style>
.cartItemContainet {
    border: 1px solid var(--mainText);
    border-radius: 20px;

    padding: 10px 30px;


    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 45px;
    img {
        max-height: 100px;
        width: auto;
        max-width: 100px;
    }
}

.imgDelete {

    transition: 0.3s;
}

.imgDelete:hover {
    transform: translate(0, -5px);
    transition: 0.3s;
}

.priceInfo {
    display: flex;
    align-items: center;
}
</style>