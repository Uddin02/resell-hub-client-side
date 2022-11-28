import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import ConfirmationModal from '../Shared/ConfirmationModal/ConfirmationModal';

const MyProducts = () => {

    const { user, logOut } = useContext(AuthContext);
    const [deletingProduct, setDeletingProduct] = useState(null);

    const closeModal = () => {
        setDeletingProduct(null);
    }

    const navigate = useNavigate();

    const url = `http://localhost:5000/myProducts?email=${user?.email}`;

    const { data: myProducts = [], refetch } = useQuery({
        queryKey: ['myProducts', user?.email],
        queryFn: async () => {
            const res = await fetch(url,{
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

    const handleStatusUpdate = id =>{
        // console.log(id);
        fetch(`http://localhost:5000/myProduct/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({status: 'Sold'})
        })
        .then(res=> res.json())
        .then(data=>{
            console.log(data);
            refetch()
        })
    }
    
    const handleSoldStatusUpdate = id =>{
        // console.log(id);
        fetch(`http://localhost:5000/myProduct/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({status: 'Available'})
        })
        .then(res=> res.json())
        .then(data=>{
            console.log(data);
            refetch()
        })
    }

    const handleDeleteProduct = product => {
        fetch(`http://localhost:5000/myProducts/${product._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Product ${product?.product_name} removed successfully`)
                }

            })
    }

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
                            <th>Resale Price</th>
                            <th>Location</th>
                            <th>Sales status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProducts &&
                            myProducts?.map((myProduct, i) => <tr key={myProduct?._id}>
                                <th>{i+1}</th>
                                <td className='font-semibold'>{myProduct?.product_name}</td>
                                <td><img className='w-20' src={myProduct?.image} alt="product_image" /></td>
                                <td className='font-semibold'>${myProduct?.resell_price}</td>
                                <td className='font-semibold'>{myProduct?.location}</td>
                                {/* <td className='font-semibold'>{myProduct?.resell_price}</td> */}
                               
                                <td>
                                    {
                                        myProduct?.status==="Available" ? 
                                        <button onClick={()=>handleStatusUpdate(myProduct?._id)} className='btn btn-sm bg-slate-800 border-none text-white'>{ myProduct?.status }</button>
                                        :
                                        <button onClick={()=>handleSoldStatusUpdate(myProduct?._id)} className='btn btn-sm bg-slate-800 border-none text-white'>{ myProduct?.status }</button>
                                    }
                                </td>
                                   
                                <td>
                                    <label onClick={() => setDeletingProduct(myProduct)} htmlFor="confirmation-modal" className="btn btn-sm bg-red-700 border-none text-white">Delete</label>
                                </td>
                            </tr>)
                        }
                        
                        
                    </tbody>
                </table>
            </div>
            {
                deletingProduct && <ConfirmationModal
                    title={`Are you sure you want to delete this product?`}
                    message={`If you delete '${deletingProduct?.product_name}'. It cannot be undone.`}
                    successAction = {handleDeleteProduct}
                    successButtonName="Delete"
                    modalData = {deletingProduct}
                    closeModal = {closeModal}
                >
                </ConfirmationModal>
            }
        </div>

    );
};

export default MyProducts;