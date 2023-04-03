const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentPosition = -1;
let slideWidth = slides[0].getBoundingClientRect().width;

slides.forEach((slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
});

function moveToSlide(slider, currentPosition, targetPosition) {
  const distanceToMove = (targetPosition - currentPosition) * slideWidth;
  const duration = 500;
  const startingTime = performance.now();
  const ease = function(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  function animate(currentTime) {
    const elapsedTime = currentTime - startingTime;
    const position = ease(elapsedTime / duration);

    slider.scrollLeft = currentPosition * slideWidth + distanceToMove * position;

    if (elapsedTime < duration) {
      requestAnimationFrame(animate);
    } else {
      currentPosition = targetPosition;
    }
  }

  requestAnimationFrame(animate);
}

nextBtn.addEventListener("click", () => {
  const nextPosition = currentPosition + 1 >= slides.length ? 0 : currentPosition + 1;
  moveToSlide(slider, currentPosition, nextPosition);
});

prevBtn.addEventListener("click", () => {
  const prevPosition = currentPosition - 1 < 0 ? slides.length - 1 : currentPosition - 1;
  moveToSlide(slider, currentPosition, prevPosition);
});