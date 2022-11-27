import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CategoryProduct from './CategoryProduct';


const CategoryProducts = () => {
    
    const catagoryDetails = useLoaderData();
    
    return (
        <div className="lg:mx-12 lg:my-10 mx-5">
            <h2 className='text-2xl'>Products found {catagoryDetails.length}</h2>
            <div className='mt-10 grid lg:grid-cols-3 gap-10'>
                {
                    catagoryDetails.map(catagoryDetail => <CategoryProduct
                        key={catagoryDetail._id}
                        catagoryDetail={catagoryDetail}
                    ></CategoryProduct>)
                }
            </div>
        </div>
    );
};

export default CategoryProducts;
