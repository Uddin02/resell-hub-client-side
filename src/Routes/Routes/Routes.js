import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import About from '../../Components/About/About';
import CategoryProducts from '../../Components/Home/CategoryProducts/CategoryProducts';
import Home from '../../Components/Home/Home';
import Login from '../../Components/Login/Login/Login';
import SignUp from '../../Components/Login/SignUp/SignUp';
import NotFound from '../../Components/Shared/NotFound/NotFound';
import Main from '../../Layout/Main';

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
                path: '/about',
                element: <About/>
            },
            {
                path: '/categoryproducts/:id',
                element: <CategoryProducts/>,
                loader: ({params})=>fetch(`http://localhost:5000/categoryproducts/${params.id}`)
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
    }
])

export default router;