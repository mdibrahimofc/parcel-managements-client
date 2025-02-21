import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import MenuItem from './Menu/MenuItem'

import useAuth from '../../../hooks/useAuth'

import AdminMenu from './Menu/AdminMenu'
import { Link } from 'react-router-dom'
import CustomerMenu from './Menu/CustomerMenu'
import logo from '../../../assets/images/dropshipping.png'
import ClientMenu from './Menu/ClientMenu'
import useUserRole from '@/hooks/useUserRole'

const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)
  const {userRole} = useUserRole()
  console.log(userRole);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between items-center md:hidden shadow-lg">
        <div className="p-4">
          <Link to="/">
            <img
              src="https://i.ibb.co/4ZXzmq5/logo.png"
              alt="logo"
              width="50"
              height="50"
            />
          </Link>
        </div>
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-y-auto bg-gray-100 w-64 h-full space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition duration-200 ease-in-out shadow-lg`}
      >
        <div>
          <div className="hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto">
            <Link to="/">
              <img
                src={logo}
                className="w-20 h-20 rounded-md"
                alt="logo"
                width="100"
                height="100"
              />
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {/* Menu Items */}
              {
                userRole === "Delivery Man" ? <CustomerMenu /> : <></>
              }
              {
                userRole === "User" ? <ClientMenu /> : <></>
              }
              {
                userRole === "Admin" ? <AdminMenu /> : <></>
              }
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div>
          <hr className="border-gray-300 my-2" />
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
