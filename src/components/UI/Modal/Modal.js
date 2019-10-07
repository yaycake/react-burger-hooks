import React, {useEffect} from 'react';
import styles from './Modal.module.css'
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop'
/* eslint-disable react-hooks/rules-of-hooks */

const modal = props => {

    // shouldComponentUpdate ( nextProps, nextState ) {
    //     return (nextProps.show !== this.props.show ) || (nextProps.children !== this.props.children)
    // };



        return (
            <Aux>
                <Backdrop show={props.show} clicked={props.modalClosed}/>
                <div className={styles.Modal}
                style = {{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)', 
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
                </div>
            </Aux>
        )
}
    

export default React.memo(modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children );