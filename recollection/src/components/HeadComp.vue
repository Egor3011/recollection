<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="navig">
        <RouterLink class="mainButtonToMAinPage" to="/">
            <img src="./icons/logoRC.svg" alt="">
            <div>
                <h2 style="margin: 0px;">RE:COLLECTION</h2>
                <p style="margin: 0px; color: var(--mainText);">Не нашел? Мы найдем.</p>
            </div>
        </RouterLink>
        <div class="linksBut">
            <RouterLink to="/faq">FAQ</RouterLink>
            <RouterLink to="/order">Под заказ</RouterLink>
            <RouterLink to="/cart">Корзина</RouterLink>
        </div>
    </div>
</template>

<style>
.navig {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.mainButtonToMAinPage {
    display: flex;
}

nav a.router-link-active {
    color: var(--secondColorText);
}

a {
    text-decoration: none;
}

img {
    width: 40px; 
    height: auto; 
    
    margin-right: 20px;
}

.linksBut {
    a {
        margin: 20px;
    }
}

@media(max-width: 1024px) {

    .navig {
        display: inline-block;
        align-items: center;
        text-align: center;

        margin: auto;
    }

    .linksBut {
        margin-top: 50px;
        a {
            margin: 10px 10px;
        }
    }

    .mainButtonToMAinPage {
        text-align: center;
    }
}
</style>