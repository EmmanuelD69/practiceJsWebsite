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
		/* Selecting the elements to animate */
		const revealImg = slide.querySelector('.reveal-img');
		const img = slide.querySelector('img');
		const revealText = slide.querySelector('.reveal-text');

		/* GSAP animations */
		/* Creating a timeline for our animations */
		const slideTl = gsap.timeline({
			/* to check ease animations: https://greensock.com/ease-visualizer/ */
			defaults: { duration: 1, ease: 'sine.inOut' },
		});

		/* animations */
		/* timeline.fromTo(element to animate, from, to, duration) */
		slideTl.fromTo(nav, { y: '-100%' }, { y: '0%' }, '0.5');
		slideTl.fromTo(revealImg, { x: '0%' }, { x: '100%' }, '0.8');
		slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, '2');
		slideTl.fromTo(revealText, { x: '0%' }, { x: '100%' }, '2.3');
	});
}

animateSlides();
