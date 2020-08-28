/* https://scrollmagic.io/docs/index.html */
/* The basic ScrollMagic design pattern is one controller, which has one or more scenes attached to it. */
/* Each scene is used to define what happens when the container is scrolled to a specific offset. */

/* declaring variables */
let controller;
let slideScene;
let pageScene;
let fashionScene;
let transylvaniaScene;
let trekkingScene;

const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");

/* function to manage main page animations */
function animateSlides() {
  /* Controller Init */
  controller = new ScrollMagic.Controller();

  /* Selecting Elements */
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  /* Looping over each slide */
  sliders.forEach((slide, index, slides) => {
    /* Selecting the elements to animate */
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");

    /* GSAP */
    /* Creating a timeline for our animations */
    const slideTl = gsap.timeline({
      /* to check ease animations: https://greensock.com/ease-visualizer/ */
      defaults: { duration: 1, ease: "power2.inOut" },
    });

    /* animating the selected elements for each slide */
    /* timeline.fromTo(element to animate, from, to, delay) */

    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");

    /* Creation of a Scene for Slide */
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.35,
    })
      /* GSAP animation */
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      /* scrollMagic indicators */
      /* 			.addIndicators({
				colorStart: 'white',
				colorTrigger: 'red',
				name: 'slide',
			}) */
      /* scrollMagic controller */
      .addTo(controller);

    /* new animation */
    const pageTl = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");

    /* new scene for page */
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      /* 			.addIndicators({
				colorStart: 'blue',
				colorTrigger: 'yellow',
				name: 'page',
				indent: 300,
			}) */
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}

/* function to manage animations on transylvania page */
function transylvaniaAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".transylvania-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    const nextText = nextSlide.querySelector("p");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(
      nextImg,
      { opacity: 0, x: "200%" },
      { opacity: 1, x: "0%" },
      "-=1"
    );
    slideTl.fromTo(nextText, { x: "-200%" }, { x: "0%" });

    /* scene */
    transylvaniaScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "90%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      .addTo(controller);
  });
}

/* function to manage animations on trekking page */
function trekkingAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".trekking-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    const nextText = nextSlide.querySelector("p");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(
      nextImg,
      { opacity: 0, x: "200%" },
      { opacity: 1, x: "0%" },
      "-=1"
    );
    slideTl.fromTo(nextText, { x: "-200%" }, { x: "0%" });

    /* scene */
    trekkingScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "90%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      .addTo(controller);
  });
}

/* function to manage animations on fashion page */
function fashionAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".fashion-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    const nextText = nextSlide.querySelector("p");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(
      nextImg,
      { opacity: 0, x: "200%" },
      { opacity: 1, x: "0%" },
      "-=1"
    );
    slideTl.fromTo(nextText, { x: "-200%" }, { x: "0%" });

    /* scene */
    fashionScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "90%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      .addTo(controller);
  });
}

/* function managing the cursor div, allowing it to move around with the cursor while it is moving  */
function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

/* function to manage the hovering animations when cursor mover around the window*/
function activeCursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" });
    mouseTxt.innerText = "Tap";
  } else {
    mouse.classList.remove("explore-active");
    gsap.to(".title-swipe", 1, { y: "100%" });
    mouseTxt.innerText = "";
  }
}

/* function to manage effects when clicking on burger */
function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    /* turning burger lines into a cross */
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
    /* changing logo color to black */
    gsap.to("#logo", 1, { color: "black" });
    /* extending nav-bar to cover the whole page */
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100%-10%)" });
    /* this will remove the scrolling bar from window / see class in style.css */
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    /* turning burger cross into lines */
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
    /* changing logo color to white */
    gsap.to("#logo", 1, { color: "white" });
    /* reducing nav-bar to disappear from main screen */
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100%-10%)" });
    /* this will restore the scroll bar so we can navigate the window again */
    document.body.classList.remove("hide");
  }
}

/* introducing barba.js */
/* we need to target the logo to apply dynamically the correct href because when animation is done, it is only done on the section, not on the nav-bar, so original logo href is still active and need to be updated */
const logo = document.querySelector("#logo");

barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
        /* logo href need to be updated dynamicaly to work properly*/
        logo.href = "./index.html";
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "transylvania",
      beforeEnter() {
        /* logo href need to be updated dynamicaly to work properly*/
        logo.href = "../index.html";
        transylvaniaAnimation();
      },
      beforeLeave() {
        controller.destroy();
        transylvaniaScene.destroy();
      },
    },
    {
      namespace: "trekking",
      beforeEnter() {
        /* logo href need to be updated dynamicaly to work properly*/
        logo.href = "../index.html";
        trekkingAnimation();
      },
      beforeLeave() {
        controller.destroy();
        trekkingScene.destroy();
      },
    },
    {
      namespace: "fashion",
      beforeEnter() {
        /* logo href need to be updated dynamicaly to work properly*/
        logo.href = "../index.html";
        fashionAnimation();
      },
      beforeLeave() {
        controller.destroy();
        fashionScene.destroy();
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
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",
          1,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.5"
        );
      },
      /* action when we enter a new section */
      enter({ current, next }) {
        /* triggering animations (see barba.js Documentation) */
        let done = this.async();
        /* scrolling up to the top of the page */
        window.scrollTo(0, 0);
        /* animation */
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(
          ".swipe",
          1,
          { x: "0%" },
          { x: "100%", stagger: "0.25", onComplete: done }
        );
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        tl.fromTo(
          ".nav-header",
          1,
          { y: "-100%" },
          { y: "0%", ease: "power2.inOut" },
          "-=1"
        );
      },
    },
  ],
});

/* EVENT LISTENERS */
burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
