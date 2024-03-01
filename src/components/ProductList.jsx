import React from 'react'
import { Card, Grid, CardContent } from "@mui/material";

import Typography from '@mui/material/Typography';
export const ProductList = ({ goods }) => {
  return (
    <Grid sx={{ marginTop: '13px' }} container spacing={4}>
      {goods.length === 0 ? <Typography variant="h4" component="div">Ничего не найдено</Typography>
        : <>
          {goods.map(good => (

            <Grid key={good.id} sx={{ minHeight: 170 }} item xs={11} md={4}>
              <Card sx={{ minWidth: 275, minHeight: 160 }}>
                <CardContent sx={{ minWidth: 275, minHeight: 160 }}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {good.id}
                  </Typography>

                  <Typography variant="h5" component="div">
                    {good.product}
                  </Typography>
                  {good.brand === null ? '' : <Typography sx={{ paddingTop: '13px' }} variant="overline" >Brand: {good.brand}</Typography>}



                </CardContent>
                <Typography variant="body2" sx={{ position: 'relative', bottom: '10px', left: '13px' }} >
                  Price:{good.price}
                </Typography>
              </Card>

            </Grid>

          ))}</>

      }



    </Grid>
  )
}
