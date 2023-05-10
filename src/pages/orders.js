import React, { useEffect } from "react";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import moment from "moment";
import {
  collection,
  orderBy,
  getDocs,
  query,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";
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
  //GET LOGGED IN USERS CREDS
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  // get firebase collections
    const ordersCollection = collection(
      db,
      "users",
      session.user.email,
      "orders"
    )
    const queryOrders = query(
      ordersCollection,
      orderBy("timestamp", "desc")
    );
    const ordersSnapshot = await getDocs(queryOrders);
    console.log("CONSOLE.LOG:", ordersSnapshot);

    const orders = [];
    for (const order of ordersSnapshot.docs) {
      const items = await stripe.checkout.session.listLineItems(order.id, {
        limit: 100,
      });
      orders.push({
        id: order.id,
        amount: order.data().amount,
        amountShipping: order.data().amount_shipping,
        images: order.data().images,
        timestamp: moment(order.data().timestamp.toDate()).unix(),
        items: items.data,
      });
    }

    return {
      props: {
        orders: JSON.stringify(orders),
      },
    };
}
