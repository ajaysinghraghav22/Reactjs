import React from 'react';
import Header from './components/Header/Header';

import Footer from './components/Footer/Footer';
import {Outlet} from 'react-router-dom';
//if work like base and upper header should be same but only make changes on it content
function Layout(){
    return (
        <>
        <Header />
        <Outlet />
        <Footer />
      
        </>
         /*here the header and footer shout be same but change in only in conntent*/
    )
}
export default Layout;