import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const MyProducts = () => {

    const { user, logOut } = useContext(AuthContext);

    const navigate = useNavigate();

    const url = `http://localhost:5000/myProducts?email=${user?.email}`;

    const { data: myProducts = [] } = useQuery({
        queryKey: ['myProducts', user?.email],
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
            <h2 className='text-3xl my-4 font-bold'>My products {myProducts.length}</h2>
            
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Product Image</th>
                            <th>Product Price</th>
                            <th>Location</th>
                            <th>Resale Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProducts &&
                            myProducts?.map((myProduct, i) => <tr key={myProduct._id}>
                                <th>{i+1}</th>
                                <td className='font-semibold'>{myProduct?.product_name}</td>
                                <td><img className='w-20' src={myProduct?.image} alt="product_image" /></td>
                                <td className='font-semibold'>{myProduct?.resell_price}</td>
                                <td className='font-semibold'>{myProduct?.location}</td>
                                <td className='font-semibold'>{myProduct?.resell_price}</td>
                                
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default MyProducts;