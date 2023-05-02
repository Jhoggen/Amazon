import React from "react";
import Image from "next/image";
import StarIcon from "@heroicons/react/24/solid/StarIcon";

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
  return (
    <div className="grid grid-cols-5">
      <Image alt="" src={image} height={200} width={200} className="object-contain" />

      <div className="col-span-3 m-5">
        <p>{title}</p>
        <div className="flex ">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500 " />
            ))}
        </div>

        <p className="text-xs my-2">{description}</p>
      
      </div>
    </div>
  );
}

export default CheckoutProduct;
