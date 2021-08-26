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



if ($containers) {
	equalizeCarouselContainerHeights();
	window.addEventListener('resize', equalizeCarouselContainerHeights);
}