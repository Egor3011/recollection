<template>
    <h1>Каталог товаров</h1>
    <div class="filtersContainer">
        <div style="display: flex;" class="formatSortItems">
            <p style="margin-right: 5%;" @click="formatSortFunc('orig')">Оригинальная одежда</p>
            <p @click="formatSortFunc('notorig')">Качественная реплика</p>
        </div>
        <div class="inputsCatalFilters">
            <select @change="sortBy" name="" id="">
                <option value="">По новизне</option>
                <option value="priceSort=true">По убыванию цены</option>
                <option value="priceSort=false">По возрастанию цены</option>
            </select>
            <input type="text" v-model="titleSort">
        </div>
    </div>
    <CardContainer/>
</template>

<style>
@import url(../assets/filters.css);


</style>

<script setup>
import CardContainer from '@/components/CardContainer.vue';
import { inject, watch } from 'vue';

const priceSort = inject('priceSort')
const titleSort = inject('titleSort')
const formatSort = inject('formatSort')


const sortBy = event => {
    priceSort.value = event.target.value
    console.log(event.target.value)
}


const formatSortFunc = (format) => {
    formatSort.value = "format=" + format
    console.log(formatSort.value)
}
</script>