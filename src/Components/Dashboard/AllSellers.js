import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../Shared/Loading/Loading';
import './AllSeller.css';


const AllSellers = () => {

    const [deletingSeller, setDeletingSeller] = useState(null);

    const closeModal = () => {
        setDeletingSeller(null);
    }

    const { data: sellers, isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            try {
                const res = await fetch('https://resell-hub-server.vercel.app/users/Seller',{
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }

        }
    });



    if (isLoading) {
        <Loading/>
    }


    const handleDeleteSeller = seller => {
        fetch(`https://resell-hub-server.vercel.app/users/${seller._id}`, {
            method: 'DELETE'           
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Seller ${seller.name} removed successfully`)
                }

            })
    }

    const handleVerify = seller => {
        fetch(`https://resell-hub-server.vercel.app/users/${seller._id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ verified: 'verified' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    refetch()
                    toast.success(`Seller ${seller.name} verified successfully`)
                }

            })
    }




    return (
        <div>
            <div>
                <h2 className="m-5 text-2xl font-bold">Total sellers: {sellers?.length}</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                                <th>Verify</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sellers?.map((seller, i) => <tr
                                    key={seller._id}
                                    value={seller}
                                    className="hover">
                                    <th>{i + 1}</th>
                                    {seller?.status === 'verified' &&
                                        <td className='font-semibold text-gray-900'>{seller?.name}<img src="https://i.ibb.co/n1rvDcv/valid-vector-icon-png-260889.jpg" alt="verifyIcon" class="verifyIcon"></img></td>
                                    }
                                    {
                                        seller?.status !== 'verified' &&
                                        <td className='font-semibold text-gray-900'>{seller?.name}</td>
                                    }
                                    <td className='font-semibold text-gray-900'>{seller?.email}</td>
                                    <td>
                                        <label onClick={() => setDeletingSeller(seller)} htmlFor="confirmation-modal" className="btn btn-sm bg-red-700 border-none text-white">Delete</label>
                                    </td>

                                    {seller?.status === 'verified' &&
                                        <td><p className='text-green-600 font-extrabold'>Verified</p></td>
                                    }
                                    {
                                        seller?.status !== 'verified' &&
                                        <td><label onClick={() => handleVerify(seller)} className="btn btn-sm b">verify</label></td>
                                    }
                                    
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                deletingSeller && <ConfirmationModal
                    title={`Are you sure you want to delete ${deletingSeller.name} ?`}
                    message={`If you delete Seller '${deletingSeller.name}'. It cannot be undone.`}
                    successAction = {handleDeleteSeller}
                    successButtonName="Delete"
                    modalData = {deletingSeller}
                    closeModal = {closeModal}
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default AllSellers;
