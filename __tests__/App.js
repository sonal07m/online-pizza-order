import React from 'react';
import {shallow, mount} from 'enzyme';
import App from "../src/App";
import Header from '../src/Components/Header/Header.js';
import Menu from '../src/Components/Menu/Menu';
import Footer from '../src/Components/Footer/Footer';
import CartDialog from '../src/Components/CartDialog/CartDialog';

describe('App component', () => {
    let component;
    it('should contain Header elements', () => {
        component = shallow(<App/>);
        const header = component.find(Header);
        expect(header).toHaveLength(1);
    });
    it('should contain Menu elements', () => {
        component = shallow(<App/>);
        const header = component.find(Menu);
        expect(header).toHaveLength(1);
    });
    it('should contain CartDialog elements', () => {
        component = shallow(<App/>);
        const header = component.find(CartDialog);
        expect(header).toHaveLength(1);
    });
    it('should contain Footer elements', () => {
        component = shallow(<App/>);
        const header = component.find(Footer);
        expect(header).toHaveLength(1);
    });
});
