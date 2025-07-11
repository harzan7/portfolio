
// Project Details Carousel and Modal functionality
let currentCarousel = ''
let currentSlideIndex = 0
const carouselItems = {
    screenshots: [],
    demos: []
};

document.addEventListener('DOMContentLoaded', () => {
    // Only run this script on project details pages
    if (!document.querySelector('.project-details')) return;

    // Initialize carousels
    carouselItems.screenshots =
        Array.from(document.querySelectorAll('#screenshots-carousel .carousel-item'));
    carouselItems.demos = Array.from(document.querySelectorAll('#demos-carousel .carousel-item'));

    // Close modal when pressing Escape key
    document.addEventListener('keydown', () => {
        if (event.key === "Escape") {
            closeModal();
        }
    });
});

function moveSlide(direction, carouselType) {
    const carousel = document.getElementById(`${carouselType}-carousel`);
    const items = carouselItems[carouselType];
    currentSlideIndex = (currentSlideIndex + direction + items.length) % items.length;
    carousel.scrollTo({
        left: currentSlideIndex * carousel.offsetWidth,
        behavior: 'smooth'
    });
}

function openModal(src, caption, carouselType = '', index = 0) {
    if (carouselType) {
        currentCarousel = carouselType;
        currentSlideIndex = index;
    }

    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const captionText = document.getElementById('modal-caption');

    modal.style.display = "block";
    modalImg.src = src;
    captionText.innerHTML = caption;

    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById('image-modal').style.display = "none";
    document.body.style.overflow = "auto";
    currentCarousel = '';
}

function navigateModal(direction, event) {
    event.stopPropagation();
    if (!currentCarousel) return;

    const items = carouselItems[currentCarousel];
    currentSlideIndex = (currentSlideIndex + direction + items.length) % items.length;
    const item = items[currentSlideIndex];
    const img = item.querySelector('img');
    const caption = item.querySelector('.carousel-caption').textContent;

    openModal(img.src, caption, currentCarousel, currentSlideIndex);
}