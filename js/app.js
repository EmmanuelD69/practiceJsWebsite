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
			triggerHook: 0.25,
		})
			/* GSAP animation */
			.setTween(slideTl)
			/* scrollMagic indicators */
			.addIndicators({
				colorStart: 'white',
				colorTrigger: 'red',
				name: 'slide',
			})
			/* scrollMagic controller */
			.addTo(controller);

		/* new animation */
		const pageTl = gsap.timeline();
		let nextSlide =
			slides.length - 1 === index ? '.fashion' : slides[index + 1];
		console.log(nextSlide);
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
				colorStart: 'blue',
				colorTrigger: 'yellow',
				name: 'page',
				indent: 300,
			})
			.setPin(slide, { pushFollowers: false })
			.setTween(pageTl)
			.addTo(controller);
	});
}

const mouse = document.querySelector('.cursor');
const mouseTxt = mouse.querySelector('span');
const burger = document.querySelector('.burger');
/* animation du curseur de la souris */
function cursor(e) {
	mouse.style.top = e.pageY + 'px';
	mouse.style.left = e.pageX + 'px';
	// console.log(mouse.style.top, mouse.style.left);
}

function activeCursor(e) {
	const item = e.target;
	if (item.id === 'logo' || item.classList.contains('burger')) {
		mouse.classList.add('nav-active');
	} else {
		mouse.classList.remove('nav-active');
	}
	if (item.classList.contains('explore')) {
		mouse.classList.add('explore-active');
		gsap.to('.title-swipe', 1, { y: '0%' });
		mouseTxt.innerText = 'Tap';
	} else {
		mouse.classList.remove('explore-active');
		gsap.to('.title-swipe', 1, { y: '100%' });
		mouseTxt.innerText = '';
	}
}

function navToggle(e) {
	if (!e.target.classList.contains('active')) {
		e.target.classList.add('active');
		/* turning burger lines into a cross */
		gsap.to('.line1', 0.5, { rotate: '45', y: 5, background: 'black' });
		gsap.to('.line2', 0.5, { rotate: '-45', y: -5, background: 'black' });
		/* changing logo color to black */
		gsap.to('#logo', 1, { color: 'black' });
		/* extending nav-bar to cover the whole page */
		gsap.to('.nav-bar', 1, { clipPath: 'circle(2500px at 100%-10%)' });
		/* removing side scrolling bar */
		document.body.classList.add('hide');
	} else {
		e.target.classList.remove('active');
		/* turning burger cross into lines */
		gsap.to('.line1', 0.5, { rotate: '0', y: 0, background: 'white' });
		gsap.to('.line2', 0.5, { rotate: '0', y: 0, background: 'white' });
		/* changing logo color to white */
		gsap.to('#logo', 1, { color: 'white' });
		/* reducing nav-bar to disappear from main screen */
		gsap.to('.nav-bar', 1, { clipPath: 'circle(50px at 100%-10%)' });
		document.body.classList.remove('hide');
	}
}

/* introducing barba.js */
/* we need to target the logo to apply dynamically the correct href because when animation is done, it is only done on the section, not on the nav-bar, so original logo href is still active and need to be updated */
const logo = document.querySelector('#logo');
barba.init({
	views: [
		{
			namespace: 'home',
			beforeEnter() {
				animateSlides();
				/* logo href need to be updated dynamicaly to work properly*/
				logo.href = './index.html';
			},
			beforeLeave() {
				slideScene.destroy();
				pageScene.destroy();
				controller.destroy();
			},
		},
		{
			namespace: 'fashion',
			beforeEnter() {
				/* logo href need to be updated dynamicaly to work properly*/
				logo.href = '../index.html';
			},
		},
	],
	transitions: [
		{
			/* action on the current section when we leave it */
			leave({ current, next }) {
				/* triggering animations (see barba.js Documentation) */
				let done = this.async();
				/* animation */
				const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
				tl.fromTo(
					current.container,
					1,
					{ opacity: 1 },
					{ opacity: 0, onComplete: done }
				);
			},
			/* action when we enter a new section */
			enter({ current, next }) {
				/* triggering animations (see barba.js Documentation) */
				let done = this.async();
				/* scrolling up to the top of the page */
				window.scrollTo(0, 0);
				/* animation */
				const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
				tl.fromTo(
					next.container,
					1,
					{ opacity: 0 },
					{ opacity: 1, onComplete: done }
				);
			},
		},
	],
});
/* EVENT LISTENERS */
burger.addEventListener('click', navToggle);
window.addEventListener('mousemove', cursor);
window.addEventListener('mouseover', activeCursor);
animateSlides();
