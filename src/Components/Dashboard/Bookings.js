import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Bookings = () => {

    const { user, logOut } = useContext(AuthContext);

    const navigate = useNavigate();

    const url = `http://localhost:5000/bookings?email=${user?.email}`;

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url);
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
            <h3 className="text-3xl my-4">My Bookings</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Product Image</th>
                            <th>Product Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings &&
                            bookings?.map((booking, i) => <tr key={booking._id}>
                                <th>{i+1}</th>
                                <td>{booking.product}</td>
                                <td><img className='w-20' src={booking?.image} alt="product_image" /></td>
                                <td>{booking.price}</td>
                                <td>{booking.appointmentDate}</td>
                                
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;