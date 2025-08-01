<script setup>
import { ref, provide, inject, onMounted, watch } from 'vue';

import cartItem from '@/components/cartItem.vue';
import axios from 'axios';

const cartList = inject("carts")

const deleteItem = inject("removeItemFromCart")

const name = 'asdasd'
const contact = 'asdasd'
const city = 'asdasd'
const adres = 'asdasda'


const promokodPrice = 5
const promocode = ''


const discription = 'asdsadas'


var fullPrice = 0


const checkPrice = async () => {
    fullPrice = 0
    for(let i = 0; i < cartList.value.length; i++) {
        fullPrice = fullPrice + Number(cartList.value[i].price)
    }
    console.log(fullPrice)

    const element = document.getElementById('ppriceCart');
    element.textContent = String(fullPrice) + ' руб.';
}


const delItem = async (idDel) => {
    //удаляем товар
    
    deleteItem(idDel)
    
    //проверяем цену
    checkPrice()
}


const createNewOrder = () => {
    if (confirm('Заказать товары?')) {
        const obj = {
            items: cartList.value,
            promokod: promokodPrice,
            discription: discription,
            name: name,
            contact: contact,
            fullAdres: city
        }
        console.log(obj)
        axios.post("http://176.109.111.74:8000/order/newOrderCart", obj).then((res) => {
            if(res.data.Status == "OK") {
                console.log("++++")
                alert("Заявка на заказ товаров отправленна. Ожидайте сообщения от администратора магазина в течении нескольких минут")
            }
        }).catch(error => {
            alert(error)
        })
    }

}


onMounted(() => {       
    checkPrice()
});


watch(promocode, () => {
    const skidka = axios.get("http://176.109.111.74:8000/promo/" + promocode).data
    if (skidka != {"detail": "Item not found"}) {
        if(confirm("Хотите ли вы применить скидку " + skidka + "% ?")) {
            promokodPrice = skidka
        }
    }
})


console.log(cartList)

provide("delItem", delItem)

</script>


<template>
    <h1>Корзина</h1>
    <div v-if="cartList.length < 1" style="align-content: center; text-align: center; height: 600px;">
        <h2>Увы, но вы ничего не добавили:(</h2>
        <a href="/">Каталог</a>
    </div>
    <div v-else v-auto-animate>
        <cartItem v-for="el in cartList" :id="el.id" :title="el.title" :img-src="el.imgSrc" :price="el.price" :info="el.comment"/>
    </div>
    <div style="border-bottom: 1.5px solid #FFFFFF;"></div>
    <div>
        <div style="display: flex; justify-content: space-between;">
            <h2>Итого</h2>
            <h2 id="ppriceCart">{{ fullPrice }} руб.</h2>
        </div>
        <div class="containerOrderCart">
            <div>
                <h2>Контактная информация</h2>
                <div class="specialInput">
                    <p>Имя*</p>
                    <input type="text" v-model="name">
                </div>
                <div class="specialInput">
                    <p>Контакт для связи (ТГ ил номер телефона)*</p>
                    <input type="text" v-model="contact">
                </div>
            </div>
            <div>
                <h2>Адрес доставки</h2>
                <div class="specialInput">
                    <p>Город*</p>
                    <input type="text" v-model="city">
                </div>
                <div class="specialInput">
                    <p>Адрес</p>
                    <input type="text" v-model="adres">
                </div>
            </div>
        </div>
    </div>
    <a href="">Заказывая товары вы соглашаетесь с условиями пользования сайта</a>
    <div class="bottomPromoContainer">
        <div>
            <p>Промокод</p>
            <input type="text" placeholder="Промокод" v-model="promocode">
        </div>
        <button @click="createNewOrder">Оформить заказ</button>
    </div>
</template>

<style>
.bottomPromoContainer {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: end;
}

.containerOrderCart {
    display: flex;
    gap: 50px;
}

@media(max-width: 1024px) {
    .bottomPromoContainer {
        display: block;
        align-items: center;
        text-align: center;
        input {
            margin-bottom: 30px;
        }
    }
    .containerOrderCart {
        display: block;
        text-align: center;
    }
}
</style>