import React, { useEffect, useState } from 'react'
import { Box, TextField, Button, Typography } from "@mui/material";
import { getIds } from "../../http/getGoods";


export const FilterList = ({ brands, setGoods, page, setIsLoading, setShowPagin }) => {
  const [searchByPrice, setSearchByPrice] = useState('')
  const [searchByName, setSearchByName] = useState('')
  const dropFilters = () => {
    setSearchByName('')
    setSearchByPrice('')
    setIsLoading(true)
    getIds(setGoods, page, setIsLoading)
    setShowPagin(true)
  }
  const chooseBrand = (e) => {
    const brand = {
      "action": "filter",
      "params": { "brand": e.target.value }
    }
    setIsLoading(true)
    getIds(setGoods, page, setIsLoading, brand)
    setShowPagin(false)
  }
  useEffect(() => {
    const search = {
      "action": "filter",
      "params": { "product": searchByName }
    }
    setIsLoading(true)
    setShowPagin(false)
    if (searchByName !== '') {

      const timeOutId = setTimeout(() => getIds(setGoods, page, setIsLoading, search), 1500);
      
      return () => clearTimeout(timeOutId);
    } else {
      const timeOutId = setTimeout(() => getIds(setGoods, page, setIsLoading), 1500);

      setShowPagin(true)
      return () => clearTimeout(timeOutId);
    }
  }, [searchByName])

  useEffect(() => {
    const search = {
      "action": "filter",
      "params": { "price": +searchByPrice }
    }
    setIsLoading(true)
    setShowPagin(false)
    if (searchByPrice !== '') {

      const timeOutId = setTimeout(() => getIds(setGoods, page, setIsLoading, search), 1500);
      return () => clearTimeout(timeOutId);
    } else {
      const timeOutId = setTimeout(() => getIds(setGoods, page, setIsLoading), 1500);
      
      setShowPagin(true)
      return () => clearTimeout(timeOutId);
    }
  }, [searchByPrice])

  return (
    <Box><Typography variant="button" component="div">Бренды:</Typography>
      {brands.map(brand => <Button key={brand} value={brand} onClick={chooseBrand} >{brand}</Button>)}

      <Button onClick={dropFilters} variant="outlined">Сбросить фильтр</Button>


      <Box sx={{ display: 'flex', marginTop: '18px' }}>
        <TextField fullWidth label="Поиск по названию" value={searchByName} onChange={(e) => setSearchByName(e.target.value)} id="fullWidth" />
        <TextField sx={{ marginLeft: '40px' }} value={searchByPrice} onChange={(e) => setSearchByPrice(e.target.value)} label="Поиск по цене" id="fullWidth" />

      </Box>
    </Box>
  )
}
