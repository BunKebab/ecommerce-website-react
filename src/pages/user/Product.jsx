import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchProductById } from "../../features/products/productslice";
import { addToCart } from "../../features/cart/cartslice";

import Loading from "../../components/Loading";

const Product = () => {
  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productslice
  );

  console.log(product)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (loading) {
    return <Loading />;
  }

  if (error !== null) {
    return <h1>Something happened, please try again later</h1>;
  }

  if (product === null) {
    return <h1>product could not be found</h1>;
  }

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt={product.name}
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={product.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name}
              </h1>
              <p className="leading-relaxed">{product.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex ml-6 items-center"></div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {product.price} $
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
