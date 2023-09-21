

let STRPG = (function(){

	function init() {
		console.log('init()');
		addListeners();
		if( document.getElementsByClassName("toggle-section-header").length > 0 ) {
			updateCardDisplay();
			$('.toggle-section').addClass('d-block');
		}
	}

	function addListeners() {
		console.log('addListeners()');
		//const tHandler = utils.debounce(250, manageResize);
		//window.addEventListener("resize", tHandler);

		/*
		document.body.addEventListener('hidden.bs.collapse', evt => {
			console.log('hidden.bs.collapse', evt);
		});
		*/


		// The shown attribute references how it was when it was clicked.
		$('.toggle-section-header').on({
			click: function(evt) {
				console.log('hidden.bs.collapse shown.bs.collapse', {
					evt,
					type:evt.type,
					attr: $(evt.target).attr('aria-expanded'),
					shown: $(evt.target).next().hasClass('show')
				});
				let id = evt.target.getAttribute('aria-controls'),
					status = evt.target.getAttribute('aria-expanded') === 'true' ? true : false;

				console.log({id,status});
				updateOpenCards(id,status);
			},
		});

	}


	function getOpenCards() {
		console.log('getOpenCards()');
		let openCards = JSON.parse(localStorage.getItem("strpg_openCards")) || [];
		return openCards;
	}


	function updateOpenCards(id=null,status=false) {
		console.log('updateOpenCards()');
		if (!id) return;

		// If the id is in the array, then remove it. If it's not, then add it.
		let openCards = getOpenCards();
		let index = openCards.indexOf(id);

		// If it's being opened and the 
		if (status === true && index < 0) {
			openCards.push(id);
		} else {
			openCards.splice(index,1);
		}

		localStorage.setItem('strpg_openCards',JSON.stringify(openCards));
	}


	function updateCardDisplay() {
		console.log('updateCardDisplay()');

		let openCards = getOpenCards();

		openCards.forEach((id)=>{
			let button = document.querySelector(`[aria-controls="${id}"]`),
				content = document.getElementById(id);

			button.classList.remove("collapsed");
			button.setAttribute("aria-expanded", "true");
			content.classList.add('show');


			console.log({id,button,content});

			/*
			let card = document.getElementById(id),
				button = document.querySelector(`[aria-controls="${id}"]`);

			console.log({id,button,card);
			*/


		});

		/*
		Button: remove collapsed class
				aria-expanded="true"

		Content: Add show class
		*/


	}

	/*
	function manageResize() {
		console.log('manageResize()');
		let footerHeight = $('#main-footer').outerHeight(true);
		$('body').css('padding-bottom', footerHeight+'px');
	}
	*/


	return {
		init
	}

}());

export default STRPG
