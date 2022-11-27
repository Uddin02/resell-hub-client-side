import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import image from '../../assets/Add-notes.png';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../Shared/Loading/Loading';

const AddProducts = () => {

    const { user } = useContext(AuthContext);
    // console.log(user.email);

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
    // console.log(categories);

    if (isLoading) {
        return <Loading />;
    }
    
    const postedTime = new Date().toLocaleTimeString();
    // console.log(postedTime);

    const handleAddService = event =>{
        event.preventDefault();
        const form = event.target;
        const categoryID = form.categoryId.value;
        const ModelName = form.model_name.value;
        const productImg = form.product_img.value;
        const sellerName = form.seller_name.value;
        const sellerlocation = form.location.value;
        const originalPrice = form.original_price.value;
        const resalePrice = form.resale_price.value;
        const yearUsed = form.year_used.value;
        const userEmail = user.email;
        
        // console.log(userEmail);
        
        const productDetail = {
            id: categoryID,
            image: productImg,
            product_name: ModelName,
            location: sellerlocation,
            resell_price: resalePrice,
            orginal_price: originalPrice,
            year_used: yearUsed,
            seller_name: sellerName,
            seller_email: userEmail,
            posted: postedTime
        }
   
        fetch('http://localhost:5000/addProduct', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(productDetail)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.acknowledged){
                    toast.success('Product added succesfully')
                    form.reset();
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="grid max-w-screen-xl  grid-cols-1 mb-5 gap-8 px-5 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-10 xl:px-10 bg-[#e3fef6] my-10">
            <div className="flex flex-col items-center">
                <div className="space-y-1">
                    <h2 className="text-4xl font-bold leading-tight lg:text-5xl">Let's Add A Product</h2>
                </div>
                <img src={image} alt="" className="p-6 h-auto mt-0" />
            </div>
            <form onSubmit={handleAddService} noValidate="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                <div>
                    <label htmlFor="categoryId" className="text-sm font-semibold">Product ID</label>
                    <select name="categoryId" className="select select-bordered w-full">
                        {
                            categories.map((categoryId) => <option
                                key={categoryId._id}
                                value={categoryId._id}
                            >{categoryId.name}</option>)
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="model_name" className="text-sm font-semibold">Model name</label>
                    <input id="model_name" type="text" className="w-full p-3 rounded font-semibold text-slate-900 dark:bg-gray-50" required  />
                </div>
                <div>
                    <label htmlFor="product_img" className="text-sm font-semibold">Product img URL</label>
                    <input id="product_img" type="text" className="w-full p-3 rounded font-semibold text-slate-900 dark:bg-gray-50" required  />
                </div>
                <div>
                    <label htmlFor="seller_name" className="text-sm font-semibold">Your Name</label>
                    <input id="seller_name" type="text" placeholder="" className="w-full p-3 rounded font-semibold text-slate-900 dark:bg-gray-50" required  />
                </div>
                <div>
                    <label htmlFor="location" className="text-sm font-semibold">Your Location</label>
                    <input id="location" type="text" placeholder="" className="w-full p-3 rounded font-semibold text-slate-900 dark:bg-gray-50" required  />
                </div>
                <div>
                    <label htmlFor="original_price" className="text-sm font-semibold">Original Price</label>
                    <input id="original_price" type="text" className="w-full p-3 rounded font-semibold text-slate-900 dark:bg-gray-50" required  />
                </div>
                <div>
                    <label htmlFor="resale_price" className="text-sm font-semibold">Resale Price</label>
                    <input id="resale_price" type="text" className="w-full p-3 rounded font-semibold text-slate-900 dark:bg-gray-50" required  />
                </div>
                <div>
                    <label htmlFor="year_used" className="text-sm font-semibold">Year Used</label>
                    <input id="year_used" type="text" className="w-full p-3 rounded font-semibold text-slate-900 dark:bg-gray-50" required  />
                </div>               
               <button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded dark:bg-gray-700 dark:text-gray-200">Post a product</button>
                    
            </form>
        </div>
    );
};

export default AddProducts;