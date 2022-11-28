import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../Shared/Loading/Loading";

const AdvertisedItems = () => {
  const { data: advertises, isLoading } = useQuery({
    queryKey: ["advertises"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://resell-hub-server.vercel.app/advertisesdItems?status=Available`
        );
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="text-4xl text-primary">
        <span className="border-b-2 border-accent">Advertised</span> items
      </h2>

      {advertises.length === 0 ? (
        <h2 className="text-4xl text-gray-800 mt-10 font-semibold">
          There is no Advertised items to show
        </h2>
      ) : (
        <div  className="mt-14 grid lg:grid-cols-1 gap-10">
          {advertises.map((advertise) => (
            <div key={advertise?._id} className="">
              <div className="card lg:card-side bg-base-100 shadow-xl max-w-2xl mb-6 mx-auto ">
                <figure className="">
                  <img className="w-96" src={advertise?.image} alt="Album" />
                </figure>
                <div className="card-body justify-around">
                  <h2 className="card-title">{advertise?.product_name}</h2>
                  <h2 className=" text-md">
                    Seller Name: {advertise?.seller_name}
                  </h2>
                  <h2 className=" text-sm">Location: {advertise?.location}</h2>
                  <h2 className=" text-sm">
                    Product Condition:{" "}
                    {advertise?.product_condition
                      ? advertise?.product_condition
                      : "Fair"}
                  </h2>
                  <h2 className=" text-sm">
                    Resale Price: ${advertise?.resell_price}
                  </h2>
                  <h2 className=" text-sm">
                    Year Of Purchase:{" "}
                    {advertise?.year_of_purchase
                      ? advertise?.year_of_purchase
                      : "2022-02-3"}
                  </h2>
                  <h2 className="text-sm">Posted On: {advertise?.posted}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvertisedItems;
