<template>
    <h1>Заказать товар</h1>
    <div class="orderContainer" style="margin-bottom: 30px;">
        <div class="specialInput">
            <p>Ссылка на желаемый товар* (например с POIZON)</p>
            <input class="longInput" placeholder="https://poizon.ru/product/mr530sg" type="text" v-model="this.linkItem">
            <p>Описание товара (размер, расцветка)</p>
            <input class="longInput" placeholder="красные кросовки Nike в 44 EU размере" type="text" v-model="this.discription">
        </div>
        <div class="spehialFlexBox">
            <div>
                <div class="specialInput">
                    <p>Имя*</p>
                    <input type="text" placeholder="Иван" v-model="this.name">
                </div>
                <div class="specialInput">
                    <p>Фамилия</p>
                    <input type="text" placeholder="Иванов" v-model="this.sname">
                </div>
            </div>
            <div class="specialInput">
                <p>Контакт для связи* (например ссылка в тг)</p>
                <input type="text" placeholder="@your_tg" v-model="this.contact">
            </div>
        </div>
        <h2>Адрес доставки</h2>
        <div class="spehialFlexBox">
            <div class="specialInput">
                <p>Город*</p>
                <input type="text" placeholder="Москва" v-model="this.city">
            </div>
            <div class="specialInput">
                <p>Полный адрес</p>
                <input type="text" placeholder="ул. Пушкина, д. 49" v-model="this.Adress">
            </div>
        </div>
        <a href="">Оставляя заявку вы соглошаетесь с условиями оферты</a>

        <button @click="sendInfoToTG">Оставить заявку</button>
    </div>
    
    
</template>

<style>
.longInput {
    width: 490px;
}

.specialInput {
    margin-right: 50px;
    margin-bottom: 30px;

    p {
        margin: 12px 0px;
    }
}

.spehialFlexBox {
    display: flex;
}


@media(max-width: 1024px) {
    .longInput {
        width: 90%;
    }
    .orderContainer {
        text-align: center;
    }

    .specialInput {
        margin: 20px 0px; 
    }
    .spehialFlexBox {
        display: block;
    }
}
</style>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            linkItem: '',
            name: '', 
            sname: '',
            contact: '',
            city: '',
            Adress: '',
            discription: ''
        }
    },
    methods: {
        sendInfoToTG() {
            if(this.linkItem == '' || this.discription == '' || this.name == '' || this.contact=='' || this.city == '') {
                alert("Проверьте правильность введеных данных")
            }
            else {
                axios.post("http://176.109.111.74:8000/order/newUnderOrderView", {
                        link: this.linkItem,
                        discription: this.discription,
                        fullname: this.name + this.sname,
                        contact: this.contact,
                        fullAdress: this.city + ', ' + this.Adress
                    }
                ).then(
                    (res) => {
                        if(res.data.Status == "OK") {
                            alert("Заявка на заказ отправленна!")
                        }
                        else {
                            alert("Произошел какой-то сбой")
                        }
                    }
                ).catch(
                    (error) => {
                        alert("Проверьте правильность введенной информации")
                        console.error(error)
                        console.log({
                            link: this.linkItem,
                            discription: this.discription,
                            fullname: this.name + this.sname,
                            contact: this.contact,
                            fullAdress: this.city + ', ' + this.Adress
                        })
                    }
                )
            }  
        }
    }
}
</script>