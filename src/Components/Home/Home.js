import React from 'react';
import banner from '../../assets/banner.png';

const Home = () => {
    return (
        <div className='hero grid justify-center -mt-24'>
            <img className='w-11/12' src={banner} alt="" />
        </div>
    );
};

export default Home;