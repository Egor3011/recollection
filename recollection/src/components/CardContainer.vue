<template>
    
    <div style="display: flex; flex-wrap:wrap; justify-content: space-between;" id="flexContainer" v-auto-animate>
        <CardInformation v-show="this.cardIsOpen" id="cardInformationContainerCC"/>
        <Card v-for="el in cards" :img-src="el.imgSrc" :title="el.title" :min-price="el.minPrice" :id="el.id" :id-card="el.id" :style="calcOrderCards"/>
    </div>
</template>

<style>
#flexContainer {
    gap: 30px
}


@media(max-width: 1024px) {
    #flexContainer {
        gap: 5px
    }
}

</style>


<script>
import { onMounted, ref, inject, provide} from 'vue';
import Card from './Card.vue';
import axios from 'axios';
import CardInformation from './CardInformation.vue';


export default {
    inject: ["cardIsOpen"],
    setup() {
        const cards = inject('cards');
        console.log(cards)
        return {
            cards
        }
    },
    data() {
        return {
            cardOrder: -1,
            itemsPerLine: 0,
            isOpenCard: true,

            idCardInfo: ref(''),
            imgCardInfo: ref(''),
            titleCardInfo: ref('')
        }
    },
    components: {
        Card,
        CardInformation
    },
    provide() {
        return {
            idCardInfo: this.idCardInfo,
            imgCardInfo: this.imgCardInfo,
            titleCardInfo: this.titleCardInfo
        }
    },
    computed: {
        calcOrderCards() {
            console.log(this.cards)
            if (this.cardOrder >= this.cards.length - 1) {
                this.cardOrder = -1
            }
            this.cardOrder = this.cardOrder + 1
            console.log(this.cardOrder)
            return {"order": this.cardOrder}
        }
    },
    mounted() {
        const container = document.getElementById('flexContainer'); // Получаем контейнер по ID
        const rect = container.getBoundingClientRect();

        const width = rect.width;
        if (window.screen.width < 1024) {
            this.itemsPerLine = 2 
        }
        else {
            this.itemsPerLine = Math.floor(width / 260)
            console.log(this.itemsPerLine)
        }
    }
    
}
</script>