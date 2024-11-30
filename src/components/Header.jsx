import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const checkIfLoggedIn = () => localStorage.getItem("authToken") !== null;
    const [isLoggedIn, setIsLoggedIn] = useState(checkIfLoggedIn);

    useEffect(() => {
        const checkLoggedIn = () => localStorage.getItem("authToken") !== null;
        setIsLoggedIn(checkLoggedIn());
    }, [localStorage.getItem("authToken")]);

    const handleLoginClick = () => {
        if (isLoggedIn) {
            navigate("/profile");
        } else {
            navigate("/login");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        navigate("/");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery) {
            navigate(`/search?query=${searchQuery}`);
            setSearchQuery("");
            setIsSearchVisible(false);
        }
    };

    return (
        <header className="bg-white font-fuzzy sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="text-2xl font-bold">
                    <Link to="/" className="text-[#FF6F00] hover:text-[#451F55] transition duration-300">
                        Sandra's
                    </Link>
                </div>

                <ul className="hidden md:flex space-x-6 font-semibold items-center">
                    <li className="flex items-center">
                        <Link to="/cart" className="text-[#5C415D] hover:text-[#FF6F00] transition duration-300">
                            <img width="24" height="24"
                                 src="https://img.icons8.com/fluency-systems-regular/50/shopping-bag--v1.png"
                                 alt="shopping-bag--v1"/>
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <button
                            onClick={handleLoginClick}
                            className="text-[#5C415D] hover:text-[#FF6F00] transition duration-300"
                        >
                            <img width="25" height="25" src="https://img.icons8.com/windows/32/gender-neutral-user.png"
                                 alt="gender-neutral-user"/>
                        </button>
                    </li>
                    <li className="flex items-center">
                        <button
                            onClick={() => setIsSearchVisible(!isSearchVisible)}
                            className="text-[#5C415D] hover:text-[#FF6F00] transition duration-300"
                        >
                            <img width="25" height="25"
                                 src="https://img.icons8.com/fluency-systems-regular/50/search--v1.png"
                                 alt="search--v1"/>
                        </button>
                        {isSearchVisible && (
                            <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded-md shadow-lg p-4 w-full md:w-64 z-10">
                                <form onSubmit={handleSearch} className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-[#FF6F00] text-white rounded-md p-2 hover:bg-[#451F55] transition duration-300"
                                    >
                                        Search
                                    </button>
                                </form>
                                <button
                                    onClick={() => setIsSearchVisible(false)}
                                    className="mt-2 text-red-500 hover:text-red-700"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </li>
                    {isLoggedIn && (
                        <li className="flex items-center">
                            <button onClick={handleLogout}
                                    className="text-[#5C415D] hover:text-[#FF6F 00] transition duration-300"
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>

                <div className="md:hidden flex items-center space-x-4">
                    <button
                        onClick={handleLoginClick}
                        className="text-[#5C415D] hover:text-[#FF6F00] transition duration-300"
                    >
                        <img width="26" height="26" src="https://img.icons8.com/windows/32/gender-neutral-user.png"
                             alt="gender-neutral-user"/>
                    </button>
                    <Link to="/cart" className="text-[#5C415D] hover:text-[#FF6F00] transition duration-300">
                        <img width="24" height="24"
                             src="https://img.icons8.com/fluency-systems-regular/50/shopping-bag--v1.png"
                             alt="shopping-bag--v1"/>
                    </Link>
                    <button
                        onClick={() => setIsSearchVisible(!isSearchVisible)}
                        className="text-[#5C415D] hover:text-[#FF6F00] transition duration-300"
                    >
                        <img width="25" height="25"
                             src="https://img.icons8.com/fluency-systems-regular/50/search--v1.png"
                             alt="search--v1"/>
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-[#5C415D] hover:text-[#5C415D] focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <img width="24" height="24" src="https://img.icons8.com/fluency-systems-regular/50/menu--v1.png"
                             alt="menu--v1"/>
                    </button>
                </div>
            </nav>

            {isSearchVisible && (
                <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded-md shadow-lg p-4 w-full z-10">
                    <form onSubmit={handleSearch} className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        <button
                            type="submit"
                            className="ml-2 bg-[#FF6F00] text-white rounded-md p-2 hover:bg-[#451F55] transition duration-300"
                        >
                            Search
                        </button>
                    </form>
                    <button
                        onClick={() => setIsSearchVisible(false)}
                        className="mt-2 text-red-500 hover:text-red-700"
                    >
                        Close
                    </button>
                </div>
            )}

            {isMenuOpen && (
                <ul className="md:hidden bg-white px-4 pb-4 space-y-3 font-semibold">
                    <li>
                        <Link
                            to="/"
                            className="block text-[#5C415D] hover:text-[#FF6F00] transition duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/cart"
                            className="block text-[#5C415D] hover:text-[#FF6F00] transition duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Cart
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                handleLoginClick();
                            }}
                            className="block text-[#5C415D] hover:text-[#FF6F00] transition duration-300"
                        >
                            {isLoggedIn ? "Profile" : "Login"}
                        </button>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    handleLogout();
                                }}
                                className="block text-[#5C415D] hover:text-[#FF6F00] transition duration-300"
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            )}
        </header>
    );
};

export default Header;