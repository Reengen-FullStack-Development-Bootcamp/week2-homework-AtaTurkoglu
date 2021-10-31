<template>
    <div class="slideitems">
        <div 
         class="arrow left-arrow" 
         @click="left()"
         ref="slider_left_ref"
        >
            <img src="@/assets/left-arrow.png">
        </div>
        <div 
         class="arrow right-arrow" 
         @click="right()"
         ref="slider_right_ref" 
        >
            <img src="@/assets/right-arrow.png">
        </div>
        <div 
         id="listslide"
         ref="slider_ref"
         class="list-slide"
         :style="drag?{cursor:'grabbing'}:null"
         @mousedown.prevent="mouse_down($event)" 
         @mousemove.prevent="mouse_move($event)" 
         @mouseup.prevent="mouse_up($event)" 
         @mouseout="drag=false"
        >
            <i v-if="hotel.features.parking=='true'" class="fa fa-car fa-2x mr-5 ml-3 color pe-none"> <p class="features">Parking</p></i>
            <i v-if="hotel.features.wifi=='true'" class="fa fa-wifi fa-2x mr-5 color pe-none"> <p class="features">Wifi</p></i>
            <i v-if="hotel.features.pet=='true'" class="fa fa-paw fa-2x mr-5 color pe-none"> <p class="features">Pet</p></i>
            <i v-if="hotel.features.gym=='true'" class="fas fa-dumbbell fa-2x mr-5 color pe-none"> <p class="features">Gym</p></i>
            <i v-if="hotel.features.seashore=='true'" class="fas fa-umbrella-beach fa-2x mr-5 color pe-none"> <p class="features">Seashore</p></i>
            <i v-if="hotel.features.pool=='true'" class="fas fa-swimming-pool fa-2x mr-5 color pe-none"> <p class="features">Swimming Pool</p></i>
            <i v-if="hotel.features.nosmoking=='true'" class="fas fa-smoking-ban fa-2x mr-5 color pe-none"> <p class="features">No Smoking Room</p></i>
            <i v-if="hotel.features.airconditioner=='true'" class="fas fa-snowflake fa-2x mr-5 color pe-none"> <p class="features">Air-Conditioner</p></i>
            <i v-if="hotel.features.hottub=='true'" class="fas fa-hot-tub fa-2x mr-5 color pe-none"> <p class="features">Hot Tub</p></i>
            <i v-if="hotel.features.spa=='true'" class="fas fa-spa fa-2x mr-5 color pe-none"> <p class="features">Spa</p></i>
            <i v-if="hotel.features.tv=='true'" class="fas fa-tv fa-2x mr-5 color pe-none"> <p class="features">TV</p></i>
            <i v-if="hotel.features.casino=='true'" class="fas fa-dice fa-2x mr-5 color pe-none"> <p class="features">Casino</p></i>
        </div>
    </div>
</template>

<script>
    export default {
        props:["hotel"],
        data(){
            return{
                click:null,
                drag:false,
                touch:{
                    startX:null,
                    endX:null
                }
            }
        },
        mounted(){
            let slider = this.$refs.slider_ref
            this.$refs.slider_left_ref.display="none"               //hide left arrow on start
            if(slider.clientWidth+25>=slider.scrollWidth){
                this.$refs.slider_right_ref.style.display="none"               // if scroll at the end, hide right arrow 
            }
        },
        methods:{

            mouse_down(event){
                //collect click informations to use drag&scroll
                this.drag=true
                this.click=new Date().getTime()
                this.touch.startX=event.clientX
            },

            mouse_up(event){
                let slider = this.$refs.slider_ref
                this.drag=false
                this.touch.endX=event.clientX

                //calculate scroll speed
                let time = new Date().getTime()-this.click
                let distance = this.touch.endX-this.touch.startX
                let v = distance/time
                
                
                if(new Date().getTime()-this.click<100){            // use for click a item
                                                                    
                }else{                                              //speed up scroll
                    slider.style.scrollBehavior="smooth"
                    if(v<0 && Math.abs(v)>1.3){
                        slider.scrollLeft+=600
                    }
                    else if(v>0 && Math.abs(v)>1.3){
                        slider.scrollLeft-=600
                    }
                }
            },
            
            mouse_move(event){     
                let slider = this.$refs.slider_ref

                slider.style.scrollBehavior="unset"
                event.target.draggable=false

                //drag&scroll
                if(this.drag){
                    slider.style.cursor="grabbing"
                    slider.scrollLeft-=event.movementX
                }
                
                //show-hide arrows at the borders
                this.arrows()
            },

            left(){
                let slider = this.$refs.slider_ref

                //click&scroll
                slider.style.scrollBehavior="smooth"
                slider.scrollLeft-=200

                //show-hide arrows at the borders
                this.arrows()
            },

            right(){
                let slider = this.$refs.slider_ref

                //click&scroll
                slider.style.scrollBehavior="smooth"
                slider.scrollLeft+=200

                //show-hide arrows at the borders
                this.arrows()
            },

            arrows(){
                let slider = this.$refs.slider_ref
                let left_arrow = this.$refs.slider_left_ref
                let right_arrow = this.$refs.slider_right_ref

                //show-hide arrows at the borders
                let diff_width = slider.scrollWidth-slider.clientWidth
                
                if(slider.scrollLeft<slider.clientWidth*0.05){
                    left_arrow.style.display="none"
                }else if(slider.scrollLeft>diff_width-slider.clientWidth*0.05){
                    right_arrow.style.display="none"
                    left_arrow.style.display="flex"
                }else{
                    left_arrow.style.display="flex"
                    right_arrow.style.display="flex"
                }
            }

        }
    }
</script>

<style scoped>
.slideitems{
    position: relative;
    box-shadow: -3px -3px 5px white, 3px 3px 5px rgb(220, 220, 220);
    border-radius: 8px;
    overflow: hidden;
}
.features{
    font-size: 13px;
    margin: 0;
    padding: 0;
    padding-left: 5px;
}
.list-slide{
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    padding:0;
    padding-block: 10px;
    height: fit-content;
    overflow: hidden;
    background-color: whitesmoke;
    cursor: pointer;
}
.slide-head{
    position: relative;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    height: 100%;
    width: fit-content;
    background-color: whitesmoke;
    padding-inline: 2vmax;
    cursor: pointer;
}
.slide-head p{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-weight: 700;
}
.items{
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: nowrap;
    height: 100%;
    width: fit-content;
    margin: 0;
}
.item{
    position: relative;
    display: flex;
    box-sizing: border-box;
    height: 100%;
    width: fit-content;
    padding-left:1vh;
}
.item:last-child{
    padding-right: 1vh;
}
.item img{
    box-sizing: border-box;
    height: 100%;
    width: auto;
}
.item p{
    position: absolute;
    bottom:0;
    right: 0;
    margin: 0;
    padding: 0;
    color: red;
    z-index: 1;
    background-color: white;
}

.arrow{
    box-sizing: border-box;
    position:absolute;
    display: flex;
    height: 100%;
    width: fit-content;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    cursor: pointer;
}
.arrow img{
    height: auto;
    box-sizing: border-box;
    width: 1vmax;
    object-fit: contain;
}
.left-arrow{
    left: 0;
    padding-right: 2.5vw;
    background-image: linear-gradient(to right, whitesmoke, whitesmoke, transparent);
    user-select: none;
}
.right-arrow{
    right: -1px;
    padding-left: 2.5vw;
    background-image: linear-gradient(to left, whitesmoke, whitesmoke, transparent);
    user-select: none;
}
.pe-none{
    pointer-events: none;
}
</style>