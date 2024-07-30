import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Index = () => {
  const{ userAccess } = useContext(UserContext)

  return (
    <div>
    {
      userAccess ? <Outlet/> : (<><Navigation/><Outlet/> </>)
    }  
    </div>
  )
}

export default Index