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
	
	addRule() {
		this.rules.push({});
		this.rules = this.rules;		
	}

	addAction() {

		if(this.maxActions == 2 && this.actions.length < 2) {
			this.actions.push({});
			this.actions = this.actions;

			if(this.actions.length == 2) {
				this.shownActionButton = false;
				this.shownActionButton = this.shownActionButton;
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
	}
};

Soy.register(FormRules, templates);

export default FormRules;