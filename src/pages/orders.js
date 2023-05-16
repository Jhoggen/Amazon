import React from "react";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import moment from "moment";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import db from "../../firebase";

function Orders({ orders }) {
  const { data: session } = useSession();
  console.log(orders);

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="font-semibold text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
      </main>
    </div>
  );
}

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  // GET LOGGED IN USER'S CREDS
  const session = await getSession(context);

  if (!session) {
    console.log("NO SESSION");
    return {
      props: {},
    };
  }

  console.log("Fetching orders from Firestore...");
  // Get orders from Firestore for the logged-in user
  const ordersRef = collection(db, "users", session.user.email, "orders");
  const q = query(ordersRef, orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);

  console.log("Processing orders...");
  const orders = await Promise.all(
    snapshot.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate().unix()),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  console.log(`Fetched ${orders.length} orders from Firestore.`);
  if (session) {
    console.log(session.user.email);
    return {
      props: { orders },
    };
  }
}
