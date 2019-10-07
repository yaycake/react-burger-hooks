import React, { useState, useEffect, useCallback } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import { connect, useDispatch, useSelector } from 'react-redux'

const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false)

    
    const ings =  useSelector( state => state.burgerBuilder.ingredients )
    const price = useSelector (state =>state.burgerBuilder.totalPrice)
    const error = useSelector(state => state.burgerBuilder.error)
    const isAuthenticated = useSelector(state=> state.burgerBuilder.token !== null)


    const dispatch = useDispatch();
    const onIngredientAdded= (ingName) => dispatch(
        actions.addIngredient(ingName)
    )
    const onIngredientRemoved = (ingName) => dispatch(
        actions.removeIngredient(ingName)
    );
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);

    const onInitPurchase = () => dispatch(actions.purchaseInit()) 
    const onSetAuthRedirectPath = (path) => {dispatch(actions.setAuthRedirectPath(path))}

    useEffect(()=>{
        onInitIngredients()
    },[onInitIngredients])
  
    const updatePurchaseState = (ingredients) =>{
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum,el)=> {
            return sum + el;
        },0)
        return sum > 0
    }

    const purchaseHandler = () => {
        if (isAuthenticated){
            setPurchasing(true)
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth')
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinuedHandler = () => {
        onInitPurchase();
        props.history.push('/checkout')
    }

        const disabledInfo = {
            ...ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = error ? <p>Ingredients Can't Be Loaded  </p> : <Spinner /> ;

       if (props.ings ) {
        burger = 
            (<Aux>
                <Burger ingredients={ings}/>
                <BuildControls 
                isAuth={isAuthenticated}
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled = {disabledInfo}
                    price = {price}
                    purchaseable= {updatePurchaseState(ings)}
                    ordered = {purchaseHandler}
                />
            </Aux>)

            orderSummary = 
            <OrderSummary 
                price={price}
                purchaseCanceled={purchaseCancelHandler}
                purchaseContinued={purchaseContinuedHandler}
                ingredients={ings}/>
       } 
    //    if (this.state.loading){
    //     orderSummary = <Spinner />
    //  }
        return (
            <Aux>
                <Modal show={purchasing}
                modalClosed={purchaseCancelHandler}>
                    { orderSummary }
                </Modal>
                {burger}
                {/* {this.state.error} */}
            </Aux>
        );
}


export default withErrorHandler(BurgerBuilder,axios);