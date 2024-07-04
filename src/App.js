import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // For React Query
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import Home from './Pages/Home'
import Addtodo from './Pages/Addtodo';
import Todolist from './Pages/Todolist';
import Edit from './Pages/Edit';



const App = () => {

    const dispatch = useDispatch();

    // Create Query Client For React Query
    const queryClient = new QueryClient()

    const my_routing = [
        {
            path: '/',
            component: <Home />
        },
        {
            path: '/addtodo',
            component: <Addtodo />
        },
        {
            path: '/todolist',
            component: <Todolist />
        },
        {
            path: '/edit/:id',
            component: <Edit />
        },
    ]





    return (
        <>
            <ToastContainer />

            {/*Cover with QueryClientProvider*/}
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>

                        {/*Area Of Routing*/}
                        {my_routing?.map((routing) => {
                            return (
                                <>
                                    <Route path={routing?.path} element={routing?.component} />
                                </>
                            )
                        })}

                    </Routes>
                </Router>
            </QueryClientProvider>
        </>
    )
}

export default App
