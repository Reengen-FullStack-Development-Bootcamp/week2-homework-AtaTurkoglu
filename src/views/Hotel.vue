<template>
    <b-container fluid class="fit-content h-75">
        <b-row cols="1" class="d-flex justify-content-center justify-content-lg-start mt-3 mb-3">
            <b-col cols="10" class="d-flex align-items-center justify-content-center justify-content-lg-start mb-3">
                <p class="hotelname">{{hotel.name}}</p>
            </b-col>
            <b-col cols="10" class="d-flex align-items-center justify-content-start">
                <i class="fa fa-map-marker fa-lg mr-2" aria-hidden="true"></i>
                <p class="hotellocation">{{hotel.location}}</p>
            </b-col>
        </b-row>
        <b-row cols="1" cols-lg="3" class="d-flex justify-content-center">
            <b-col cols="10" lg="5" class="mb-5">
                <Carousel :images="hotel.images" class="hotelimg"/>
            </b-col>
            <b-col cols="10" sm="7" lg="5" class="h-100 px-4 mb-5">
                <b-row>
                    <SlideItems :hotel="hotel"/>
                </b-row>
                <b-row class="h-25 mt-4">
                    <div class="dpicker w-100 px-3 pt-3">
                        <label for="example-datepicker">Check-in Date</label>
                        <b-form-datepicker id="datepicker1" :min="new Date((new Date().getFullYear()),(new Date().getMonth()),(new Date().getDate()))" v-model="in_date" class="mb-2"></b-form-datepicker>
                    </div>
                </b-row>
                <b-row class="h-25 mt-3">
                    <div class="dpicker w-100 px-3 pt-3">
                        <label for="example-datepicker">Check-out Date</label>
                        <b-form-datepicker id="datepicker2" v-model="out_date" class="mb-2"></b-form-datepicker>
                    </div>
                </b-row>
                <b-row class="h-25 mt-4">
                    <b-col cols="8" class="m-0 p-0 pr-3">
                        <div v-if="totalPrice==null" class="calcPrice" style="font-size:15px">Choose dates and guests</div>
                        <div v-if="totalPrice&&currency=='TL'" class="calcPrice">{{totalPrice | TL}}</div>
                        <div v-if="totalPrice&&currency=='USD'" class="calcPrice">{{totalPrice | USD}}</div>
                        <div v-if="totalPrice&&currency=='EURO'" class="calcPrice">{{totalPrice | EURO}}</div>
                    </b-col>
                    <b-col cols="4" class="m-0 p-0">
                        <div class="curr px-4">
                            <label class="">Select Currency</label>
                            <b-form-select role="button" v-model="currency" :options="options" size="sm" class="m-0 w-100"></b-form-select>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="10" sm="3" lg="2" class="passengers p-0 mb-5">
                <b-row no-gutters align-h="center" class="btnrow">
                    <i role="button" class="personbtn fas fa-user-plus fa-4x color" @click="guests++"></i>
                </b-row>
                <b-row no-gutters align-h="center" class="btnrow">
                    <i role="button" class="personbtn fas fa-user-minus fa-4x color" @click="guests--,guests<=0?guests=null:''"></i>
                </b-row>
                <b-row no-gutters align-h="center" class="btnrow">
                    <div role="button" class="reservationbtn" @click="reservation()">Reservation <br> for {{guests}}</div>
                </b-row>
            </b-col>
        </b-row>
        <b-row class="mt-5">
            <div>
                <b-tabs content-class="mt-3 pb-5">
                    <b-tab title="About">
                        <ListGroup :items="hotel.descriptions"/>
                    </b-tab>
                    <b-tab title="Comments">
                        <ListGroup :items="hotel.comments"/>
                    </b-tab>
                </b-tabs>
            </div>
        </b-row>
    </b-container>
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
            guests:null,                    //number of guests
            in_date:null,                   //check in date
            out_date:null,                  //check out date
            currency:"TL",
            options:[                       //currency select options
                {value: "TL", text: 'TL'},
                {value: "USD", text: 'USD'},
                {value: "EURO", text: 'EURO'}
            ]
        }
    },
    computed:{
        totalPrice(){                   //calculate total price
            if(this.in_date&&this.out_date&&this.guests>0){
                if(this.currency=="USD"){
                    return (this.calcDays(this.in_date,this.out_date)*this.guests*this.hotel.price/11.11).toFixed(2)
                }else if(this.currency=="EURO"){
                    return (this.calcDays(this.in_date,this.out_date)*this.guests*this.hotel.price/9.6).toFixed(2)
                }else{
                    return this.calcDays(this.in_date,this.out_date)*this.guests*this.hotel.price
                }
            }else{
                return null
            }
        }
    },
    methods:{
        reservation(){                     //redirect to reservation page
            if(this.guests>0){
                this.$router.push({ name: 'Reservation', params:{guests:this.guests,price:this.totalPrice,currency:this.currency}})
            }else{
                alert("Add a Person")
            }
        },
        calcDays(first,second){            // calculate days of stay
            const oneDay = 24 * 60 * 60 * 1000
            const firstDate = new Date(first);
            const secondDate = new Date(second);
            return Math.round(Math.abs((firstDate - secondDate) / oneDay));
        }
    }
}
</script>

