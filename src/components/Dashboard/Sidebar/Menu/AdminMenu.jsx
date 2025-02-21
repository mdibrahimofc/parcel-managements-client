import MenuItem from "./MenuItem"
import { IoIosListBox } from "react-icons/io";
import { FcBusinessman, FcSettings } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";

const AdminMenu = () => {
  return (
    <>
    <MenuItem
            icon={IoIosStats}
            label='Statistics'
            address='statistics'
          />

    <MenuItem
            icon={IoIosListBox}
            label='All Parcels'
            address='all-parcels'
          />

    <MenuItem
            icon={FcBusinessman}
            label='All Delivery Man'
            address='all-delivery-man'
          />

    <MenuItem
            icon={FaUser}
            label='All Users'
            address='all-users'
          />
    <MenuItem
                icon={FcSettings}
                label="Profile"
                address="/dashboard/profile"
              />
    </>
  )
}

export default AdminMenu
