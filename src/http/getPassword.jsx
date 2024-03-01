import {MD5} from "crypto-js";

export const getPassword = () => {
    const now = new Date()
    const dateOptions = {
        day:'2-digit',
        month:'2-digit',
        year: 'numeric',
    }
    const date = new Intl.DateTimeFormat("zh-CN", dateOptions).format(now).replace('/', "",).replace('/', "",) //20240229
    const md = MD5(`${process.env.REACT_APP_API_PASSWORD}_${date}`).toString()
      //получаю пароль
    return md
}
