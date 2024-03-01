import { getPassword } from "./getPassword";
import axios from "axios"

export const getBrands = (setBrands) => {
    var data = JSON.stringify({
        "action": "get_fields",
        "params": {"field": "brand"}
    });
      
      var config = {
        method: 'post',
        url: 'http://api.valantis.store:40000/',
        headers: { 
          'X-Auth': getPassword(), 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        
        let { result }  = response.data
        let uniqueArray = Array.from(new Set(result.filter((brand) => brand !== null)))//remove duplicates & null
        setBrands(uniqueArray)
        return uniqueArray

      })
      .catch(function (error) {
        console.log(error.response);
      });
      
}
