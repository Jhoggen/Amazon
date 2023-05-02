import React from "react";
import Image from "next/image";
import StarIcon from "@heroicons/react/24/solid/StarIcon";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({
  id,
  price,
  description,
  category,
  rating,
  title,
  image,
  hasPrime,
}) {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      price,
      description,
      category,
      rating,
      title,
      image,
      hasPrime,
    };
    //Push item to redux
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    //Remove item from redux
    dispatch(removeFromBasket({ id }));
  };
  return (
    <div className="grid grid-cols-5">
      <Image
        alt=""
        src={image}
        height={200}
        width={200}
        className="object-contain"
      />

      <div className="col-span-3 m-5">
        <p>{title}</p>
        <div className="flex ">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500 " />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <p>$ {price}</p>
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              className="w-12"
              loading="lazy"
              src="https://m.media-amazon.com/images/G/51/prime/marketing/slashPrime/amazon-prime-delivery-checkmark._CB611037204_.png"
              alt=""
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button onClick={addItemToBasket} className="button mt-auto">
          Add to Basket
        </button>
        <button onClick={removeItemFromBasket} className="button mt-auto">
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
