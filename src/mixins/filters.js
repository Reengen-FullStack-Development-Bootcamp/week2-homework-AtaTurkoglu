export default {
    filters:{
        toUpper(value){
            return value.toUpperCase()
          },
          TL(value){
            return value+"TL"
          },
          USD(value){
            return "$"+value
          },
          EURO(value){
            return "€"+value
          },
          Tel(value){
            return value.slice(2)
          },
          Email(value){
            let name = value.substring(0,(value.indexOf("@")))
            return name[0]+"......"+name[name.length-1]+value.slice(value.indexOf("@"))
          }
    }
}