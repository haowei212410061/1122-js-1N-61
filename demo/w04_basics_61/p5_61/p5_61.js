import { tours } from './data.js';

console.log('tours', tours);

const section = document.querySelector('.section-center');

const displayTours_61 = () => {
    const toursInfo = tours.map((tour) => {
        const {id, info, local_img, name, price} = tour;
        return `
        <article class="single-tour">

        <img src="${local_img}" alt="${name}" />
        <footer>
          <div class="tour-info">
            <h4>${name}</h4>
            <h4 class="tour-price">${price}</h4>
          </div>
          <p>
            ${info}<button>read more</button>
          </p>
          <button class="delete-btn">not interested</button>
        </footer>
      </article>
        `

    }).join('');

    section.innerHTML = toursInfo;
}

window.addEventListener('DOMContentLoaded', () => {
    displayTours_61();
})