import React from 'react';
//There a 2 other methods than shallow we should use shallow as often as posible thoe.
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../coponents-stateLess/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />',() => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} price={4} onIngredientAdded={() => {}} onIngredientRemoved={() => {}}/>)
    });

    it('should render <BuildControls/> when recieving ingredients',() => {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});

