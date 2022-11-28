import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import NavBar from '../Components/Shared/NavBar/NavBar';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';


const DashBoardLayOut = () => {
    
    const {user} = useContext(AuthContext);
    const [isADmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)

    
    return (
        <div>
            <NavBar/>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                
                <div className="drawer-side ">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                      
                        <li className='font-semibold text-gray-900'><Link to='/dashboard'>My Bookings</Link></li>   
                       
                        {
                            isSeller && <>
                                <li className='font-semibold text-gray-900'><Link to='/dashboard/MyProducts'>My Products</Link></li>
                                <li className='font-semibold text-gray-900'><Link to='/dashboard/addproducts'>Add A Product</Link></li>
                            </>
                        }

                        {/* Admin section */}
                       {
                            isADmin && <>
                                <li className='font-semibold text-gray-900'><Link to='/dashboard/allsellrs'>All Sellers</Link></li>
                                <li className='font-semibold text-gray-900'><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
                            </>
                       }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayOut;
