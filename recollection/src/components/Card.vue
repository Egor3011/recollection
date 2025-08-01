<template>
    <div class="cardContainer" @click="onClickAdd">
        <img :src="imgSrc" alt="">
        <p style="font-size: 14px;">{{title}}</p>
        <div class="bottomElCArd">
            <div>
                <p style="margin-bottom: 5px; font-size: 11px;">Цена</p>
                <p style="margin: 0px; font-size: 16px;" class="priceCard">от {{minPrice}} руб.</p>
            </div>
        </div>
    </div>
</template>


<script setup>
import { inject } from 'vue'


const newSelectCard = inject("newSelectCard")

const props = defineProps({
    imgSrc: String,
    title: String,
    minPrice: String,
    idCard: String
})

const onClickAdd = () => {
    const obj = {
        id: props.idCard,
        title: props.title,
        imgSrc: props.imgSrc,
        minPrice: props.minPrice,
        comment: props.minPrice,
    }
    newSelectCard(obj)
}
</script>



<style>
.cardContainer {    
    border-radius: 30px;
    /*border: 1px solid #ffffff;*/


    cursor: pointer;

    width: 210px;
    min-height: 260px;

    padding: 15px;
    /*margin: 20px;*/

    img {
        width: 100%;
        height: auto;
    }

    transition: 0.5s;
}

.cardContainer:hover {
    color: var(--background);
    background: var(--mainText);
    box-shadow: 0px 0px 10px var(--mainText);
    transform: translate(0px, -10px);
    transition: 0.25s;
    .priceCard {
        color: var(--secondColorText);
    }
}

@media(max-width: 1024px) {
    .cardContainer {
        border-radius: 15px;
        width: 40%;
    }
}
</style>