import { IoIosListBox, IoIosStats } from "react-icons/io"
import MenuItem from "./MenuItem"
import { FcSettings } from "react-icons/fc"

const CustomerMenu = () => {


  return (
    <>
    <MenuItem
                icon={IoIosStats}
                label='Statistics'
                address='statistics'
              />
      <MenuItem
                  icon={IoIosListBox}
                  label='My Delivery List'
                  address='my-delivery-list'
                />
      <MenuItem
                  icon={IoIosListBox}
                  label='My Reviews'
                  address='my-reviews'
                />
      <MenuItem
                  icon={FcSettings}
                  label="Profile"
                  address="/dashboard/profile"
                />
    </>
  )
}

export default CustomerMenu
