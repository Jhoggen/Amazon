import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header>
      <div className="flex items-center bg-amazon_blue p1 flex-grow py-2">
        <div className="mt-2 mx-6 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            className="object-contain cursor-pointer"
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            alt="imga"
          />
        </div>

        <div className="hidden sm:flex bg-yellow-400 hover:bg-yellow-500 items-center h-10 rounded-md flex-grow cursor-pointer">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
            placeholder="Search..."
          />
          <MagnifyingGlassIcon className="h-12 p-4" />
        </div>

        {/* Right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          {session ? (
            <div onClick={() => signOut()} className="link">
              <p>Hello {session.user.name}</p>
              <p className="font-extrabold md:text-small">Account & Lists</p>
            </div>
          ) : (
            <div onClick={() => signIn()} className="link">
              <p>Login</p>
              <p className="font-extrabold md:text-small">Account & Lists</p>
            </div>
          )}

          <div onClick={() => {router.push("/orders")}} className="link">
            <p>Return</p>
            <p className="font-extrabold md:text-small">& Orders</p>
          </div>

          <div onClick={() => {router.push("/checkout")}} className="link relative flex items-center">
            <span className="absolute top-0 left-8 md:right-8 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items.length}
            </span>

            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-small mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* bottom nav */}
      <div
        className="flex items-center space-x-4 p-2 pl-6 bg-amazon_blue-light text-white text-small
      "
      >
        <p className="link flex iten-center">
          <Bars3Icon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
