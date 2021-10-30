<template>
<transition name="right">

    <div class="resform">
        <b-form @submit.prevent="onSubmit">

            <h4>{{index}}. Person</h4>

            <b-form-group 
             id="input-group-1" 
             label="Name:" 
             label-for="input-1"
             label-align="left"
            >
                <b-form-input
                 size="sm"
                 id="input-1"
                 :ref="'form'+index"
                 v-model="$v.form.name.$model"
                 :state="$v.form.name.$error ? false : null"
                 required
                ></b-form-input>
            </b-form-group>

            <b-form-group 
             id="input-group-2" 
             label="Tel:" 
             label-for="input-2"
             label-align="left"
            >
                <b-form-input
                 size="sm"
                 id="input-2"
                 style="tel"
                 placeholder=""
                 v-model="$v.form.tel.$model"
                 :state="$v.form.tel.$error ? false : null"
                 lazy
                 :ref="index==1?'tel':''"
                ></b-form-input>
            </b-form-group>

            <b-form-group
             id="input-group-3"
             label="Email:"
             label-for="input-3"
             label-align="left"
             
            >
                <b-form-input
                 size="sm"
                 id="input-3"
                 v-model="$v.form.email.$model"
                 :state="$v.form.email.$error ? false : null"
                 type="email"
                 lazy
                 :ref="index==1?'email':''"
                ></b-form-input>
            </b-form-group>

            <b-form-group
             id="input-group-4"
             label="TC:"
             label-for="input-4"
             label-align="left"
             style="position:relative"
            >
                <b-form-input
                 size="sm"
                 id="input-4"
                 :type="tc_type"
                 v-model="$v.form.tc.$model"
                 :state="$v.form.tc.$error ? false : null"
                 lazy
                ></b-form-input>
                <i v-if="tc_eye" class="fas fa-eye eye" @click="tc_eye=!tc_eye,tc_type=''"></i>
                <i v-if="!tc_eye" class="fas fa-eye-slash eye" @click="tc_eye=!tc_eye, tc_type='password'"></i>
            </b-form-group>

            <b-form-group
             id="input-group-5"
             label="HES:"
             label-for="input-5"
             label-align="left"
             style="position:relative"
            >
                <b-form-input
                 size="sm"
                 id="input-5"
                 :type="hes_type"
                 v-model="$v.form.hes.$model"
                 :state="$v.form.hes.$error ? false : null"
                 :formatter="toUpper"
                 lazy
                ></b-form-input>
                <i v-if="hes_eye" class="fas fa-eye eye" @click="hes_eye=!hes_eye,hes_type=''"></i>
                <i v-if="!hes_eye" class="fas fa-eye-slash eye" @click="hes_eye=!hes_eye, hes_type='password'"></i>
            </b-form-group>

            <b-row class="w-100">
                <b-col cols="6">
                    <b-form-group
                     id="input-group-6"
                     label="Age:"
                     label-for="input-6"
                     label-align="left"
                    >
                        <b-form-input
                         size="sm"
                         id="input-6"
                         type="number"
                         min="1"
                         v-model="$v.form.age.$model"
                         :state="$v.form.age.$error ? false : null"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group
                     id="input-group-7"
                     label="Gender:"
                     label-for="input-7"
                     label-align="left"
                    >
                        <b-form-select
                         size="sm"
                         id="input-7"
                         v-model="$v.form.gender.$model"
                         :state="$v.form.gender.$error ? false : null"
                         :options="[{value:'male',text:'Male'},{value:'female',text:'Female'},{value:'other',text:'Other'}]"
                         required
                        ></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-button type="submit" class="info mx-2" variant="info" :ref="'btn'+index">Submit</b-button>
        </b-form>        
    </div>
</transition>
</template>

<script>
import {validations} from "@/mixins/validator.js"
  export default {
      
    mixins:[validations],

    props:["index"],

    data() {
        return {
            tc_eye:true,                  //for show-hide state in tc input value
            tc_type:"password",          //for hiding tc input value
            hes_eye:true,               //for show-hide state in hes input value
            hes_type:"password",       //for hiding hes input value
        }
    },

    mounted(){
        this.$refs[`form${this.index}`].focus()     //focus name input on mounted
    },

    methods:{
        onSubmit() {                        // submit form
            this.$v.$touch()
            if(!this.$v.$invalid){
                this.$emit("submitted")     //change number of submitted form in the parent component
                if(this.index==1){
                    let obj = new Object({
                        name:this.$refs.form1.value,
                        tel:this.$refs.tel.value,
                        email:this.$refs.email.value
                    })
                    this.$emit("payer",obj) //set payer information in the parent component
                }
                this.$refs[`btn${this.index}`].disabled=true //disable submit button on submitted form
            }
        },
        toUpper(value){                     //Uppercase for hes bootstrap-vue input formatter
            return value.toUpperCase()
        },
    }

  }
</script>

<style>
.resform{
    margin: 20px;
    padding-block: 20px;
    padding-inline: 10px;
    background-color: whitesmoke;
    border-radius: 10px;
    box-shadow: -3px -3px 5px white, 3px 3px 5px rgb(220, 220, 220);
    font-size: 13px;
    width: 300px;
    animation: right .5s ease-out;
}
.eye{
    z-index: 3;
    position: absolute;
    right: 28px;
    bottom: 8.5px;
    height: fit-content;
    width: fit-content;
    cursor: pointer;
}
.info{
  background-color: rgb(15, 125, 160);
}
    @keyframes right {
        0% {
            opacity:0;
            transform: translateX(-100%);

        }
        100% {
            opaticty:1;
            transform:translateX(0);
        }
    }
</style>