import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Profile from './../../../client/components/account/Profile';

describe('A suite',function(){
	it("contains spec with expectations",function(){
		expect(shallow(<Profile/>).contains(<div id="child"/ >)).to.equal(true);
	});
});