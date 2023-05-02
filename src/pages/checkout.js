import React from "react";
import Link from "next/link";
import Header from "../components/Header";

function checkout() {
  return (
    <div className="bg-gray-100">
      <Header />

      <Link href={"/"}>
        <h1>CHECKOUT</h1>
      </Link>
    </div>
  );
}

export default checkout;