<style>
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
    .passengers{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .btnrow{
        margin: 0;
        margin-inline: auto;
        padding: 0;
        height: auto;
        width:80%;
        height: 30%;
    }
    .personbtn{
        margin-inline: auto;
        padding:0;
        border-radius: 5px;
        box-shadow: -3px -3px 5px white, 3px 3px 5px rgb(220, 220, 220);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    .personbtn:hover{
        box-shadow: -3px -3px 5px white inset, 3px 3px 5px rgb(220, 220, 220) inset;
        animation: shdw .15s linear;
    }
    .reservationbtn{
        margin-inline: auto;
        padding:0;
        border-radius: 5px;
        background-color: rgb(15, 125, 160);
        color: whitesmoke;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: -3px -3px 5px white, 3px 3px 5px rgb(220, 220, 220);
        font-weight:600; 
        font-size:20px;
        width: 100%;
        height: 100%;
    }
    .reservationbtn:hover{
        box-shadow: -3px -3px 5px white inset, 3px 3px 5px rgb(220, 220, 220) inset;
        animation: shdw .15s linear;
    }
    .br1, .br2, .br3, .br4{
        position: relative;
    }
    .br1::after{
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        border-top: 3px solid rgb(15, 125, 160);
        animation: top linear 1s;
    }
    .br2::after{
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        border-right: 3px solid rgb(15, 125, 160);
        animation: side linear 1s;
        animation-delay: 1s;
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
    @keyframes show{
        0%{
            box-shadow: -3px -3px 20px -8px rgb(15, 125, 160), 3px 3px 20px -8px rgb(15, 125, 160);
        }
        25%{
            box-shadow: -3px -3px 22px -6px rgb(15, 125, 160), 3px 3px 2px -6px rgb(15, 125, 160);
        }
        50%{
            box-shadow: -3px -3px 24px -4px rgb(15, 125, 160), 3px 3px 4px -4px rgb(15, 125, 160);
        }
        75%{
            box-shadow: -3px -3px 26px -2px rgb(15, 125, 160), 3px 3px 6px -2px rgb(15, 125, 160);
        }
        100%{
            box-shadow: -3px -3px 28px rgb(15, 125, 160), 3px 3px 8px rgb(15, 125, 160);
        }
    }
    @keyframes top{
        from{
            width: 0;
        }
        to{
            width: 100%;
        }
    }
    @keyframes side{
        from{
            height: 0;
        }
        to{
            height: 100%;
        }
    }


    @media screen and (max-width:576px) {
        .passengers{
            flex-direction: row;
            height: 100px;
        }
        .btnrow{
            width:30%;
            height: 100%;
        }
        .reservationbtn{
            font-size: 15px;
        }
    }
</style>