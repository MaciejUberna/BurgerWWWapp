import React, {Component} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers-stateFul/BurgerBuilder/BurgerBuilder';
import Logout from './containers-stateFul/Auth/Logout/Logout';

const AsyncCheckout = asyncComponent(() => {
  return import('./containers-stateFul/Checkout/Checkout');
});

const AsyncOrders = asyncComponent(() => {
  return import('./containers-stateFul/Orders/Orders');
});

const AsyncAuth = asyncComponent(() => {
  return import('./containers-stateFul/Auth/Auth');
});

// SPA Authentication in general: https://stormpath.com/blog/token-auth-spa
// Firebase authentication REST API: https://firebase.google.com/docs/reference/rest/auth/ 

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={AsyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={AsyncCheckout} />
          <Route path="/orders" component={AsyncOrders} />
          <Route path="/auth" component={AsyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
    );
  };
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
