import { IoIosListBox } from "react-icons/io"
import MenuItem from "./MenuItem"

const CustomerMenu = () => {


  return (
    <>
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
    </>
  )
}

export default CustomerMenu
