`use strict`;

let regExp = new RegExp(`w+`, `g`);
console.log('regExp: ', regExp);

let arrStr = [
  `Привет\n`,
  `World\t`,
  `!`
].join(`\n`);


// --->>>>  START <<<< --- //

const
  // Модалка
  modalAdd = document.querySelector(`.modal__add`),
  addAd = document.querySelector(`.add__ad`),
  modalBtnSubmit = document.querySelector(`.modal__btn-submit`),
  modalSubmit = document.querySelector(`.modal__submit`),

  // Каталог 
  catalog = document.querySelector(`.catalog`),
  modalItem = document.querySelector(`.modal__item`);


// Закрытие модальных окон
const closeModal = function(event) {
  const target = event.target;
  // console.log(this);
  if (target.closest(`.modal__close`) || target === this) {
    this.classList.add(`hide`);
  }
};

// Закрытие по нажатию Esc
const closeModalEsc = event => {
  if (event.code === 'Escape') {
    modalItem.classList.add(`hide`);
    modalAdd.classList.add(`hide`);
    document.removeEventListener('keydown', closeModalEsc); 
  };
};



// Открытие окна
addAd.addEventListener(`click`, () => {
  modalAdd.classList.remove(`hide`);
  //блокируем кнопку отправить в модалке
  modalBtnSubmit.disabled = true;
  // Очищаем форму
  modalSubmit.reset();
  document.addEventListener('keydown', closeModalEsc); 
});



// Закрытие окон
modalAdd.addEventListener(`click`, closeModal);
modalItem.addEventListener(`click`, closeModal);



// Открываем карточку из каталога
catalog.addEventListener(`click`, event => {
  const target = event.target;
  // console.log(target.closest(`.card`));

  // Проверяет есть ли данный класс и если нет поднимается выше
  if (target.closest(`.card`)) {
    modalItem.classList.remove(`hide`);
    document.addEventListener('keydown', closeModalEsc); 
  }
});


