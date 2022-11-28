import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Blog from '../../Components/Blog/Blog';
import AddProducts from '../../Components/Dashboard/AddProducts';
import AllBuyers from '../../Components/Dashboard/AllBuyers';
import AllSellers from '../../Components/Dashboard/AllSellers';
import Bookings from '../../Components/Dashboard/Bookings';
import MyProducts from '../../Components/Dashboard/MyProducts';
import Payment from '../../Components/Dashboard/Payment/Payment';
import CategoryProducts from '../../Components/Home/CategoryProducts/CategoryProducts';
import Home from '../../Components/Home/Home';
import Login from '../../Components/Login/Login/Login';
import SignUp from '../../Components/Login/SignUp/SignUp';
import NotFound from '../../Components/Shared/NotFound/NotFound';
import DashBoardLayOut from '../../Layout/DashBoardLayOut';
import Main from '../../Layout/Main';
import AdminRoute from '../AdminRoute/AdminRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import SellerRoute from '../SellerRoute/SellerRoute';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        errorElement: <NotFound/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/blog',
                element: <Blog/>
            },
            {
                path: '/categoryproducts/:id',
                element: <CategoryProducts/>,
                loader: ({params})=>fetch(`https://resell-hub-server.vercel.app/categoryproducts/${params.id}`)
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <SignUp/>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashBoardLayOut/></PrivateRoute>,
        errorElement: <NotFound/>,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoute><Bookings/></PrivateRoute>
            },
            {
                path: '/dashboard/allbuyers',
                element: <PrivateRoute><AdminRoute><AllBuyers/></AdminRoute></PrivateRoute>
            },
            {
                path: '/dashboard/allsellrs',
                element: <PrivateRoute><AdminRoute><AllSellers/></AdminRoute></PrivateRoute>
            },
            {
                path: '/dashboard/MyProducts',
                element: <PrivateRoute><SellerRoute><MyProducts/></SellerRoute></PrivateRoute>
            },
            {
                path: '/dashboard/addproducts',
                element: <PrivateRoute><SellerRoute><AddProducts/></SellerRoute></PrivateRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <PrivateRoute><Payment/></PrivateRoute>,
                loader: ({params}) => fetch(`https://resell-hub-server.vercel.app/bookings/${params.id}`)
            },
            
        ]
    }

])

export default router;

