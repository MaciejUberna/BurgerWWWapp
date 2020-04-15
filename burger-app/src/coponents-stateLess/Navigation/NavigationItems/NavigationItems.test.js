import React from 'react';
//There a 2 other methods than shallow we should use shallow as often as posible thoe.
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

//Dont have to import that describe, it and expect. It will be run automatically.
describe('<NavigationItems />', () => {
    it('should render two <NavigationItem /> elements if not authenticated.',() => {
        const wrapper = shallow(<NavigationItems/>);
        //Expect defines the thing we want to check, we apply non jsx elements in expect!
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
});