const slider = document.getElementById('slider');
const sliderThumb = document.getElementById('sliderThumb');
const rangeValue = document.getElementById('rangeValue');

let isDragging = false;

const snapToClosest = (percentage) => {
  const snaps = [0, 25, 50, 75, 100];
  return snaps.reduce((prev, curr) => Math.abs(curr - percentage) < Math.abs(prev - percentage) ? curr : prev);
};

const startDrag = (event) => {
  isDragging = true;
  event.preventDefault();
};

const stopDrag = () => {
  isDragging = false;
};

const updateSlider = (event) => {
  if (isDragging) {
    const rect = slider.getBoundingClientRect();
    let offsetX;

    if (event.type.includes('mouse')) {
      offsetX = event.clientX - rect.left;
    } else {
      offsetX = event.touches[0].clientX - rect.left;
    }

    let percentage = Math.min(Math.max(0, offsetX / rect.width), 1) * 100;
    percentage = snapToClosest(percentage);
    
    sliderThumb.style.left = `${percentage}%`;
    rangeValue.innerText = percentage;
  }
};

sliderThumb.addEventListener('mousedown', startDrag);
sliderThumb.addEventListener('touchstart', startDrag);

document.addEventListener('mouseup', stopDrag);
document.addEventListener('touchend', stopDrag);

document.addEventListener('mousemove', updateSlider);
document.addEventListener('touchmove', updateSlider);