import React from 'react';
import { shallow } from './enzyme';
import PropTypes from 'prop-types'
import { expect } from 'chai';
import App from './App';
import config from './config'
import testUsers from '../test/test'
require('jest-localstorage-mock');

describe('Only valid user can view map', () => {
  it('renders App', () => {
    const wrapper = shallow(<App/>);
    wrapper.setState({"user": testUsers.userInValid})
    // console.log(wrapper.debug())
    
    expect(wrapper.find('#logOut')).to.have.lengthOf(1);

  });
});
