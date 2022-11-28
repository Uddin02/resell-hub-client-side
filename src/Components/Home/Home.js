import React from "react";
import banner from "../../assets/banner.png";
import AdvertisedItems from "./AdvertisedItems";
import Categories from "./Categories";
import ContactUs from "./ContactUs";

const Home = () => {
  return (
    <div>
      <div className="hero grid justify-center lg:-mt-24">
        <img className="lg:w-11/12 " src={banner} alt="banner" />
      </div>
        <div className="lg:mx-14 mb-10 mx-5">
            <AdvertisedItems/>
            <Categories/>
            <ContactUs/>
        </div>
    </div>
  );
};

export default Home;
