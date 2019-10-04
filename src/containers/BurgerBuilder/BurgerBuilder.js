import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'


export class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount () {
        this.props.onInitIngredients()
    }
  
    
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum,el)=> {
            return sum + el;
        },0)
        return sum > 0
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated){
            this.setState({
                purchasing: true
            })
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth')
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinuedHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout')
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients Can't Be Loaded  </p> : <Spinner /> ;

       if (this.props.ings ) {
        burger = 
            (<Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                isAuth={this.props.isAuthenticated}
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled = {disabledInfo}
                    price = {this.props.price}
                    purchaseable= {this.updatePurchaseState(this.props.ings)}
                    ordered = {this.purchaseHandler}
                />
            </Aux>)

            orderSummary = 
            <OrderSummary 
                price={this.props.price}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinuedHandler}
                ingredients={this.props.ings}/>
       } 
    //    if (this.state.loading){
    //     orderSummary = <Spinner />
    //  }
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                    { orderSummary }
                </Modal>
                {burger}
                {/* {this.state.error} */}
            </Aux>
        );
    }
}

const mapStateToProps = state =>  {
    return {
        ings: state.burgerBuilder.ingredients, 
        price: state.burgerBuilder.totalPrice, 
        error: state.burgerBuilder.error, 
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch (
            actions.addIngredient(ingName)
        ),
        onIngredientRemoved: (ingName) => dispatch (
            actions.removeIngredient(ingName)
        ),
        onInitIngredients: () => dispatch(actions.initIngredients()
        ), 
        onInitPurchase: () => dispatch(actions.purchaseInit()), 
        onSetAuthRedirectPath: (path) => {dispatch(actions.setAuthRedirectPath(path))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));