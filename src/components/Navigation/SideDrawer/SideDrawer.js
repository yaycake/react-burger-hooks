import React from 'react'
import styles from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux/Aux'
import NavigationItems from '../NavigationItems/NavigationItems'

const sideDrawer = ( props ) => {

    let attachedClasses = [styles.SideDrawer, styles.Close];

    if (props.open) {
        attachedClasses=[styles.SideDrawer, styles.Open]
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={styles.Logo}><Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>

            </div>
        </Aux>
    );

}

export default sideDrawer;