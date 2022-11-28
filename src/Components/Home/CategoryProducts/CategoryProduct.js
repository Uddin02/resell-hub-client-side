import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaBookmark } from "react-icons/fa";
import { AuthContext } from '../../../contexts/AuthProvider';

const CategoryProduct = ({catagoryDetail}) => {

    const {  image, location, orginal_price, posted, product_name, seller_name, resell_price, year_used } = catagoryDetail;
    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(AuthContext);

    const handleBooking = event => {
      event.preventDefault();

      const form = event.target;
      const name = form.name.value;
      const email = form.email.value;
      const productName = product_name;
      const productImage = image;
      const price = form.price.value;
      const phoneNumber = form.phone.value;
      const location = form.location.value;

      const buyer = {
        name,
        email,
        product: productName,
        image: productImage,
        price,
        phoneNumber,
        location
      }
     
      fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(buyer)
        })
        .then(res => res.json()) 
        .then(result=>{
          console.log(result);
          setShowModal(false) 
          if(result.acknowledged === false){
            toast.error(`${result.message}`)
          }
          else{

            toast.success('The Item Is Booked!') 
          }
        })     
  
    
    }
    

    return (
        <div>
            <div className=" card card-compact lg:w-96 bg-base-100 shadow-xl shadow-primary">
              <figure className=''>
                <img src={image} alt="advertise" />
              </figure>
              <div className="card-body">
                <div className='flex justify-between'>
                    <h2 className="card-title">{product_name}</h2>
                    <button className="text-sky-400"><FaBookmark/></button>          
                </div>
                <h2 className="card-title text-md">Seller Name: {seller_name}</h2>
                <h2 className="card-title text-sm">Location: {location}</h2>
                <div className='lg: flex justify-between'>
                    <h2 className="card-title text-sm">Resale Price: ${resell_price}</h2>
                    <h2 className="card-title text-sm">Orginal Price: ${orginal_price}</h2>
                </div>
                <div className='lg: flex justify-between'>
                    <h2 className="card-title text-sm">Year Used: {year_used}</h2>
                    <h2 className="card-title text-sm">Posted On: {posted}</h2>    
                </div>
                 <button onClick={() => setShowModal(true)}  className="text-secondary btn btn-outline w-full btn-sm">Continue to Booking </button>
              </div>
            </div>            
              { showModal ? (
                <>
                  <form onSubmit={handleBooking} className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 mx-auto h-2/3 my-auto flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-primary">
                      <button onClick={() => setShowModal(false)} className="btn btn-sm btn-circle absolute right-6 top-4">✕</button>
                      <h3 className="text-lg mb-1 font-bold text-white">{product_name}</h3>
                      <input name="name" type="text"  defaultValue={user?.displayName} disabled className="input w-full input-bordered font-semibold" />
                      <input name="email" type="email" defaultValue={user?.email} disabled  className="input w-full input-bordered font-semibold" />
                      <h3 className="text-sm text-white font-bold">Resale price</h3>
                      <input name="price" type="text" defaultValue={resell_price} disabled  className="input w-full input-bordered font-semibold" />
                      <h3 className="text-sm text-white font-bold">Your phone number</h3>
                      <input name="phone" type="number" placeholder='Your phone number' className="input w-full input-bordered font-semibold" />
                      <h3 className="text-sm text-white font-bold">Meeting Location</h3>
                      <input name="location" type="text" placeholder='Your Meeting Location' className="input w-full input-bordered font-semibold" />
                      <input className='btn w-full' type="submit" value="Submit" />
                  </form>
                  <div className="opacity-25 fixed inset-0 z-40 bg-gray-900"></div>  
                </>
              ) : null }
        </div>
    );
};

export default CategoryProduct;

