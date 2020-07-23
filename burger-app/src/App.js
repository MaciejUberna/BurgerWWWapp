import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers-stateFul/BurgerBuilder/BurgerBuilder';
import Logout from './containers-stateFul/Auth/Logout/Logout';

const Checkout = React.lazy(() => {
  return import('./containers-stateFul/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers-stateFul/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers-stateFul/Auth/Auth');
});

// SPA Authentication in general: https://stormpath.com/blog/token-auth-spa
// Firebase authentication REST API: https://firebase.google.com/docs/reference/rest/auth/ 

const App = props => {

  useEffect(() => {
    props.onTryAutoSignup();
  },[props]);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props}/>} />
      <Route path='/google' component={
        () => { 
        window.location.href = 'https://www.google.pl'; 
        return null;
        }
      }/>
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if(props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props}/>} />
        <Route path="/orders" render={(props) => <Orders {...props}/>} />
        <Route path="/auth" render={(props) => <Auth {...props}/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Layout>
      <Suspense fallback={<p>Loading ...</p>}>{routes}</Suspense>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
