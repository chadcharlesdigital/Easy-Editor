import './main.scss'
import Sidebar from './components/Sidebar'

import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()




const root = ReactDOM.createRoot(document.getElementById('easy-editor-sidebar-wrapper'));

root.render(
    <QueryClientProvider client={queryClient}>
        <Sidebar />
    </QueryClientProvider>
)