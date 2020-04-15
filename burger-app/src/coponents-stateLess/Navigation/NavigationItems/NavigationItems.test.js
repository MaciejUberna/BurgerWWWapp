import React from 'react';
//There a 2 other methods than shallow we should use shallow as often as posible thoe.
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

//Dont have to import that describe, it and beforeEach, expect. It will be run automatically.
describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
    })

    it('should render two <NavigationItem /> elements if not authenticated.',() => {
        
        //Expect defines the thing we want to check, we apply non jsx elements in expect!
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if is authenticated.',() => {
        // wrapper = shallow(<NavigationItems isAuthenticated/>);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
});