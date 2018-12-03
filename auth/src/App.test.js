import React from 'react';
import { mount, shallow } from './enzyme';
import App from './App';
import { expect } from 'chai';
import ValidLogin from './components/templates/valid-login';
import LandingPage from './components/templates/landing-page';
import InvalidLogin from './components/templates/valid-login';
import enzyme from './enzyme';
require('jest-localstorage-mock');


describe('<App />', () => {
  const wrapper = mount(<App />);

  it('by default renders the Landing Page', () => {
    expect(wrapper.find(LandingPage)).to.have.lengthOf(1);
  });

   it("does not render the 'Valid Login' screen", () => {
      expect(wrapper.find(ValidLogin)).to.have.lengthOf(0);
    });
    
});
