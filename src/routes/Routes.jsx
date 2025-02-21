import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import Profile from '../pages/Dashboard/Common/Profile'
import MainLayout from '../layouts/MainLayout'
import BookParcel from '@/pages/Dashboard/Client/BookParcel'
import MyParcel from '@/pages/Dashboard/Client/MyParcel'
import UpdateParcel from '@/pages/Dashboard/Client/UpdateParcel'
import AllParcels from '@/pages/Dashboard/Admin/AllParcels'
import AllDeliveryMen from '@/pages/Dashboard/Admin/AllDeliveryMen'
import AllUsers from '@/pages/Dashboard/Admin/AllUsers'
import MyDeliveryList from '@/pages/Dashboard/DeliveryMan/MyDeliveryList'
import MyReviews from '@/pages/Dashboard/DeliveryMan/MyReviews'
import Statistics from '@/pages/Dashboard/Admin/Statistics'
import NotificationPage from '@/pages/Notification/NotificationPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'notification',
        element: <NotificationPage/>,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute role={"common"}>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // client route
      {
        path: 'book-parcel',
        element: (
          <PrivateRoute role={"User"}>
            <BookParcel/>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-parcel',
        element: (
          <PrivateRoute role={"User"}>
            <MyParcel/>
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard/update-parcel/:id',
        element: (
          <PrivateRoute role={"User"}>
            <UpdateParcel/>
          </PrivateRoute>
        ),
      },
      // admin route
      {
        path: 'statistics',
        element: (
          <PrivateRoute role={"common"}>
            <Statistics/>
          </PrivateRoute>
        ),
      },
      {
        path: 'all-parcels',
        element: (
          <PrivateRoute role={"Admin"}>
            <AllParcels/>
          </PrivateRoute>
        ),
      },
      {
        path: "all-delivery-man",
        element: <PrivateRoute role={"Admin"}>
          <AllDeliveryMen/>
        </PrivateRoute>
      },
      {
        path: "all-users",
        element: <PrivateRoute role={"Admin"}>
          <AllUsers/>
        </PrivateRoute>
      },
      // Delivery Man routes 
      {
        path: "my-delivery-list",
        element: <PrivateRoute role={"Delivery Man"}>
          <MyDeliveryList/>
        </PrivateRoute>
      },
      {
        path: "my-reviews",
        element: <PrivateRoute role={"Delivery Man"}>
          <MyReviews/>
        </PrivateRoute>
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute role={"common"}>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
])
