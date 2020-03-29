import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers-stateFul/BurgerBuilder/BurgerBuilder';
import Checkout from './containers-stateFul/Checkout/Checkout';
import Orders from './containers-stateFul/Orders/Orders';
import Auth from './containers-stateFul/Auth/Auth';

class App extends Component {

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
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );}
}

export default App;
