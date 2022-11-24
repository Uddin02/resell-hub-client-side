import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import About from '../../Components/About/About';
import Home from '../../Components/Home/Home';
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
            }
        ]
    }
])

export default router;