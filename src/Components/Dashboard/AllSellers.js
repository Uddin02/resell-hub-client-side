import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../Shared/Loading/Loading';


const AllSellers = () => {

    const { data: sellers, isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/users/Seller');
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


    // const handleDeleteSeller = seller => {
    //     fetch(http://localhost:5000/users/${seller._id}, {
    //         method: 'DELETE',
    //         headers: {
    //             authorization: bearer ${localStorage.getItem('accessToken')},
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             if (data.deletedCount > 0) {
    //                 refetch();
    //                 toast.success(Buyer ${seller.name} removed successfully)
    //             }

    //         })
    // }




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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sellers?.map((seller, i) => <tr
                                    key={seller._id}
                                    value={seller}
                                    className="hover">
                                    <th>{i + 1}</th>
                                    <td>{seller?.name}</td>
                                    <td>{seller?.email}</td>
                                    <td><label  className="btn btn-xs btn-error">delete</label></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllSellers;

// onClick={() => handleDeleteSeller(seller)}