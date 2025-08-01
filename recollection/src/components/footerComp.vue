<template>
    <footer>
        <h1>RECOLLECTION</h1>
        <div class="footerButtonContainer">
            <div class="containerA">
                <h3>Страницы</h3>
                <RouterLink to="/">Главная страница</RouterLink>
                <RouterLink to="/order">Товары под заказ</RouterLink>
                <RouterLink to="/cart">Корзина</RouterLink>
                <RouterLink to="/faq">Часто задаваеммые вопросы</RouterLink>
            </div>
            <div class="containerA">
                <h3>Контакты</h3>
                <a href="">mail@recollection.ru</a>
                <a href="">@iliaXXili_kak</a>
                <a href="">@h010dok</a>
            </div>
            <a href="">@linkToTG</a>
        </div>
    </footer>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
.footerButtonContainer {
    display: flex;
    justify-content: space-between;
}

.containerA {
    display: flex; 
    flex-direction: column;
    a {
        margin: 10px 0px;
    }
}

@media(max-width: 1024px) {
    footer {
        flex-wrap: wrap;
    }

    .footerButtonContainer {
        display: block;
        text-align: center;
    }

}

</style>