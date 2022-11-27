import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../Shared/Loading/Loading';


const AllBuyers = () => {


    const { data: buyers, isLoading, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/users/Buyer');
                const data = await res.json();
                return data;
            }
            catch (error) {

            }

        }
    });
    


    // const handleDeleteBuyer = buyer => {
    //     fetch(http://localhost:5000/users/${buyer._id}, {
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
    //                 toast.success(Buyer ${buyer.name} removed successfully)
    //             }

    //         })
    // }




    if (isLoading) {
        return <Loading/>
    }

    return (
        <div>
            <div>
                <h2 className="m-5 text-2xl font-bold">Total buyers: {buyers?.length}</h2>
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
                                buyers?.map((buyer, i) => <tr
                                    key={buyer._id}
                                    value={buyer}
                                    className="hover">
                                    <th>{i + 1}</th>
                                    <td>{buyer?.name}</td>
                                    <td>{buyer?.email}</td>
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

export default AllBuyers;

// onClick={() => handleDeleteBuyer(buyer)}