import { FaBox } from "react-icons/fa";
import { BsFillGiftFill } from "react-icons/bs";
import MenuItem from './MenuItem'
import { FcSettings } from "react-icons/fc";
const ClientMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaBox}
        label='Book Parcel'
        address='book-parcel'
      />
      <MenuItem icon={BsFillGiftFill} label='My Parcel' address='my-parcel' />
      <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          />
    </>
  )
}

export default ClientMenu
