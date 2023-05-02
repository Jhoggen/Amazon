import React, { useState } from "react";
import Image from "next/image";
import StarIcon from "@heroicons/react/24/solid/StarIcon";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, price, description, category, image, title }) {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime] = useState(Math.random() < 0.5);

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
          <p>$ {price}</p>
        </div>

        {hasPrime && (
          <div className="flex items-center space-x-2 -mt-5">
            <Image
              width={50}
              height={50}
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt="Prime"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
        <button className="button mt-auto">Add to basket</button>
      </div>
  );
}

export default Product;
