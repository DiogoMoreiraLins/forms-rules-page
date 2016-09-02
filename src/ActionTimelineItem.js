'use strict';

import core from 'metal';
import templates from './ActionTimelineItem.soy';
import Component from 'metal-component';
import dom from 'metal-dom';
import { EventHandler } from 'metal-events';
import Soy from 'metal-soy';

class ActionTimelineItem extends Component {
	
	created() {}
	
	rendered() {
		this.eventHandler_ = new EventHandler();		
		this.eventHandler_.add(dom.on(this.element.querySelector('.fields-form'), 'focus', this.handleInputFocus_.bind(this)));
		this.eventHandler_.add(dom.on(this.element.querySelector('.fields-form'), 'focusout', this.handleInputFocus_.bind(this)));
		this.eventHandler_.add(dom.on(this.element.querySelector('.list-elements'), 'mouseover', this.handleListMouseEvent_.bind(this)));		
		this.eventHandler_.add(dom.on(this.element.querySelector('.list-elements'), 'mouseout', this.handleListMouseEvent_.bind(this)));		
	}
	
	attached() {
		this.copyElements = this.copyElements.map(function (element, index){
			element.index = index;
			return element;
		});

		this.copyElements = this.copyElements;
	}

	detached() {}

	disposed() {}

	/**
	 * Handles list mouse event (over | out)
	 * @param {!Event} event
	 */
	handleListMouseEvent_(event){		
		if(event.type === 'mouseover') {
			this.canHideList = false;
		}
		else if (event.type === 'mouseout') {
			this.canHideList = true;
		}
	}

	/**
	 * Handles input focus to show or don't show the list of fields.
	 * @param {!Event} event
	 */
	handleInputFocus_(event) {		
		if(event.type === 'focus') {
			this.showListItens = true;
		}else if (event.type === 'focusout' && this.canHideList) {
			this.showListItens = false;
		}	
	}

	/**
	 * Filter the list of fields through the input text value
	 * @param {!Event} event
	 * @protected
	 */
	filterSearch_(event){

		let searchTerm = '',
			listElements,
			elements,
			i = 0,
			maxElements = 0,
			child,
			text;

		searchTerm = event.delegateTarget.value;

		elements = this.element.querySelector('.list-elements').querySelectorAll('li');
		
		for(i = 0, maxElements = elements.length; i < maxElements; i += 1) {

			child = elements[i];
			text = child.innerText.toLowerCase();

			if(text.includes(searchTerm.toLowerCase())) {
				child.style.display = 'block';
			}else{
				child.style.display = 'none';
			}
		}
	}

	normalizeBadgeList(){
		let listElements,
			elements,
			child;

		listElements = this.element.querySelector('.list-elements');
		elements = listElements.querySelectorAll('li');		
		
		for(i = 0; i < elements.length; i += 1) {
			child = elements[i];
			child.style.display = 'block';		
		}
	}

	/**
	 * Hide the list of fields and add a field in badge format	
	 * @param {!Event} event
	 * @protected
	 */
	itemListClick_(event) {
		this.normalizeBadgeList();
		this.showListItens = false;

		let elementDOM,
			index;			

		elementDOM = event.delegateTarget;
		index = elementDOM.getAttribute('data-index');
		
		this.element.querySelector('.fields-form').value = '';

		this.action.elementBadges.push(this.copyElements[index]);			
		this.action = this.action;		

		let object = {};
		object.listIndex = parseInt(index);
		object.actionIndex = this.actionIndex;
		object.elementBadges = this.action.elementBadges;
			
		this.emit('badgeSelected', object);		
	}

	selectFieldElement_(event) {
		// let list,
		// 	element,
		// 	type;

		// list = event.delegateTarget;
		// element = this.copyElements[list.selectedIndex - 1];

		// element.selected = true;
			
		// this.emit('elementSelected', element);		
	}

	/**
	 * Remove a badge field from array
	 * @param {!Event} event
	 * @protected
	 */
	removeBadgeList_(event) {

		let elementDOM,	
			badge,
			filter;

		elementDOM = event.delegateTarget;
		index = elementDOM.getAttribute('data-index');

		badge = this.action.elementBadges[index];	
		this.emit('badgeRemoved', badge);

		this.action.elementBadges.splice(index, 1);	
		this.action = this.action;
	}
}

ActionTimelineItem.STATE = {
	actionIndex: {

	},
	action: {
		value: []
	},
	/**
	 * @type {Array}
	 * @default []
	 */	
	showListItens: {		
		value: false
	},
	/**
	 * @type {boolean}
	 */
	canHideList: {		
		value: true
	},
};

Soy.register(ActionTimelineItem, templates);

export default ActionTimelineItem;