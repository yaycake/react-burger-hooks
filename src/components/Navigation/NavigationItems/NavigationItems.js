import React from 'react';
import styles from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
  
    
    <ul styles={styles.NavigationItems}>
        <NavigationItem
            link="/"
            active={true}
        >Burger Builder </NavigationItem>
        {props.isAuthenticated ? 
            <NavigationItem link="/orders">Orders</NavigationItem> : null
        }
        {!props.isAuthenticated ? 
            <NavigationItem link="/auth">Authenticate</NavigationItem> : 
        <NavigationItem
        link="/logout"
    >Logout</NavigationItem> }
    </ul>

)

export default navigationItems