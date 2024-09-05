document.addEventListener('DOMContentLoaded', () => {
    const sliderTrack = document.querySelector('.slider-track');
    const images = document.querySelectorAll('.slider-track img');
    const totalImages = images.length / 2; // Since we're duplicating images for infinite scroll
    let index = 0;

    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${index * 100}vw)`;
    }

    function moveNext() {
        index++;
        if (index >= totalImages) {
            index = 0;
            sliderTrack.style.transition = 'none'; // Instant jump to start
            updateSlider();
            setTimeout(() => {
                sliderTrack.style.transition = 'transform 1.6s ease'; // Reset transition
            }, 50);
        } else {
            updateSlider();
        }
    }

    function movePrev() {
        index--;
        if (index < 0) {
            index = totalImages - 1;
            sliderTrack.style.transition = 'none'; // Instant jump to end
            updateSlider();
            setTimeout(() => {
                sliderTrack.style.transition = 'transform 1.6s ease'; // Reset transition
            }, 50);
        } else {
            updateSlider();
        }
    }

    // Automatic infinite scrolling
    let autoScrollInterval = setInterval(moveNext, 3000); // Change image every 3 seconds

    // Clear auto scroll on hover
    document.querySelector('.image-slider').addEventListener('mouseover', () => {
        clearInterval(autoScrollInterval);
    });

    // Restart auto scroll when not hovering
    document.querySelector('.image-slider').addEventListener('mouseout', () => {
        autoScrollInterval = setInterval(moveNext, 3000);
    });

    // Bind buttons to functions
    document.querySelector('.prev').addEventListener('click', movePrev);
    document.querySelector('.next').addEventListener('click', moveNext);
});
