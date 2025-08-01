<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { onMounted, provide, ref, watch} from 'vue';

import HeadComp from './components/HeadComp.vue';
import footerComp from './components/footerComp.vue';
import axios from 'axios';


var cards = ref([])
const priceSort = ref("")
const titleSort = ref("")
const formatSort = ref("")

const cardIsOpen = ref(false)
const informationCardSizes = ref([])

const selectCard = ref({
  id: "1",
  title: "1111",
  imgSrc: "-",
  minPrice: "100"
})

const cart = ref([]);

const addNewItemToCart = (item) => {
    cart.value.push(item)
    console.log(cart)
}

const removeItemFromCart = (idDel) => {
  for (let i = 0; i < cart.value.length; i++) {
    if(String(cart.value[i].id) == idDel) {
      cart.value.splice(i, 1)
    }
  }
}


const newSelectCard = (obj) => {
  cardIsOpen.value = true
  
 
  //задаем стиль для контейнера и помогаем определить его позицию
  let index = cards.value.findIndex(item => item.id === obj.id);

  const element = document.getElementById('cardInformationContainerCC');
  element.setAttribute('style', 'order: ' + String(index + 1));
  console.log(index)

  selectCard.value = obj
  console.log(selectCard.value)

  const cardInfoCont = document.getElementById('cardInformationContainerCC');
  cardInfoCont.scrollIntoView({ behavior: 'smooth' });
}


const reloadCards = async () => {
  if(titleSort != "") {
    cards.value = (await axios.get("http://176.109.111.74:8000/cards?" + priceSort.value + "&title=" + titleSort.value + "&"  + formatSort.value)).data
  }
  else {
    cards.value = (await axios.get("http://176.109.111.74:8000/cards?" + priceSort.value + "&"  + formatSort.value)).data
  }
  console.log(cards.value)
} 


onMounted(async () => {
  cards.value = (await axios.get("http://176.109.111.74:8000/cards")).data
})

watch(selectCard, async () => {
  console.log(selectCard)
  console.log("11111111111111111111111")
  informationCardSizes.value = (await axios.get("http://176.109.111.74:8000/getCard/" + selectCard.value.id)).data
  console.log("11111111111111111111111")
})


watch(priceSort, async () => {
  console.log("jjjjjj")
  reloadCards()
})

watch(titleSort, async () => {
  console.log(titleSort)
  reloadCards()
})

watch(formatSort, async () => {
  reloadCards()
})

provide("addNewItemToCart", addNewItemToCart)
provide("removeItemFromCart", removeItemFromCart)
provide("carts", cart)

provide("selectCard", selectCard)
provide("newSelectCard", newSelectCard)

provide("cardIsOpen", cardIsOpen)

provide("cards", cards)
provide("priceSort", priceSort)
provide("titleSort", titleSort)
provide("formatSort", formatSort)


provide("informationCardSizes", informationCardSizes)
</script>


<template>
  <header>
    <HeadComp/>
  </header>
  <main>
    <RouterView/>
    <footerComp/>
  </main>
</template>



<style>
a.router-link-exact-active {
  color: var(--secondColorText);
}

@media(max-width: 1024px) {
  header {
    align-items: center;
    text-align: center;
  }
}
</style>

