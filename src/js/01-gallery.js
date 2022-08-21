/**
 * Выполняй это задание в файлах 01-gallery.html и 01-gallery.js. Разбей его на несколько подзадач:

Добавь библиотеку SimpleLightbox как зависимость проекта используя npm 
(ссылка на CDN из твоей прошлой работы больше не нужна).

Используй свой JavaScript код из предыдущей домашней работы, 
но выполни рефакторинг с учетом того, что библиотека была установлена через npm (синтаксис import/export).

Для того чтобы подключить CSS код библиотеки в проект, необходимо добавить еще один импорт, 
кроме того который описан в документации.

// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
 */

import SimpleLightbox from 'simplelightbox';
import { galleryItems } from './gallery-items';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');

galleryEl.addEventListener('click', openModal);
makeGalleryMarkup(galleryItems);

function makeGalleryMarkup(array) {
  const galleryItem = array
    .map(
      ({ preview, original, description }) => `

        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                  class="gallery__image"
                 src="${preview}"
                 data-source="${original}"
                 alt="${description}"
                  />
             </a>
        </div>
        `
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', galleryItem);
  return galleryEl;
}

let gallery = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0.8,
  captionDelay: 250,
  showCounter: false,
  captionsData: 'alt',
  close: false,
  heightRatio: 0.8,
});

function openModal(e) {
  e.preventDefault();

  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
  gallery.on('show.simplelightbox', function () {
    gallery.defaultOptions.captionDelay = 250;
  });
  document.addEventListener('keydown', closeModalFromKeyboard);
}

function closeModalFromKeyboard(e) {
  const openOriginalPicture = document.querySelector('.basicLightbox');
  if (!openOriginalPicture) {
    return;
  }
  if (e.code === 'Escape') {
    openOriginalPicture.remove();
  }

  document.removeEventListener('keydown', closeModalFromKeyboard);
}
