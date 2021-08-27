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
const disableHideFooterInDesktop = () => {
	if ($footer) {
		if (window.matchMedia('(min-width: 992px)').matches) {
			window.removeEventListener('scroll', hideFooterOnScroll);
		} else {
			window.addEventListener('scroll', hideFooterOnScroll);
		}
	}
}

// --------------Execution--------------
disableHideFooterInDesktop();
window.addEventListener('resize', disableHideFooterInDesktop);
if ($containers) {
	equalizeCarouselContainerHeights();
	window.addEventListener('resize', equalizeCarouselContainerHeights);
}