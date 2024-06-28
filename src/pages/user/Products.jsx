import {useEffect} from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'

import {productData} from '../../features/products/productslice'

import Productcard from '../../components/Productcard'

const Products = () => {
  const {
    data,
    loading,
    error
  } = useSelector((state) => state.productslice )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productData())
  }, [])

  console.log('Data:', data)

  return (
    <div className="flex flex-col align-middle justify-center">
      <h1>Products catalogue</h1>
      <Productcard data={data} loading={loading} error={error} />
    </div>
  )
}

export default Products