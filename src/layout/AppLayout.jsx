import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
    return (
        <div className='bg-gradient-to-br from-background to-muted'>
            <Header />
            <main className='min-h-screen container mx-auto px-4 py-8'>
                <Outlet />
            </main>
            <footer className="border-t backdrop-blur supports-[backdrop-filter]:bg-background/60 py-12">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>© 2024 Micah Mustaham. All rights reserved.</p>
                    <p>🧑‍💻 Software Developer | Educator</p>
                </div>
            </footer>
        </div >
    )
}

export default AppLayout