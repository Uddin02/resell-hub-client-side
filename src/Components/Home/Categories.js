import React, { useEffect, useState } from 'react';

const Categories = () => {

    const [categories, setCategories] = useState([]);
    // console.log(categories)
    
  
    useEffect(() => {
      fetch("cateGories.json")
        .then((res) => res.json())
        .then((data) => setCategories(data));
    }, []);

    return (
        <div className='my-14'>
            <h2 className="text-4xl text-primary"><span className="border-b-2 border-accent">second-hand Phones</span> categories</h2>
                <button className='mt-10 grid lg:grid-cols-4 gap-10'>            
                    {categories.map((category) => (
                    <div className=" card card-compact lg:w-80 bg-base-100 shadow-xl shadow-primary">
                    <figure className='mt-2'>
                        <img src={category.image} alt="advertise" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{category.name}</h2>         
                    </div>
                </div>
            ))}
            </button>
        </div>
    );
};

export default Categories;