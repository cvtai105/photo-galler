import { Outlet } from "react-router-dom";
import React from 'react';

function Layout(){
    return (
        <>
            <div class="header">
                <h1>Image Gallery</h1>
            </div>
            <Outlet/>
        </>
    )
}

export default Layout;