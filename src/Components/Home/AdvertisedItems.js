import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaBookmark } from "react-icons/fa";
import Loading from '../Shared/Loading/Loading';

const AdvertisedItems = () => {

    const { data: advertises, isLoading } = useQuery({
      queryKey: ["advertises"],
      queryFn: async () => {
        try {
          const res = await fetch("http://localhost:5000/advertisesdItems");
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
        <div className='mt-14 grid lg:grid-cols-4 gap-10'>            
            {advertises.map((advertise) => (
            <div key={advertise._id} className=" card card-compact lg:w-80 bg-base-100 shadow-xl shadow-primary">
              <figure className=''>
                <img src={advertise.image} alt="advertise" />
              </figure>
              <div className="card-body">
                <div className='flex justify-between'>
                    <h2 className="card-title">{advertise.product_name}</h2>
                    <button className="text-sky-400"><FaBookmark/></button>          
                </div>
                <h2 className="card-title text-md">Seller Name: {advertise.seller_name}</h2>
                <h2 className="card-title text-sm">Location: {advertise.location}</h2>
                <div className='lg: flex justify-between'>
                    <h2 className="card-title text-sm">Resale Price: {advertise.resell_price}</h2>
                    <h2 className="card-title text-sm">Orginal Price: {advertise.orginal_price}</h2>
                </div>
                <div className='lg: flex justify-between'>
                    <h2 className="card-title text-sm">Year Used: {advertise.year_used}</h2>
                    <h2 className="card-title text-sm">Posted On: {advertise.posted}</h2>    
                </div>
                {/* <div className="card-actions justify-start">
                  <button className="text-sky-400"><Link to={`/advertise/${advertise.id}`}>Know more</Link></button>
                </div> */}
              </div>
            </div>
        ))}
        </div>
    );
};

export default AdvertisedItems;