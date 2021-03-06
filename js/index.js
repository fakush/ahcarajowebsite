'use strict'

// --------------Initialization--------------
const toRunOnScrollDown = [];
const toRunOnScrollUp = [];
const $footer = document.querySelector('.footer');
const $logo = document.querySelector('.header__logo');
if ($logo) {
	toRunOnScrollDown.push(() => $logo.classList.add('header__logo--scrolling-down'));
	toRunOnScrollUp.push(() => $logo.classList.remove('header__logo--scrolling-down'));
}

// -------Nav underline animation-------
const $navLinks = document.querySelectorAll(".header__nav-link");
const $activeNavLink = document.querySelector(".header__nav-link--active");
const $underline = document.querySelector(".header__underline");
let underlineGap = 0;
const moveUnderlineTo = (element) => {
	const { paddingLeft, paddingRight } = getComputedStyle(element);
	const contentWidth = element.offsetWidth - parseFloat(paddingRight) - parseFloat(paddingLeft);
	const left = element.offsetLeft;
	const top = element.offsetTop + element.offsetHeight + underlineGap;
	$underline.style.width = `${contentWidth}px`;
	$underline.style.left = `${left}px`;
	$underline.style.top = `${top}px`;
	$underline.style.transform = "none";
}
const underlineToActive = () => moveUnderlineTo($activeNavLink);
const activateThisLink = (e) => {
	e.target.removeEventListener("mouseleave", underlineToActive);
	e.target.classList.add("header__nav-link--active");
	$activeNavLink.classList.remove("header__nav-link--active");
};

// -------On scroll down/up-------
let previousPageY = 0;
const handleScroll = () => {
	const isScrollingDown = previousPageY < window.pageYOffset;
	if (isScrollingDown) {
		toRunOnScrollDown.forEach((toRun) => toRun());
	} else {
		toRunOnScrollUp.forEach((toRun) => toRun());
	}
	previousPageY = window.pageYOffset;
}

// -------Adapt to mobile/tablet/desktop-------
const adaptToDeviceSize = () => {
	if (window.matchMedia('(min-width: 992px)').matches) { // Desktop and above
		underlineGap = 12;
	} else { // Tablets and below
		underlineGap = 8;
		if ($footer) {
			toRunOnScrollDown.push(() => $footer.classList.add('footer--scrolling-down'));
			toRunOnScrollUp.push(() => $footer.classList.remove('footer--scrolling-down'));
		}
	}
}

const loadSocialMediaURLs = (vinculosPath = '../assets/json/vinculos.json') => {
	fetch(vinculosPath)
		.then((response) => response.json())
		.then(({ facebook, instagram, whatsapp }) => {
			const whatsappURL = `https://api.whatsapp.com/send/?phone=${whatsapp.numero}&text=${encodeURIComponent(whatsapp.mensaje)}`;
			const URLs = {
				facebook,
				instagram,
				whatsapp: whatsappURL,
			};
			const $socialMediaLinks = document.querySelectorAll('[loadURL]');
			$socialMediaLinks.forEach((link) => {
				const targetSocialMedia = link.getAttribute('loadURL');
				link.href = URLs[targetSocialMedia];
			});
		});
};


// --------------Execution--------------
AOS.init({
	once: true,
	duration: 800
});

adaptToDeviceSize();
window.addEventListener('resize', adaptToDeviceSize);
window.addEventListener('scroll', handleScroll);
if ($navLinks.length && $underline) {
	moveUnderlineTo($activeNavLink);
	$navLinks.forEach(($link) => $link.addEventListener("mouseenter", (e) => moveUnderlineTo(e.target)));
	$navLinks.forEach(($link) => $link.addEventListener("mouseleave", underlineToActive));
	$navLinks.forEach(($link) => $link.addEventListener("click", activateThisLink));
	window.addEventListener('resize', underlineToActive);
}