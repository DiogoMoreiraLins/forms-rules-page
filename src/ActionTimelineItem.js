'use strict';

import templates from './ActionTimelineItem.soy';
import Component from 'metal-component';
import Soy from 'metal-soy';

class ActionTimelineItem extends Component {
	
	created() {}
	
	rendered() {}
	
	attached() {}

	detached() {}

	disposed() {}

	/**
	 * @param {!Event} event
	 * @protected
	 */
	filterSearch_(event){

		let searchTerm = '',
			listElements,
			elements,
			i = 0,
			maxElements = 0,
			element,
			text;

		searchTerm = event.delegateTarget.value;

		this.showListItens = searchTerm.length >= 1 ? true : false;

		listElements = this.element.querySelector('.list-elements');

		elements = listElements.querySelectorAll('li');
		
		for(i = 0, maxElements = elements.length; i < maxElements; i += 1) {

			element = elements[i];
			text = element.innerText.toLowerCase();

			if(text.includes(searchTerm.toLowerCase())) {
				element.style.display = 'block';
			}else{
				element.style.display = 'none';
			}
		}
	}

	/**
	 * @param {!Event} event
	 * @protected
	 */
	itemListClick_(event) {
		this.showListItens = false;
	}
}

ActionTimelineItem.STATE = {
	/**
	 * @type {Array}
	 * @default []
	 */	
	elementFields: {
		value: []
	},
	/**
	 * @type {boolean}
	 */
	showListItens: {		
		value: false
	},
};

Soy.register(ActionTimelineItem, templates);

export default ActionTimelineItem;