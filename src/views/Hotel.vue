<template>
    <div class="cont d-flex flex-column mt-4">
        <b-row align-v="center" class="d-flex flex-row align-items-end mt-2 mb-5 w-50" no-gutters>
            <b-col cols="6" class="d-flex align-items-center justify-content-start">
                <p class="hotelname">{{hotel.name}}</p>
            </b-col>
            <b-col cols="6" class="d-flex align-items-center justify-content-start">
                <i class="fa fa-map-marker fa-lg mr-2" aria-hidden="true"></i>
                <p class="hotellocation">{{hotel.location}}</p>
            </b-col>
        </b-row>
        <b-row class="d-flex d-row justify-content-center align-items-start h-100" style="height:500px" no-gutters>
            <b-col cols="5" class="m-0 p-0">
                <Carousel :images="hotel.images" class="hotelimg"/>
            </b-col>
            <b-col cols="5" class="m-0 p-0 pl-5">
                <b-row>
                    <SlideItems :hotel="hotel"/>
                </b-row>
                <b-row class="mt-3">
                    <div class="dpicker w-100 px-3 py-2">
                        <label for="example-datepicker">Check-in Date</label>
                        <b-form-datepicker id="datepicker1" v-model="in_date" class="mb-2"></b-form-datepicker>
                    </div>
                </b-row>
                <b-row class="mt-3">
                    <div class="dpicker w-100 px-3 py-2">
                        <label for="example-datepicker">Check-out Date</label>
                        <b-form-datepicker id="datepicker2" v-model="out_date" class="mb-2"></b-form-datepicker>
                    </div>
                </b-row>
                <b-row>
                    <b-col cols="8" class="m-0 p-0 pr-3">
                        <div v-if="totalPrice==null" class="calcPrice mt-3" style="font-size:15px">Choose dates and guests</div>
                        <div v-if="totalPrice&&currency=='TL'" class="calcPrice mt-3">{{totalPrice | TL}}</div>
                        <div v-if="totalPrice&&currency=='USD'" class="calcPrice mt-3">{{totalPrice | USD}}</div>
                        <div v-if="totalPrice&&currency=='EURO'" class="calcPrice mt-3">{{totalPrice | EURO}}</div>
                    </b-col>
                    <b-col cols="4" class="m-0 p-0">
                        <div class="curr mt-3 px-4">
                            <label class="">Select a Currency</label>
                            <b-form-select role="button" v-model="currency" :options="options" size="sm" class="m-0 w-100"></b-form-select>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="2" class="m-0 p-0 h-100 d-flex flex-column align-items-center justify-content-between">
                <b-row align-v="stretch" class="h-100" no-gutters>
                    <i role="button" class="personbtn fas fa-user-plus fa-5x color" style="height:120px" @click="person++"></i>
                </b-row>
                <b-row align-v="stretch" class="h-100" no-gutters>
                    <i role="button" class="personbtn fas fa-user-minus fa-5x color" style="height:120px" @click="person--,person<=0?person=null:''"></i>
                </b-row>
                <b-row align-v="stretch" class="h-100" no-gutters>
                    <div role="button" class="personbtn" style="height:120px; width:140px; font-weight:600; color:rgb(15,125,160); font-size:20px" @click="reservation()">Reservation <br> for {{person}}</div>
                </b-row>
            </b-col>
        </b-row>
        <b-row class="mt-5">
            <div>
                <b-tabs content-class="mt-3 pb-5">
                    <b-tab title="About">
                        <ListGroup :items="hotel.descriptions"/>
                    </b-tab>
                    <b-tab title="Comments"><p>I'm the second tab</p></b-tab>
                </b-tabs>
            </div>
        </b-row>
    </div>
</template>

<script>

import json from "@/assets/hotels.json"

import Carousel from "../components/tools/Slider.vue"
import ListGroup from "../components/tools/ListGroup.vue"
import SlideItems from "../components/tools/SlideItems.vue"
import filters from "@/mixins/filters.js"

