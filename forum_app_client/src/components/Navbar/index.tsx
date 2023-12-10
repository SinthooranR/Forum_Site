import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/util/auth-context";

const Navbar = () => {
  const { user, logout } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as Element).contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-indigo-500 p-4 fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          Forum Site
        </Link>

        <div className="space-x-4">
          {user && (
            <div className="flex gap-8">
              <Link href="/profile/myThreads" className="text-white">
                My Threads
              </Link>
              <Link href="/profile/myComments" className="text-white">
                My Comments
              </Link>

              <div className="relative text-white" ref={dropdownRef}>
                <button onClick={toggleDropdown} className="">
                  Profile
                </button>
                {dropdownOpen && (
                  <ul className="absolute top-8 bg-white w-32 text-indigo-500 py-2 px-2 mt-2 space-y-2 rounded">
                    <li>
                      <Link href="/profile" className="text-black">
                        View Profile
                      </Link>
                    </li>
                    <li>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          logout();
                          closeDropdown();
                        }}
                      >
                        Logout
                      </div>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          )}

          {!user && (
            <Link href="/account/login" className="text-white">
              Login/Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
