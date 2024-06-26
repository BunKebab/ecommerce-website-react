import {useEffect} from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'

import {productData} from '../../features/products/productslice'

import Productcard from '../../components/Productcard'

const Products = () => {
  const data = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productData())
  }, [])

  console.log(data)

  return (
    <div>
      <Productcard/>
    </div>
  )
}

export default Products