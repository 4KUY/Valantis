import axios from "axios"
import { getPassword } from "./getPassword";


export const getIds = (setGoods, page, setIsLoading, brand, search) => {

  let data = ''
  //config body request 
  if (brand !== undefined) {
    data = JSON.stringify(brand);
  } else if (search !== undefined) {
    data = JSON.stringify(search);
  } else {
    data = JSON.stringify({
      "action": "get_ids",
      "params": { "offset": (page - 1) * 50, "limit": 50 }
    });
  }
  
  //config request 
  var config = {
    method: 'post',
    url: "https://api.valantis.store:41000/",
    headers: {
      'X-Auth': getPassword(),
      'Content-Type': 'application/json'
    },
    data: data
  };



  axios(config)
    .then(function (response) {
      let { result } = response.data;
      let uniqueArr = []
      //При поиске может прийти тысячи элементов поставил стопер что бы избежать лагов в api filter нет поле limit пагинацию на фронте не стал делать
      if (result.length > 300) {
        uniqueArr = result.slice(0, 300)
      } else {
        uniqueArr = result;
      }
      console.log(uniqueArr)
      return getItems(uniqueArr, setGoods, setIsLoading)
    })
    .catch(function (error) {

      if (error.response.status === 500) {
        axios(config)
          .then(function (response) {
            let { result } = response.data;
            let uniqueArr = []
            if (result.length > 300) {
              uniqueArr = result.slice(0, 300)
            } else {
              uniqueArr = result;
            }
            return getItems(uniqueArr, setGoods, setIsLoading)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    });
}


const getItems = (uniqueArr, setGoods, setIsLoading) => {

  var data = JSON.stringify({
    "action": "get_items",
    "params": { "ids": uniqueArr }
  });
  var config = {
    method: 'post',
    url: process.env.REACT_APP_API_URL,
    headers: {
      'X-Auth': getPassword(),
      'Content-Type': 'application/json'
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      let { result } = response.data
      const arr = Object.values(result.reduce((acc, n) => (
        acc[n.id] = n.checked ? n : (acc[n.id] || n),
        acc
      ), {}));
      setGoods(arr)
      setIsLoading(false)
      return arr
    })
    .catch(function (error) {

      console.log(error)
      if (error.response.status === 500) {
        axios(config)
          .then(function (response) {
            let { result } = response.data
            const arr = Object.values(result.reduce((acc, n) => (
              acc[n.id] = n.checked ? n : (acc[n.id] || n),
              acc
            ), {}));
            setGoods(arr)
            setIsLoading(false)
            return arr
          })
          .catch(function (error) {
            console.log(error.response.status)
          })
      }
    });
}



