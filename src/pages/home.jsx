import React from "react";
import { Button } from "../components/Button";
import ProductsList from "../components/ProductsList";

const Home = () => {
  return (
    <div className="pt-14">
      <div className="flex flex-col space-y-8 justify-center items-center h-full py-24">
        <div className="relative overflow-hidden px-20 min-h-60 max-w-screen-xl  w-full mx-auto bg-white space-y-6 flex flex-col justify-center items-start">
          <h1 className="text-4xl font-semibold tracking-tight">
            Grab Upto 50% Off On <br />
            Selected Headphone
          </h1>
          <Button size="lg">Discover More</Button>
          <img
            src="hero-banner.png"
            alt="hero img"
            className="absolute right-[10%] aspect-video h-64 object-cover"
          />
        </div>
      </div>
      <ProductsList />
    </div>
  );
};

export default Home;
