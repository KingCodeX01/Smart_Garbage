"use client";
import React, {ReactNode, useState} from 'react';
import Navbar from "@/components/admin/navbar";
import Sidebar from "@/components/admin/sidebar";
import Login from "@/components/admin/login/login";

interface Props {
    children: ReactNode;
}

const Layout = ({children}: Props) => {
    return (
        <div className='flex flex-col'>
            {children}
        </div>
    );
};

export default Layout;