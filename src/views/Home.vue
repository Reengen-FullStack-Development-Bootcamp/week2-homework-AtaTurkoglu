<template>
  <div class="home">
    <HotelCard v-for="(hotel,index) in hotels" :key="index" :hotel="hotel"/>
  </div>
</template>

<script>
import json from "@/assets/hotels.json"
import HotelCard from '@/components/HotelCard.vue'

export default {
  name: 'Home',
  components: {
    HotelCard
  },
  data(){
    return{
      hotels:JSON.parse(JSON.stringify(json))
    }
  }
}
</script>

<style>
  .home{
    padding-top: 30px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
