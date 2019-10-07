/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux'
import * as actions from './store/actions/index'


const Checkout = React.lazy(()=> {
  return import('./containers/Checkout/Checkout')
})
const Orders = React.lazy( () => {
  return import('./containers/Orders/Orders')
});
const Auth = React.lazy( () => {
  return import ('./containers/Auth/Auth')
})

const app = props =>  {

  useEffect(()=>{
    props.onTryAutoSignup();
  }, [props]);

    let routes = (
      <Switch>
          <Route path="/auth" render ={ ()=> <Auth {...props}/>} />
          <Route path = "/" component = {BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
    )

    if (props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/checkout" component={(props)=> <Checkout {...props}/>} />
          <Route path="/orders" component={(props)=> <Orders {...props}/>} />
          <Route path="/logout" component={Logout} />
          <Route path = "/auth" component={(props)=> <Auth {...props}/>}/>
          <Route path = "/" exact component = {BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
  
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch (actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
