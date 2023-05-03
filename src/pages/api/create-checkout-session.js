const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const transformedItems = items.map((item) => ({
    price_data: {
        currency: "usd",
        unit_amount_decimal: item.price * 100,
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.image],
        },
      },
      quantity: 1,
  }))

  const session = await stripe.checkout.sessions.create({
    line_items: transformedItems,
    payment_method_types: ["card"],
    shipping_address_collection: {
        allowed_countries: ["GB", "SE",],
    }
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/cancel`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });
  res.status(200).json({ id: session.id });
};
