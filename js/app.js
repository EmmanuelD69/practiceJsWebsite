let controller;
let slideScene;

function animateSlides() {
	/* Controller Init */
	controller = new ScrollMagic.Controller();
	/* Selecting Elements */
	const sliders = document.querySelectorAll('.slide');
	const nav = document.querySelector('.nav-header');
	/* Looping over each slide */
	sliders.forEach((slide) => {
        const revealImg = slide.querySelector('.reveal-img');
        const img = 
	});
}
