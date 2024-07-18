import React from 'react'

import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import MenuBar from '../Components/MenuBar';
import Footer from '../Components/Footer';

export default function Layout() {
    return (
        <div>
            <div className='wrapper'>
                <div className='main-panel'>
                    <MenuBar />
                    <Header />
                    <Outlet className="mt-3"/>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
