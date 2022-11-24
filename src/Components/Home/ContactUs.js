import React from 'react';
import contact from '../../assets/contact-us.png';

const ContactUs = () => {
    return (
        <section className="p-6 dark:text-gray-100" style={{background: `url(${contact})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
            <form  className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md ng-untouched ng-pristine ng-valid">
                <h2 className="w-full text-4xl font-bold leading-tight text-center text-sky-900 ">Contact us</h2>
                <h2 className="w-full text-2xl  leading-tight text-center text-gray-800">Stay connected with us</h2>
                
                <div>
                    <input id="email" type="email" placeholder="Your email" required="" className="block w-full p-2 text-gray-800 text-md font-medium rounded focus:outline-none focus:ring focus:ring-opacity-60 focus:ring-primary dark:bg-base" />
                </div>
                <div>
                    <input id="name" type="text" placeholder="Subject" required="" className="block w-full p-2 text-gray-800 text-md font-medium rounded focus:outline-none focus:ring focus:ring-opacity-60 focus:ring-primary dark:bg-base" />
                </div>
                <div>
                    <textarea id="message" type="text" placeholder="Message..." className="block w-full p-2 text-gray-800 text-md font-medium rounded autoexpand focus:outline-none focus:ring focus:ring-opacity-60 focus:ring-primary dark:bg-base"></textarea>
                </div>
                <div className='flex justify-center'>
                    <button className='btn btn-secondary w-full text-white'>Submit</button>
                </div>
            </form>
        </section>
    );
};

export default ContactUs;