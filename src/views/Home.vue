<template>
  <!--<div class="home">
  </div>-->
  <b-container fluid>
    <b-row cols="1" cols-xl="2">
      <b-col v-for="(hotel, index) in hotels" :key="index">
        <HotelCard :hotel="hotel" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import json from "@/assets/hotels.json";
import HotelCard from "@/components/HotelCard.vue";

export default {
  name: "Home",
  components: {
    HotelCard,
  },
  data() {
    return {
      hotels: JSON.parse(JSON.stringify(json)),
    };
  },
};
</script>

<style>
.home {
  padding-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
