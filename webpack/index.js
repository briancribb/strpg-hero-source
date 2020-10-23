/*
Two terminal tabs.
1. cd into site folder: jekyll serve
2. cd from Sites like normal: yarn build

When webpack tosses the new JS into the jekyll assets folder, Jekyll picks it up and builds.

Aaaaand... everything in this repo will not be present in the actual repo. I have a set of utilities that I don't want to write a bunch of times. So I'm importing a utils file from somewhere in the depths of my hard drive.
*/
import {tmc_transEnd, tmc_documentHidden, tmc_RAF, tmc_throttle, tmc_debounce} from '../../../_vendor/tmc/tmc-utils';

//import STRPG from './scripts';
//import two from './scripts/two';

let STRPG = (function(){

	let utils = _setupUtils();

	function init() {
		console.log('init()');
		//addListeners();
	}


	function addListeners() {
		manageResize();// Once after page load.
		const tHandler = utils.debounce(250, manageResize);
		window.addEventListener("resize", tHandler);
	}


	// Doing this through a function so we don't ask for this stuff before it exists.
	function _setupUtils() {
		tmc_RAF();// Polyfills the window.requestAnimationFrame object.
		let ut = tmc_documentHidden(); // returns several settings in an object
		ut.trans_end = tmc_transEnd();  // returns the name of the transition end event
		ut.throttle = tmc_throttle;
		ut.debounce = tmc_debounce;
		return ut;
	}

	function manageResize() {
		console.log('manageResize()');
		let footerHeight = $('#main-footer').outerHeight(true);
		$('body').css('padding-bottom', footerHeight+'px');
	}


	return {
		init,
		utils
	}

}());









$(document).ready(function(){
	STRPG.init();
	console.log('STRPG', STRPG);
});
