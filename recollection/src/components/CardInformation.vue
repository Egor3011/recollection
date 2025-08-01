<script>
import { inject, onMounted, ref, watch } from 'vue'
import axios from 'axios'


export default {
    inject: ['addNewItemToCart', 'selectCard', 'informationCardSizes'],
    
    data() {
        return {
            informationSizesPrice: this.informationCardSizes,
            selectedSize: "",
            priceNow: "0",

            addToCart: this.addNewItemToCart
        }
    },
    methods: {
        selectDiscription(event) {
            const elements = document.querySelectorAll('.buttonSizes');
            elements.forEach(element => {
                element.classList.remove('selected');
            });

            const buttonId = event.target.id;
            event.target.classList.add('selected');
            this.selectedSize = buttonId

            let element = document.getElementById('priceInCardInformation');
            this.priceNow = this.informationCardSizes[Number(buttonId) - 1].price
            element.textContent = this.priceNow + " руб.";

            console.log(this.priceNow)
        },

        loadInfoCard(idCard) {
            axios.get(`http://176.109.111.74:8000/getCard/${idCard}`).then((respons) => {
                    this.informationSizesPrice = respons.data
                    console.log(this.informationSizesPrice)
                }
            ) 
        },

        addToCartFronInformation() {
            confirm("Вы точно хотите добавить этот товар в корзину?") 
            console.log(this.cardContent)
            const obj = {
                id: this.selectCard.id,
                title: this.selectCard.title,
                imgSrc: this.selectCard.imgSrc,
                price: this.priceNow,
                comment: this.informationCardSizes[this.selectedSize - 1].size
            }
            this.addToCart(obj)
        }
    },
    mounted() {
        this.loadInfoCard("1")  
        console.log("Status: OK")
    }
}
</script>


<script>


</script>


<template>
    <div style="border-radius: 30px; border: 1px solid #FFFFFF; padding: 30px;" class="wrapperCardInformation">
        <p style="margin: 0; color: #777;">Артикул: {{ this.selectCard.id }}</p>
        <h1 style="margin-top: 5px;">{{ this.selectCard.title }}</h1>
        <div class="containerStyle">
            <img :src="this.selectCard.imgSrc" alt="">
            <div>
                <div>
                    <h2>Размеры</h2>
                    <button v-for="el in this.informationCardSizes" class="buttonSizes" :id="el.id" @click="selectDiscription">
                        {{ el.size }}
                    </button>
                </div>
                <div>
                    <h1 id="priceInCardInformation">от {{ this.selectCard.minPrice }} руб</h1>
                    <button class="buttonSizes" @click="addToCartFronInformation" style="font-size: 18px;"><h3 style="margin: 0px; width: auto; padding: 0;">Добавить в корзину</h3></button>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
.containerStyle {
    display: flex;
    img {
        max-height: 220px;
        width: auto;
    }
    div {
        width: 100%;
    }
}

#priceInCardInformation {
    margin-bottom: 5px;
}

.wrapperCardInformation {
    width: 100%;
}

.buttonSizes {
    color: #FFFFFF;

    background: var(--background);

    padding: 15px;
    margin: 10px;

    font-weight: bold;
    font-size: 11px;
    font-family: 'Bounded';

    border: 1px solid #FFFFFF;
    border-radius: 10px;

    align-items: center;
    text-align: center;

    transition: 0.5s;
}

.buttonSizes:hover {
    color: var(--background);
    box-shadow: 0 0 5px #ffffff;
    background: #FFFFFF;
    transition: 0.2s;
}

.buttonSizes.selected {
    color: var(--background);
    background: #FFFFFF;
}
</style>