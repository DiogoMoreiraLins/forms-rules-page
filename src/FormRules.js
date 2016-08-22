'use strict';

import { core, string } from 'metal';
import templates from './FormRules.soy';
import Component from 'metal-component';
import Soy from 'metal-soy';

class FormRules extends Component {

	created() {
		
	}
	
	rendered() {
		
	}
	
	attached() {

	}

	detached() {
		
	}

	disposed() {
		
	}
	
	/**
	 * @param {!Event} event
	 * @protected
	 */
	addRule_(event) {
		this.rules.push({});
		this.rules = this.rules;		
	}

	/**
	 * @param {!Event} event	 
	 * @protected
	 */
	removeRule_(event) {

		let item,
			index = 0;

		if(this.rules.length > 1) {
		 	item = event.delegateTarget;
			index = parseInt(item.getAttribute('data-index'));

		 	this.rules.splice(index, 1);

		 	this.rules = this.rules;		 
		}	
	}

	/**
	 * @param {!Event} event
	 * @protected
	 */
	addAction_(event) {

		if(this.maxActions == 2 && this.actions.length < 2) {
			this.actions.push({});
			this.actions = this.actions;

			if(this.actions.length == 2) {
				this.shownActionButton = false;
				this.shownActionButton = this.shownActionButton;
			}
		}
	}

	/**
	 * @param {!Event} event	 
	 * @protected
	 */
	removeAction_(event) {
		
		let item,
			index = 0;

		if(this.actions.length > 1) {
			item = event.delegateTarget;
			index = parseInt(item.getAttribute('data-index'));

			this.actions.splice(index, 1);

			this.actions = this.actions;

			if(this.actions.length == 1) {
				this.shownActionButton = true;
				this.shownActionButton = this.shownActionButton;	
			}			
		}
	}

	/**
	 * @param {!Event} event
	 * @protected
	 */
	conditionClick_(event) {
		let li = event.delegateTarget;
		
		this.operator = this.getTextItem_(li);
	}

	/**
	 * @param {!Element} itemElement
	 * @protected
	 */
	getTextItem_(itemElement) {
		return this.findItemTextByIndex_(itemElement);		
	}

	/**
	 * @param {!Element} element
	 * @return {number}
	 * @protected
	 */
	findItemTextByIndex_(element) {

		let i = 0,
			items,
			maxItens = 0;

		items = this.element.querySelectorAll('li.operation-item');

		for (i = 0, maxItens = items.length; i < maxItens; i++) {
			if (items.item(i) === element) {				
				return items.item(i).innerText;
			}
		}
	}

}

FormRules.STATE = {
	/**
	 * @type {number}
	 * @default 1
	 */
	maxActions: {
		value: 1		
	},
	/**
	 * @type {boolean}
	 */
	shownActionButton: {		
		value: true
	},
	rules: {
		value: [
			{}
		]
	},
	actions: {
		value: [
			{}
		]
	},
	operator: {
		value: 'or'
	}
};

Soy.register(FormRules, templates);

export default FormRules;