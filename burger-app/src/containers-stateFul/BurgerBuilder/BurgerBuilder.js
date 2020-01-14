import React, { Component } from "react";
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../coponents-stateLess/Burger/Burger';
import BuildControls from '../../coponents-stateLess/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    // constructor (props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }
    
    render () {
        return (
            <Auxiliary>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;