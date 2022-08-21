/**
 * В HTML есть разметка формы. 
 * Напиши скрипт который будет сохранять значения полей в локальное хранилище когда пользователь что-то печатает.
 * 
 * <form class="feedback-form" autocomplete="off">
  <label>
    Email
    <input type="email" name="email" autofocus />
  </label>
  <label>
    Message
    <textarea name="message" rows="8"></textarea>
  </label>
  <button type="submit">Submit</button>
</form>


Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, 
в которых сохраняй текущие значения полей формы. 
Пусть ключом для хранилища будет строка "feedback-form-state".

При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, 
заполняй ими поля формы. В противном случае поля должны быть пустыми.

При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями
 в консоль.

Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. 
Для этого добавь в проект и используй библиотеку lodash.throttle.
 */

import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');
const currentValue = localStorage.getItem(STORAGE_KEY);
const isLocalStorage = JSON.parse(currentValue);

formEl.addEventListener('input', throttle(saveInputData, 500));
formEl.addEventListener('submit', onFormSubmit);

reLoadingPage();

function reLoadingPage() {
  if (!isLocalStorage) {
    return;
  }

  formEl.email.value = isLocalStorage.email;
  formEl.message.value = isLocalStorage.message;
}

function saveInputData() {
  const formData = {
    email: formEl.email.value,
    message: formEl.message.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();

  console.log('User: ', localStorage.getItem(STORAGE_KEY));

  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}
