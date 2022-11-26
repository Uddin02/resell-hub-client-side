import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../Shared/Loading/Loading";

const Categories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/categories");
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="my-20">
      <h2 className="text-4xl text-primary">
        <span className="border-b-2 border-accent">Second Hand Phone</span> categories</h2>
      <div className='mt-16 grid lg:grid-cols-4 gap-10'>
        {categories.map((category) =>(                       
            <Link key={category._id} to={`/categoryproducts/${category?._id}`}>            
              <div  className=" card card-compact lg:w-80 bg-base-100 shadow-xl shadow-primary">
                  <figure className='mt-2'>
                      <img src={category.image} alt="advertise" />
                  </figure>
                  <div className="card-body">
                      <h2 className="card-title">{category.name}</h2>         
                  </div>
              </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
