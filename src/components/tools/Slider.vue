<template>
  <div class="slider">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="675"
      img-height="450"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      class="slider-img"
    >
      <b-carousel-slide
        v-for="(item, index) in images" :key="index"
        :img-src="require(`@/assets/${item}`)"
        class="slider-img"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
  export default {              //bootstrap-vue carausel
    props:["images"],
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
    }
  }
</script>

<style>
    .slider{
        max-height: fit-content;
        max-width: 100%;
        overflow: hidden;
    }
    .slider-img{
        object-fit: cover;
    }  
</style>