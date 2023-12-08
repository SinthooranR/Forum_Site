import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          Forum Site
        </Link>

        <div className="space-x-4">
          <Link href="/threads" className="text-white">
            My Threads
          </Link>
          <Link href="/comments" className="text-white">
            My Comments
          </Link>
          <Link href="/account/login" className="text-white">
            Login/Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
