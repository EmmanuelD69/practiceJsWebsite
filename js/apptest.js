gsap.registerPlugin(ScrollTrigger);

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

		let slideTl = gsap.timeline({
			// yes, we can add it to an entire timeline!
			scrollTrigger: {
				trigger: 'section',
				// pin: true, // pin the trigger element while active
				start: 'top', // when the top of the trigger hits the top of the viewport
				end: 'bottom', // end after scrolling 500px beyond the start
				markers: true,
				// scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
				defaults: {
					duration: 1, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
					ease: 'power2.inOut', // the ease of the snap animation ("power3" by default)
				},
			},
		});

		slideTl
			.addLabel('revealImgAnim')
			.fromTo(revealImg, { x: '0%' }, { x: '100%', duration: 1 });
		// 		/* GSAP */
		// 		/* Creating a timeline for our animations */
		// 		const slideTl = gsap.timeline({
		// 			/* to check ease animations: https://greensock.com/ease-visualizer/ */
		// 			defaults: { duration: 1, ease: 'power2.inOut' },
		// 		});

		/* animating the selected elements for each slide */
		/* timeline.fromTo(element to animate, from, to, delay) */
		// slideTl.fromTo(revealImg, { x: '0%' }, { x: '100%', duration: 1 });
		// slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, '-=0.5');
		// slideTl.fromTo(revealText, { x: '0%' }, { x: '100%', duration: 1 });
		// slideTl.fromTo(nav, { y: '-100%' }, { y: '0%' }, '-=1');

		// 	fashion = ScrollTrigger.create({
		// 		trigger: '.fashion',
		// 		start: 'top center',
		// 		end: '100%',
		// 		animation: revealImgAnim,
	});
}

animateSlides();
