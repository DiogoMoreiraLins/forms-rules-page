'use strict';

import templates from './RuleTimelineItem.soy';
import Component from 'metal-component';
import Soy from 'metal-soy';

class RuleTimelineItem extends Component {
	
	created() {}
	
	rendered() {}
	
	attached() {}

	detached() {}

	disposed() {}

	changeConditionList(event) {
		
		let list = event.delegateTarget;
		let option = list.options[list.selectedIndex];
		let value = option.value;
		let text = option.text;

		console.log(this.elementFields[list.selectedIndex - 1]);

		console.log(value + " " + text);
	}

}

Soy.register(RuleTimelineItem, templates);

RuleTimelineItem.STATE = {
	/**
	 * @type {Array}
	 * @default []
	 */	
	elementFields: {
		value: []
	},
	/**
	 * @type {Array}
	 * @default []
	 */	
	conditions: {	
		value: []	
	},
	/**
	 * @type {Array}
	 */	
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
	/**
	 * @type {Array}	 
	 */	
	conditionsLists: {
		value: [
			{name: 'Equal to', rule: 'equalto'},
			{name: 'Is not equal to', rule: 'notequalto'},
			{name: 'Is empty', rule: 'isempty'},
			{name: 'Is filled out', rule: 'isfilledout'}
		]
	}
};

export default RuleTimelineItem;