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
                
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
                    <ul className="menu p-4 w-80 text-base-content">
                      
                        <li><Link to='/dashboard'>My Bookings</Link></li>   
                       
                        {
                            isSeller && <>
                                <li><Link to='/dashboard/MyProducts'>My Products</Link></li>
                                <li><Link to='/dashboard/addproducts'>Add A Product</Link></li>
                            </>
                        }

                        {/* Admin section */}
                       {
                            isADmin && <>
                                <li><Link to='/dashboard/allsellrs'>All Sellers</Link></li>
                                <li><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
                            </>
                       }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayOut;
