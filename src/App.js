import { useEffect, useState } from "react";
import { getIds } from "./http/getGoods";
import { Container,  Pagination, Box, LinearProgress, } from "@mui/material";
import { getBrands } from "./http/getBrands";
import { ProductList } from "./components/ProductList";
import { FilterList } from "./components/filters/FilterList";

function App() {
  const [goods, setGoods] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [brands, setBrands] = useState([])
  const [showPagin, setShowPagin] = useState(true)
 
  useEffect(() => {
    setIsLoading(true)
    getIds(setGoods, page, setIsLoading)
  }, [page])
  
  useEffect(() => {
    getBrands(setBrands)
  }, [])
  

  return (
    <Container >

      <FilterList brands={brands} setGoods={setGoods} page setIsLoading={setIsLoading} setShowPagin={setShowPagin}/>
      {isLoading ? <Box sx={{ p: 5 }}><LinearProgress /></Box>
        :
        <ProductList goods={goods}  />
        }
        {showPagin ? <Box component="section" sx={{ p: 2, m: '20px auto 20px auto', width: 450 }}>
            <Pagination count={160} size="large" page={page} onChange={(_, num) => setPage(num)} />
          </Box> : ''}

    </Container>
  );
}

export default App;
