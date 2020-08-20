/* https://scrollmagic.io/docs/index.html */
/* The basic ScrollMagic design pattern is one controller, which has one or more scenes attached to it. */
/* Each scene is used to define what happens when the container is scrolled to a specific offset. */
/* ScrollMagic variables */
let controller;
let slideScene;
let pageScene;

function animateSlides() {
	/* Controller Init */
	controller = new ScrollMagic.Controller();
	/* Selecting Elements */
	const sliders = document.querySelectorAll('.slide');
	const nav = document.querySelector('.nav-header');
	/* Looping over each slide */
	sliders.forEach((slide, index, slides) => {
		/* Selecting the elements to animate */
		const revealImg = slide.querySelector('.reveal-img');
		const img = slide.querySelector('img');
		const revealText = slide.querySelector('.reveal-text');

		/* GSAP */
		/* Creating a timeline for our animations */
		const slideTl = gsap.timeline({
			/* to check ease animations: https://greensock.com/ease-visualizer/ */
			defaults: { duration: 1, ease: 'power2.inOut' },
		});
		/* animating the selected elements for each slide */
		/* timeline.fromTo(element to animate, from, to, delay) */
		slideTl.fromTo(revealImg, { x: '0%' }, { x: '100%' });
		slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, '-=1');
		slideTl.fromTo(revealText, { x: '0%' }, { x: '100%' }, '-=0.75');
		slideTl.fromTo(nav, { y: '-100%' }, { y: '0%' }, '-=0.5');

		/* Creation of a Scene for Slide */
		slideScene = new ScrollMagic.Scene({
			triggerElement: slide,
			triggerHook: 0.55,
			reverse: false,
		})
			/* GSAP animation */
			.setTween(slideTl)
			/* scrollMagic indicators */
			.addIndicators({
				colorStart: 'white',
				colorTrigger: 'yellow',
				name: 'slide',
			})
			/* scrollMagic controller */
			.addTo(controller);

		/* new animation */
		const pageTl = gsap.timeline();
		let nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1];
		pageTl.fromTo(nextSlide, { y: '0%' }, { y: '50%' });
		pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
		pageTl.fromTo(nextSlide, { y: '50%' }, { y: '0%' }, '-=0.5');
		/* new scene for page */
		pageScene = new ScrollMagic.Scene({
			triggerElement: slide,
			duration: '100%',
			triggerHook: 0,
		})
			.addIndicators({
				colorStart: 'white',
				colorTrigger: 'yellow',
				name: 'page',
				indent: 200,
			})
			.setPin(slide, { pushFollowers: false })
			.setTween(pageTl)
			.addTo(controller);
	});
}

animateSlides();
