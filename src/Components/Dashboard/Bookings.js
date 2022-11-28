import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Bookings = () => {

    const { user, logOut } = useContext(AuthContext);

    const navigate = useNavigate();

    const url = `http://localhost:5000/bookings?email=${user?.email}`;

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            if(data?.message){
                logOut();
                navigate('/login')
            }
            else{

                return data;
            }
        }


    })
    

    return (
        <div>
            <h3 className="m-5 text-2xl font-bold">My Bookings {bookings?.length}</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Product Image</th>
                            <th>Product Price</th>
                            <th>Seller Phone Number</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings &&
                            bookings?.map((booking, i) => <tr key={booking?._id}>
                                <th className='font-semibold text-gray-900'>{i+1}</th>
                                <td className='font-semibold text-gray-900'>{booking?.product}</td>
                                <td className='font-semibold text-gray-900'><img className='w-20' src={booking?.image} alt="product_image" /></td>
                                <td className='font-semibold text-gray-900'>${booking?.price}</td>
                                <td className='font-semibold text-gray-900'>{booking?.phoneNumber}</td>
                                <td>
                                    {
                                        booking.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-sm btn-primary text-white'>Pay</button></Link>
                                    }
                                    {
                                        booking.price && booking.paid && <span className='text-green-800 font-semibold'>Paid</span>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;