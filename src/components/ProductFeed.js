import React from "react";
import Product from "./Product";



function ProductFeed({ products }) {
  return (
    <>
      <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
        {products
          .slice(0, 4)
          .map(({ id, price, description, category, image, title, rating }) => (
            <Product
              key={id}
              id={id}
              price={price}
              description={description}
              category={category}
              image={image}
              title={title}
              rating={rating}
            />
          ))}

        <div className="md:col-span-full">
          <img src="https://links.papareact.com/dyz" alt="asd" />
        </div>

        <div className="md:col-span-2 ">
          {products
            .slice(4, 5)
            .map(({ id, price, description, category, image, title, rating }) => (
              <Product
                key={id}
                id={id}
                price={price}
                description={description}
                category={category}
                image={image}
                title={title}
                rating={rating}
              />
            ))}
        </div>
        {products
          .slice(5, products.length)
          .map(({ id, price, description, category, image, title, rating }) => (
            <Product
              key={id}
              id={id}
              price={price}
              description={description}
              category={category}
              image={image}
              title={title}
              rating={rating}
            />
          ))}
      </div>
    </>
  );
}

export default ProductFeed;


