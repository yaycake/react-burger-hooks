import React, { useState } from 'react';
import Aux from '../Aux/Aux';
import styles from './Layout.module.css'
import { connect } from 'react-redux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Layout = props => {

   const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false)
    }

    // const sideDrawerOpenHandler = () =>{
    //     setSideDrawerIsVisible(true)
    // }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible)
    }

        return (
            <Aux>
                <Toolbar 
                    isAuth = {props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler}
                
                closeSideDrawer={sideDrawerClosedHandler}></Toolbar>
                <SideDrawer 
                    isAuth = {props.isAuthenticated}
                    open={sideDrawerIsVisible}
                    closed = {sideDrawerClosedHandler}/>
                <div>Toolbar, SideDrawer, Backdrop </div>
                <main className={styles.Content}>
                    { props.children}
                </main>
            </Aux>
        )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);