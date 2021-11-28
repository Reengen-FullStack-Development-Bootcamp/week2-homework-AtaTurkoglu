<template>
  <div class="reservation">
      <div v-for="index in guests" :key="index">
        <ReservationForm v-if="index<=submitted" :index="index" @submitted="submittedform" @payer="setPayer"/>
      </div>
      <div v-if="submitted>guests" class="paymentbtn">
        <img class="ccard" src="@/assets/creditcard.png">
        <p v-if="currency=='TL'" class="total">Total: {{price | TL}}</p>
        <p v-if="currency=='USD'" class="total">Total: {{price | USD}}</p>
        <p v-if="currency=='EURO'" class="total">Total: {{price | EURO}}</p>
        <b-button v-b-modal.modal class="info" variant="info" @click="pay">Pay</b-button>
      </div>
      <b-modal v-if="modal" id="modal" ok-only hide-header-close>
        <center><b-spinner class="spin" v-if="loading" variant="primary" label="Spinning"></b-spinner></center>
        <center><p v-if="!loading" class="my-4"><strong>Congratulations {{ payer.name | toUpper }}</strong></p></center>
        <center><p v-if="!loading" class="my-4"><strong>Tel: {{payer.tel | tel}}</strong></p></center>
        <center><p v-if="!loading" class="my-4"><strong>Email: {{payer.email | email}}</strong></p></center>
        <center><p v-if="!loading&&currency=='TL'" class="my-4"><strong>You lost {{price | TL}} :)</strong></p></center>
        <center><p v-if="!loading&&currency=='USD'" class="my-4"><strong>You lost {{price | USD}} :)</strong></p></center>
        <center><p v-if="!loading&&currency=='EURO'" class="my-4"><strong>You lost {{price | EURO}} :)</strong></p></center>
      </b-modal>
  </div>
</template>

<script>
import {validations} from "@/mixins/validator.js"
import ReservationForm from "@/components/ReservationForm.vue"
import filters from "@/mixins/filters.js"
export default {

    props:["id","guests","price","currency"],
  
    mixins:[validations,filters],
  
    components:{
      ReservationForm
    },
    
    data(){
      return{
        submitted:1,            //number of submitted forms
        payer:{
          name:null,
          tel:null,
          email:null
        },
        loading:false,          //loading spinner state
        modal:false
      }
    },
    
    methods:{
      submittedform(){
        this.submitted++        //increase submitted registration form
      },
      pay(){                    //pay and open modal 
        this.modal=true
        this.loading=true
        setTimeout(() => {
          this.loading=false
        }, 3000);
      },
      setPayer(e){              //payer information for modal
        this.payer.name=e.name
        this.payer.tel=e.tel
        this.payer.email=e.email
      },
    }

}
</script>

<style>
  .reservation{
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
  }
  .paymentbtn{
    margin: 20px;
    padding-block: 20px;
    padding-inline: 10px;
    background-color: whitesmoke;
    border-radius: 10px;
    box-shadow: -3px -3px 5px white, 3px 3px 5px rgb(220, 220, 220);
    font-size: 13px;
    width: 300px;
    height: 561px;
    animation: right .5s ease-out;
    display: flex;
    flex-direction: column;
  }
  .ccard{
    width: 100%;
    height: auto;
  }
  .total{
    margin-block: 50px;
    font-size: 30px;
    font-weight: 600;
  }
</style>