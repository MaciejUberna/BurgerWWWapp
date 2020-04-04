import React, {Component} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers-stateFul/BurgerBuilder/BurgerBuilder';
import Checkout from './containers-stateFul/Checkout/Checkout';
import Orders from './containers-stateFul/Orders/Orders';
import Auth from './containers-stateFul/Auth/Auth';
import Logout from './containers-stateFul/Auth/Logout/Logout';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  // state = {
  //   show: true
  // };

  // componentDidMount () {
  //   setTimeout(() => {
  //     this.setState({show: false})
  //   },5000);
  // }

  render() {
    return (
    <div>
      <Layout>
        {/* {this.state.show ? <BurgerBuilder/> : null}
        <BurgerBuilder/>
        <Checkout /> // - without rout */}
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
    );
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
}

export default withRouter(connect(null,mapDispatchToProps)(App));
