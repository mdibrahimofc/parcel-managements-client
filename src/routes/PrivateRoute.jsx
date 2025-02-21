import PropTypes from 'prop-types'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useUserRole from '@/hooks/useUserRole'

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth()
  const location = useLocation()
  const {userRole, isLoading} = useUserRole()
  console.log(userRole);

  if (loading || isLoading) return <LoadingSpinner />

  if(role === "common" && user){
    return children
  }
  if(role === userRole && user){
    return children
  }

  return <Navigate to='/login' state={{ from: "/" }} replace='true' />
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
}

export default PrivateRoute
