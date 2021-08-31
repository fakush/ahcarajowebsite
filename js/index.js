// --------------Initialization--------------
const $containers = document.querySelectorAll('[carousel-container]');
const equalizeCarouselContainerHeights = () => {
	let prevMaxHeight = 0;
	$containers.forEach((container) => {
		container.style.height = null;
		container.parentElement.parentElement.style.display = 'block';
		if (container.offsetHeight > prevMaxHeight) prevMaxHeight = container.offsetHeight;
		container.parentElement.parentElement.style.display = null;
	})
	$containers.forEach((container) => container.style.height = `${prevMaxHeight}px`);
}

let previousPageY = 0;
const $footer = document.querySelector('.footer');
const hideFooterOnScroll = () => {
	if (previousPageY < window.pageYOffset) {
		$footer.classList.add('footer--scrolling-down')
	} else {
		$footer.classList.remove('footer--scrolling-down')
	}
	previousPageY = window.pageYOffset;
}

const $navLinks = document.querySelectorAll(".header__nav-link");
const $activeNavLink = document.querySelector(".header__nav-link--active");
const $underline = document.querySelector(".header__underline");
let underlineGap = 0;
const moveUnderlineTo = (element) => {
	$navLinks.forEach((link) => {
		if (link.getAttribute("underline-target")) {
			link.removeAttribute("underline-target");
		}
	});
	element.setAttribute("underline-target", "");
	const styles = getComputedStyle(element);
	console.log(styles);
		
	const contentWidth = element.getBoundingClientRect().width - parseFloat(styles.paddingRight);
	const left = element.getBoundingClientRect().left;
	const top = element.getBoundingClientRect().top + element.getBoundingClientRect().height + underlineGap;
	$underline.style.width = `${contentWidth}px`;
	$underline.style.left = `${left}px`;
	$underline.style.top = `${top}px`;
	$underline.style.transform = "none";
}

const adaptToDeviceSize = () => {
	if (window.matchMedia('(min-width: 992px)').matches) { // Desktop and above
		if ($footer) window.removeEventListener('scroll', hideFooterOnScroll);
		underlineGap = 12;
	} else { // Tablets and below
		if ($footer) window.addEventListener('scroll', hideFooterOnScroll);	
		underlineGap = 8;
	}
	moveUnderlineTo($activeNavLink);
}


// --------------Execution--------------
adaptToDeviceSize();
window.addEventListener('resize', adaptToDeviceSize);
if ($containers) {
	equalizeCarouselContainerHeights();
	window.addEventListener('resize', equalizeCarouselContainerHeights);
}
if ($navLinks && $underline) {
	moveUnderlineTo($activeNavLink);
	$navLinks.forEach((link) => link.addEventListener("mouseenter", (e) => moveUnderlineTo(e.target)));
	$navLinks.forEach((link) => link.addEventListener("mouseleave", () => moveUnderlineTo($activeNavLink)));
}