// -------Carousel containers with same height-------
const $carouselContainers = document.querySelectorAll('[carousel-container]');
const equalizeCarouselContainerHeights = () => {
	let prevMaxHeight = 0;
	$carouselContainers.forEach(($container) => {
		$container.style.height = null;
		$container.parentElement.parentElement.style.display = 'block';
		if ($container.offsetHeight > prevMaxHeight) prevMaxHeight = $container.offsetHeight;
		$container.parentElement.parentElement.style.display = null;
	})
	$carouselContainers.forEach(($container) => $container.style.height = `${prevMaxHeight}px`);
}

// -------Order product cards depending of the clicked category-------
const setTargetCategoryOnClick = () => {
	const $categoryLinks = document.querySelectorAll('[categoryTarget]');
	if ($categoryLinks.length) {
		$categoryLinks.forEach((categoryLink) => {
			categoryLink.addEventListener('click', () => {
				localStorage.setItem('clickedCategory', categoryLink.getAttribute('categoryTarget'));
			});
		});
	}
}

// --------------Execution--------------
setTargetCategoryOnClick();
if ($carouselContainers.length) {
	equalizeCarouselContainerHeights();
	window.addEventListener('resize', equalizeCarouselContainerHeights);
}
loadSocialMediaURLs('./assets/json/vinculos.json');