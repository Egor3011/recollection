<script setup>
import { ref, provide, inject, onMounted, watch } from 'vue';

import cartItem from '@/components/cartItem.vue';
import axios from 'axios';

const cartList = inject("carts")

const deleteItem = inject("removeItemFromCart")

var name = ''
var contact = ''
var city = ''
var adres = ''


var promokodPrice = 0
var promocode = ''


const discription = ''


var fullPrice = 0


const checkPrice = async () => {
    fullPrice = 0
    for(let i = 0; i < cartList.value.length; i++) {
        fullPrice = fullPrice + Number(cartList.value[i].price)
    }
    console.log(fullPrice)
    if(promokodPrice != 0) {
        const element = document.getElementById('oldPriceCart');
        element.textContent = String(fullPrice) + ' руб.';
        fullPrice = Math.round(fullPrice / 100 * (100 - promokodPrice))
    }
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
        if (name != '' || contact != '' || city != '') {
            const obj = {
                items: cartList.value,
                promokod: promokodPrice,
                discription: discription,
                name: name,
                contact: contact,
                fullAdres: city + adres
            }
            console.log(obj)
            axios.post("http://176.109.111.74:8000/order/newOrderCart", obj).then((res) => {
                if(res.data.Status == "OK") {
                    alert("Заявка на заказ товаров отправленна. Ожидайте сообщения от администратора магазина в течении нескольких минут")
                }
            }).catch(error => {
                alert(error)
            })
        }
        else {
            alert("Проверьте правильно введеных данных")
            
        }
        
    }
}

const checkPromo = () => {
    const skidka = axios.get("http://176.109.111.74:8000/promo/" + promocode).then(
        (res) => {
            if(confirm("Хотите ли вы применить скидку " + res.data + "% ?")) {
                promokodPrice = res.data
                const elS = document.getElementById('ppromoCart')
                elS.textContent = "-" + String(promokodPrice) + '%'
                checkPrice()
            }
        }
    ).catch(error => {
        alert(error.data)
    })
}


onMounted(() => {       
    checkPrice()
});



console.log(cartList)

provide("delItem", delItem)

</script>


<template>
    <h1>{{ promocode }}</h1>
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
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h2>Итого</h2>
            <h3 id="ppromoCart" style="color: #888;"></h3>
            <div>
                <h4 id="oldPriceCart" style="color: #888; text-decoration: line-through;"></h4>
                <h2 id="ppriceCart">{{ fullPrice }} руб.</h2>
            </div>
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
        <div style="gap: 20px;">
            <p>Промокод</p>
            <input type="text" placeholder="Промокод" v-model="promocode">
            <button @click="checkPromo">Проверить промокод</button>
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