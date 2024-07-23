const slider = document.getElementById('slider');
const sliderThumb = document.getElementById('sliderThumb');
const rangeValue = document.getElementById('rangeValue');
const appView = document.getElementById('app');
const emojisArr = document.querySelectorAll('.emoji');
var sliderPosition = 50;
let isDragging = false;

const url = 'https://satisfaction-survey-25a8f-default-rtdb.firebaseio.com/avaliacaoAtendimento.json';


//função para enviar os dados para o firebase 
function sendData(avaliacaoAtendimento) {

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(avaliacaoAtendimento),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}

// Apenas uma checkbox marcada por vez
document.querySelectorAll('.checks input').forEach((checkbox) => {
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      document.querySelectorAll('.checks input').forEach((otherCheckbox) => {
        if (otherCheckbox !== this) {
          otherCheckbox.checked = false;
        }
      });
    }
  });
});

window.onload = () => {
  appView.style.opacity = '1';
};

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

    updateEmojis(percentage);
    updateSliderPosition(percentage);
  }
};

const updateSliderPosition = (percentage) => {
  sliderPosition = percentage;
  sliderThumb.style.left = `${percentage}%`;
};

const updateEmojis = (percentage) => {
  emojisArr.forEach((emoji) => emoji.classList.remove('active'));
  if (percentage === 0) {
    emojisArr[0].classList.add('active');
  } else if (percentage === 25) {
    emojisArr[1].classList.add('active');
  } else if (percentage === 50) {
    emojisArr[2].classList.add('active');
  } else if (percentage === 75) {
    emojisArr[3].classList.add('active');
  } else if (percentage === 100) {
    emojisArr[4].classList.add('active');
  }
};

function converteRastreio(index) {
  if (index === 0) {
    return 'Redes sociais';
  } else if (index === 1) {
    return 'Rádio';
  } else if (index === 2) {
    return 'Familia';
  } else if (index === 3) {
    return 'Amigos';
  } else if (index === 4) {
    return 'Empresa';
  } else if (index === 5) {
    return 'none';
  }
}

function formatDate(date) {
  // Obter o dia da semana
  const options = { weekday: 'long' };
  const dayName = new Intl.DateTimeFormat('pt-BR', options).format(date);

  // Obter os componentes da data
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
  const year = date.getFullYear();

  // Obter os componentes da hora
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Montar a string final
  const formattedDate = `${dayName}, ${day}/${month}/${year}, ${hours}:${minutes}`;
  return formattedDate;
}

function converteResposta(sliderNumber) {
  if (sliderNumber === 0) {
    return 'Péssimo';
  } else if (sliderNumber === 25) {
    return 'Ruim';
  } else if (sliderNumber === 50) {
    return 'Regular';
  } else if (sliderNumber === 75) {
    return 'Bom';
  } else if (sliderNumber === 100) {
    return 'Excelente';
  }
}

sliderThumb.addEventListener('mousedown', startDrag);
sliderThumb.addEventListener('touchstart', startDrag);

document.addEventListener('mouseup', stopDrag);
document.addEventListener('touchend', stopDrag);

document.addEventListener('mousemove', updateSlider);
document.addEventListener('touchmove', updateSlider);

// Adiciona event listeners aos emojis
emojisArr.forEach((emoji, index) => {
  emoji.addEventListener('click', () => {
    const percentage = index * 25;
    updateEmojis(percentage);
    updateSliderPosition(percentage);
  });
});
