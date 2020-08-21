function animateSlides() {
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

		slideTl.fromTo(revealImg, { x: '0%' }, { x: '100%', duration: 1 });
		slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, '-=0.5');
		slideTl.fromTo(revealText, { x: '0%' }, { x: '100%', duration: 1 });
		slideTl.fromTo(nav, { y: '-100%' }, { y: '0%' }, '-=1');
	});
}
animateSlides();
