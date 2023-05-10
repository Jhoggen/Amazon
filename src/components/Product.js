import React, { useEffect, useState } from "react";
import Image from "next/image";
import StarIcon from "@heroicons/react/24/solid/StarIcon";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, price, description, category, image, title }) {
  const [hasPrime, setHasPrime] = useState(true);
  const [rating, setRating] = useState(1);

  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    setHasPrime(Math.random() < 0.5);
  }, []);

  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const product = {
      id,
      price,
      description,
      category,
      image,
      title,
      hasPrime,
      rating,
    };
    //send the product as an action/payload to the REDUX STORE.. the basket slice
    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <div className="flex justify-center items-center">
        <Image
          placeholder="empty"
          src={image}
          height={200}
          width={200}
          className="object-contain"
          alt="asd"
        />
      </div>

      <h4 className="my-3">{title}</h4>

      <div className="flex my-2">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500 " />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <p>${price}</p>
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            className="w-12"
            src="https://m.media-amazon.com/images/G/51/prime/marketing/slashPrime/amazon-prime-delivery-checkmark._CB611037204_.png"
            alt="asd"
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button onClick={addItemToBasket} className="button mt-auto">
        Add to basket
      </button>
    </div>
  );
}

export default Product;
