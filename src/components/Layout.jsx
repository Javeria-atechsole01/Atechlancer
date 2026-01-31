import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    const { pathname } = useLocation();
    console.log("Layout Rendering, Path:", pathname);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="layout">
            <Navbar />
            <main className="layout-main">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
