import React, { useState } from 'react';
import logo from './assets/logo.svg'
import userico from './assets/user.svg'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="bg-white shadow-lg py-2 px-4 md:px-[5vw] flex justify-between items-center border-t-[8px] border-[#0C4DA1] fixed w-full top-0">
            <div className="flex items-center">
                <Link to='/'><img src={logo} alt="Logo" className="md:w-[12vw] w-[30vw]" /></Link>
            </div>
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="flex items-center focus:outline-none rounded-full"
                >
                    <img src={userico} alt="User Icon"/>
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg">
                        <Link
                            to="/"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                            Profile
                        </Link>
                        <Link
                            to="/"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                            Logout
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

