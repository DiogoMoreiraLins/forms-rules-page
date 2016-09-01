'use strict';

import templates from './RuleTimelineItem.soy';
import Component from 'metal-component';
import Soy from 'metal-soy';

class RuleTimelineItem extends Component {

	created() {
		this.rule.value = [];
	}

	rendered() {}

	attached() {}

	detached() {}

	disposed() {}

	/**
	 * Set the id and type of element chosen 
	 * @param {!Event} event
	 * @protected
	 */
	selectFieldElement(event) {
		let list,
			element,
			type;

		list = event.delegateTarget;
		element = this.elementFields[list.selectedIndex - 1];

		this.rule.fieldId = element.id;
		this.rule.fieldType = element.type;
		this.rule.value = element.value;
		this.rule = this.rule;
	}

	/**
	 * Select the rule of condition list
	 * @param {!Event} event
	 * @protected
	 */
	selectConditionElement(event) {
		let list,
			currentConditions,
			currentRule;

		list = event.delegateTarget;
		currentConditions = this.conditions[this.rule.fieldType];
		currentRule = currentConditions[list.selectedIndex - 1].rule;

		this.rule.conditionRule = currentRule;
		this.rule.showComparationList = false;
		this.rule.showSecondList = false;
		this.rule.showTextInput = false;
		this.rule.comparationValue = '';

		if (currentRule === 'equalto' || currentRule === 'notequalto') {

			this.rule.showComparationList = true;			

		} else if (currentRule === 'contain' || currentRule === 'doesnotcontain' || currentRule === 'startwith' ||
			currentRule === 'doesnotstartwith' || currentRule === 'endwith' || currentRule === 'doesnotendwith') {
			
			this.rule.showTextInput = true;
		} 

		this.rule = this.rule;
	}

	/**
	 * Select comparation value 
	 * @param {!Event} event
	 * @protected
	 */
	selectComparationElement(event) {
		let list,
			options,
			value;

		list = event.delegateTarget;
		options = list.options;

		value = options[list.selectedIndex].value;

		this.rule.comparationValue = value;
		this.rule = this.rule;
	}
}

Soy.register(RuleTimelineItem, templates);

RuleTimelineItem.STATE = {
	rule: {},	
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
		value: {
			text: [{
				name: 'Equal to',
				rule: 'equalto'
			}, {
				name: 'Is not equal to',
				rule: 'notequalto'
			}, {
				name: 'Is empty',
				rule: 'isempty'
			}, {
				name: 'Is filled out',
				rule: 'isfilledout'
			}, {
				name: 'Contain',
				rule: 'contain'
			}, {
				name: 'Does no contain',
				rule: 'doesnotcontain'
			}, {
				name: 'Start with',
				rule: 'startwith'
			}, {
				name: 'Does not start with',
				rule: 'doesnotstartwith'
			}, {
				name: 'End with',
				rule: 'endwith'
			}, {
				name: 'Does not end with',
				rule: 'doesnotendwith'
			}],
			list: [{
				name: 'Equal to',
				rule: 'equalto'
			}, {
				name: 'Is not equal to',
				rule: 'notequalto'
			}, {
				name: 'Is empty',
				rule: 'isempty'
			}, {
				name: 'Is filled out',
				rule: 'isfilledout'
			}]
		}
	}
};

export default RuleTimelineItem;