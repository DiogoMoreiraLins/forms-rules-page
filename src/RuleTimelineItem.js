'use strict';

import templates from './RuleTimelineItem.soy';
import Component from 'metal-component';
import Soy from 'metal-soy';

class RuleTimelineItem extends Component {
	
	created() {
		this.listElements = null;
	}
	
	rendered() {}
	
	attached() {

		this.listElements = this.element.querySelector('.elements-list');

		this.listElements.addEventListener("change", this.changeConditionList);
	}

	detached() {}

	disposed() {}

	changeConditionList(event) {
		
		let list = event.target;
		let option = list.options[list.selectedIndex];
		let value = option.value;
		let text = option.text;

		console.log(event.delegateTarget);

		console.log(value + " " + text);

	}

}

RuleTimelineItem.STATE = {
	conditions: {	
		value: []	
	},
	conditionsText: {
		value: [
			{name: 'Equal to', rule: 'equalto'},
			{name: 'Is not equal to', rule: 'notequalto'},
			{name: 'Is empty', rule: 'isempty'},
			{name: 'Is filled out', rule: 'isfilledout'},
			{name: 'Contain', rule: 'contain'},
			{name: 'Does no contain', rule: 'doesnotcontain'},
			{name: 'Start with', rule: 'startwith'},
			{name: 'Does not start with', rule: 'doesnotstartwith'},
			{name: 'End with', rule: 'endwith'},
			{name: 'Does not end with', rule: 'doesnotendwith'}
		]
	},
	conditionsLists: {
		value: [
			{name: 'Equal to', rule: 'equalto'},
			{name: 'Is not equal to', rule: 'notequalto'},
			{name: 'Is empty', rule: 'isempty'},
			{name: 'Is filled out', rule: 'isfilledout'}
		]
	}
};

Soy.register(RuleTimelineItem, templates);

export default RuleTimelineItem;