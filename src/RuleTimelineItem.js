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

	/**
	 * @param {!Event} event
	 * @protected
	 */
	changeConditionList(event) {
		
		let list,
			element,
			type;

		list = event.delegateTarget;
		element = this.elementFields[list.selectedIndex - 1];		
		type = element.type;

		if(type === 'text' || type === 'date') {			
			this.conditions = this.conditionsText;
		}else if(type === 'list'){
			this.conditions = this.conditionsLists;
		}		

		this.currentElementId = element.id;
	}

	/**
	 * @param {!Event} event
	 * @protected
	 */
	selectConditionItem_(event) {

		let list,			
			i = 0,
			maxElements = 0,
			index = 0;

		list = event.delegateTarget;		
		rule = this.conditions[list.selectedIndex - 1].rule;

		let otherElements = function(element) {			
			return element.id != this;
		}

		if(rule === 'equalto' || rule === 'notequalto') {
			
			this.showSecondList = true;
			this.showTextInput = false;

			this.copyElementFields = this.elementFields.filter(otherElements, this.currentElementId); 
			this.copyElementFields = this.copyElementFields;
		
		} else if(rule === 'contain' || rule === 'doesnotcontain' || rule === 'startwith' ||
			rule === 'doesnotstartwith' || rule === 'endwith' || rule === 'doesnotendwith') {

			this.showSecondList = false;
			this.showTextInput = true;

		} else {
			this.showSecondList = false;
			this.showTextInput = false;
		}
	}	
}

Soy.register(RuleTimelineItem, templates);

RuleTimelineItem.STATE = {
	currentElementId: {
		value: ''
	},
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
	copyElementFields: {
		value: []
	},
	/**
	 * @type {boolean}
	 */
	showSecondList: {		
		value: false
	},
	/**
	 * @type {boolean}
	 */
	showTextInput: {		
		value: false
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