import { createBrowserRouter } from 'react-router-dom'
import Index from '../layout/Index'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import HomePage from '../pages/HomePage'
import ChatPage from '../pages/ChatPage'
import TasksGeneralPage from '../pages/TasksGeneralPage'

export const router = createBrowserRouter([
    { 
        path: '/',
        element: <Index/>,
        children: [
            {
                path: '/',
                element: <LoginPage/>
            },
            {
                path: '/register',
                element: <RegisterPage/>
            },
            {
                path: '/home',
                element: <HomePage/>,
                
            },
            {
                path: '/general',
                element: <TasksGeneralPage/>
            },
        ]
    },
    {
        path: 'chat',
        element: <ChatPage/>
    },
    // {
    //     path: '*',
    //     element: <Navigate to={'/'}/>
    // }
])