import { required, email, minValue } from "vuelidate/lib/validators"

const hes = (value) => {
    if(!value) return false
    const letters = /^[A-Za-z]+$/
    const rest = value.slice(3)
    if(
        value.length==10&&              //HES kodu 10 haneli rakamlardan oluşur.
        value[0].match(letters)&&       //1. karakter harf
        !isNaN(value[1])&&              //2. karakter rakam
        value[2].match(letters)&&       //3. karakter harf
        !isNaN(rest)                    //Geriye kalanlar rakam
    ){
        return true
    }else{
        return false
    }
}

const tc = (value) => {
    if(!value) return false
    value = Array.from(value).map(e=>Number(e))
    const count = value.length
    const first10 = value.slice(0,10)
    const sum_ods = value[0]+value[2]+value[4]+value[6]+value[8]
    const sum_evens = value[1]+value[3]+value[5]+value[7]
    let result1 = (7*sum_ods-sum_evens)%10
    let result2 = first10.reduce((a,b)=>a+b)%10
    if(
        count==11&&             //TC kimlik no 11 haneli rakamlardan oluşur.
        value[0]!=0&&           //İlk rakam sıfır (0) olamaz.
        result1==value[9]&&     //1, 3, 5, 7 ve 9. hanelerin toplamının 7 katı ile 2, 4, 6 ve 8. hanelerin toplamı çıkartılır, sonucun 10’a bölümünden kalanı 10. haneyi verir.
        result2==value[10]      //İlk 10 hanenin toplamının 10’a bölümünden kalan, son haneyi verir.
    ){
        return true
    }else{
        return false
    }
}

const tel = (value) => {
    if(!value) return false
    let first_3 = value.slice(0,3)
    value=Array.from(value.slice(3))
    if(
        first_3=="+90"&&
        value.length==10

    ){
        return true
    }else{
        return false
    }
}

export const validations = {
    data(){
        return{
            form: {
                name: null,
                tel:"+90",
                email: null,
                tc: null,
                hes: null,
                age: null,
                gender:null,
            },
        }
    },
    validations:{
        form:{
            name:{
                required,
            },
            tel:{
                required,
                tel
            },
            email:{
                required,
                email
            },
            tc:{
                required,
                tc
            },
            hes:{
                required,
                hes
            },
            age:{
                required,
                minLength:minValue(6)
            },
            gender:{
                required
            }
        }
    },
  }