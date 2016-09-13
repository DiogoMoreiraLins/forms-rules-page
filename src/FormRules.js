'use strict';

import { core, string } from 'metal';
import Component from 'metal-component';
import Soy from 'metal-soy';

import templates from './FormRules.soy';

class FormRules extends Component {

	created() {
		
		if(this.fixedActions) {
			let i;

			for(i = 0; i < this.maxActions; i += 1) {			
				let action = {};
				action.elementBadges = [];				
				action.name = (i == 0) ? 'Show' : 'Hide';

				this.actions.push(action);	
			}
			this.actions = this.actions;			
		}
		else {	
			let action = {};	
			action.elementBadges = [];			
			this.actions.push(action);	
		}

		this.elements = this.elements.map(function (element){			
			if(element.field.length >= 30) {
				element.field = element.field.slice(0,30) + "..."
			}			
			return element;
		});

		this.copyElements = {};
		this.copyElements = this.elements.slice();
	}
	
	rendered() {}
	
	attached() {}

	detached() {}

	disposed() {}
	
	/**
	 * Add new rule item
	 * @param {!Event} event
	 * @protected
	 */
	addRule_(event) {
		let rule = {};
		this.rules.push(rule);
		this.rules = this.rules;
	}

	/**
	 * Remove a existing rule item	
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
	 * Add new action item
	 * @param {!Event} event
	 * @protected
	 */
	addAction_(event) {
		if(this.actions.length <= this.maxActions) {
			let action = {};
			action.elementBadges = [];
			this.actions.push(action);
			this.actions = this.actions;

			if(this.actions.length == this.maxActions) {
				this.shownActionButton = false;				
			}
		}
	}

	/**
	 * Remove a existing action item	
	 * @param {!Event} event	 
	 * @protected
	 */
	removeAction_(event) {
		
		let item,
			index = 0;

		if(this.actions.length > 1) {
			item = event.delegateTarget;
			index = parseInt(item.getAttribute('data-index'));

			this.currentActionIndex = index;

			this.actions.splice(index, 1);
			this.actions = this.actions;

			if(this.actions.length < this.maxActions) {
				this.shownActionButton = true;				
			}

			this.restoreCopyElements();			
		}
	}

	/**
	 * Changes the condition term for the group of rules
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

	restoreCopyElements() {
		let element,
			list;

		list = this.hashRestoredElements[this.currentActionIndex];gist 

		if(list){
			for(let i = 0; i < list.length; i += 1) {
				element = list[i];
				this.copyElements.splice(element.index, 0, element);
			}
			this.hashRestoredElements[this.currentActionIndex] = [];
			this.copyElements = this.copyElements;
		}
	}

	onBadgeSelected_(object) {		
		this.hashRestoredElements[object.actionIndex] = object.elementBadges;
		
		this.copyElements.splice(object.listIndex, 1);
		this.copyElements = this.copyElements;
	}

	onBadgeRemoved_(target) {		
		this.copyElements.splice(target.index, 0, target);
		this.copyElements = this.copyElements;
	}

}

FormRules.STATE = {
	/**
	 * @type {number}
	 * @default 1
	 */
	maxActions: {	
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
		value: []
	},
	currentActionIndex: {

	},
	hashRestoredElements: {
		value: {}
	},
	copyElements: {
		value: []
	},
	elements: {
		value: []
	},
	operator: {
		value: 'or'
	},
	/**
	 * @type {boolean}
	 */
	fixedActions: {			
	}
};

Soy.register(FormRules, templates);

export default FormRules;