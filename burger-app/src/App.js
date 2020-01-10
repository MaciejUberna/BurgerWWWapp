import React, {Component} from 'react';
import Layout from './coponents-stateLess/Layout/Layout';
import BurgerBuilder from './containers-stateFul/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
    <div>
      <Layout>
        <BurgerBuilder/>
      </Layout>
    </div>
  );}
}

export default App;