export default {
    props:["id"],
    mixins:[filters],
    components:{
        Carousel,
        ListGroup,
        SlideItems
    },
    data() {
        return {
            hotel:JSON.parse(JSON.stringify(json)).find(hotel=>hotel.id==this.id),
            person:null,
            in_date:null,
            out_date:null,
            currency:"TL",
            options:[
                {value: "TL", text: 'TL'},
                {value: "USD", text: 'USD'},
                {value: "EURO", text: 'EURO'}
            ]
        }
    },
    computed:{
        totalPrice(){
            if(this.in_date&&this.out_date&&this.person>0){
                if(this.currency=="USD"){
                    return (this.calcDays(this.in_date,this.out_date)*this.person*this.hotel.price/11.11).toFixed(2)
                }else if(this.currency=="EURO"){
                    return (this.calcDays(this.in_date,this.out_date)*this.person*this.hotel.price/9.6).toFixed(2)
                }else{
                    return this.calcDays(this.in_date,this.out_date)*this.person*this.hotel.price
                }
            }else{
                return null
            }
        }
    },
    methods:{
        reservation(){
            if(this.person>0){
                this.$router.push({ name: 'Reservation', params:{person:this.person,price:this.totalPrice,currency:this.currency}})
            }else{
                alert("Add a Person")
            }
        },
        calcDays(first,second){
            const oneDay = 24 * 60 * 60 * 1000
            const firstDate = new Date(first);
            const secondDate = new Date(second);
            return Math.round(Math.abs((firstDate - secondDate) / oneDay));
        }
    }
}
</script>

<style>
    .brdr{
        border: 1px solid red;
    }
    .cont{
        height: 100%;
        width: 100%;
        margin: 0;
        margin-top: 30px;
        padding: 0;
        padding-inline: 30px;
    }
    .hotelname{
        margin: 0;
        padding-block: 5px;
        padding-inline: 15px;
        font-weight: 600;
        font-size: 25px;
        border-radius: 5px;
        box-shadow: -3px -3px 5px white, 3px 3px 5px rgb(220, 220, 220);
    }
    .hotellocation{
        margin: 0;
        padding: 0;
        font-size: 13px;
        font-weight: 600;
    }
    .color{
        color: rgb(15, 125, 160);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .personbtn{
        padding-inline: 20px;
        margin-bottom: 20px;
        border-radius: 5px;
        box-shadow: -3px -3px 5px white, 3px 3px 5px rgb(220, 220, 220);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .personbtn:hover{
        box-shadow: -3px -3px 5px white inset, 3px 3px 5px rgb(220, 220, 220) inset;
        animation: shdw .15s linear;
    }
    .hotelimg{
        border-radius: 5px;
        box-shadow: -3px -3px 5px white, 3px 3px 5px rgb(220, 220, 220);
    }
    .dpicker{
        position: relative;
        box-shadow: -3px -3px 5px white, 3px 3px 5px rgb(220, 220, 220);
        border-radius: 8px;
        background-color: whitesmoke;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: start;
    }
    .calcPrice{
        position: relative;
        box-shadow: -3px -3px 5px white, 3px 3px 5px rgb(220, 220, 220);
        border-radius: 8px;
        background-color: whitesmoke;
        height: 105px;
        width: 100%;
        font-size: 30px;
        font-weight: 600;
        color: rgb(15, 125, 160);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .curr{
        position: relative;
        box-shadow: -3px -3px 5px white, 3px 3px 5px rgb(220, 220, 220);
        border-radius: 8px;
        background-color: whitesmoke;
        height: 105px;
        width: 100%;
        color: rgb(15, 125, 160);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
    }
    @keyframes shdw{
        0%{
            box-shadow: -3px -3px 5px white, 3px 3px 5px rgb(220, 220, 220);
        }
        25%{
            box-shadow: -1.5px -1.5px 2.5px white, 1.5px 1.5px 2.5px rgb(220, 220, 220);
        }
        50%{
            box-shadow: none;
        }
        75%{
            box-shadow: -1.5px -1.5px 2.5px white inset, 1.5px 1.5px 2.5px rgb(220, 220, 220) inset;
        }
        100%{
            box-shadow: -3px -3px 5px white inset, 3px 3px 5px rgb(220, 220, 220) inset;
        }
    }
</style>