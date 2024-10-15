import { Link, Outlet } from "react-router-dom";
import React from 'react';

function Layout(){
    return (
        <>
            <Link to={"photos"} className="header">
                <h1>Image Gallery</h1>
            </Link>
            <Outlet/>
        </>
    )
}

export default Layout;