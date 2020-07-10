`use strict`;

let regExp = new RegExp(`w+`, `g`);
console.log('regExp: ', regExp);

let arrStr = [
  `Привет\n`,
  `World\t`,
  `!`
].join(`\n`);


// console.log(window.location.hash); // Получить хэш от ссылки .html#open = open
// console.log(window.location.host); // 
console.log(window.location);


// --->>>>  START <<<< --- //

// Здесь будем хранить все объявления
const dataBase = [];


const
  // Модалка
  modalAdd = document.querySelector(`.modal__add`),
  addAd = document.querySelector(`.add__ad`),
  modalBtnSubmit = document.querySelector(`.modal__btn-submit`),
  modalSubmit = document.querySelector(`.modal__submit`),
  modalBtnWarning = document.querySelector(`.modal__btn-warning`),

  // Каталог 
  catalog = document.querySelector(`.catalog`),
  modalItem = document.querySelector(`.modal__item`);





// Закрытие модальных окон
const closeModal = function(event) {
  const target = event.target;
  // console.log('target: ', target);
  // console.log(this);
  if (target.closest(`.modal__close`) || 
    // target === this ||
    target.type === 'submit' || // target.tagName === `FORM`
    event.code === 'Escape'  // Закрытие по нажатию Esc
  ) {
    // this.classList.add(`hide`);
    modalItem.classList.add(`hide`);
    modalAdd.classList.add(`hide`);
    document.removeEventListener('keydown', closeModal); 

  }
};


// Открытие окна
addAd.addEventListener(`click`, () => {
  modalAdd.classList.remove(`hide`);
  //блокируем кнопку отправить в модалке
  modalBtnSubmit.disabled = true;
  // Очищаем форму
  modalSubmit.reset();
  document.addEventListener('keydown', closeModal); 
});



// Закрытие окон
modalAdd.addEventListener(`click`, closeModal);
modalItem.addEventListener(`click`, closeModal);



// Контроль заполнения формы объявления
const elementsModalSubmit = [...modalSubmit.elements]
  .filter(it => it.tagName !== `BUTTON`);

modalSubmit.addEventListener(`input`, () => {
  // every проверяет все эл в массиве, если хотя бы 1 возвр false то вернёт false
  const validForm = elementsModalSubmit.every( it => it.value);
  console.log('validForm: ', validForm);

  // если ВСЕ поля формы заполнены то разблокируем кнопку и убираем надпись
  modalBtnSubmit.disabled = !validForm;
  modalBtnWarning.style.display = validForm ? 'none' : ''; 
});

// НАЖАТИЕ НА ОТПРАВКУ ФОРМЫ
modalSubmit.addEventListener(`submit`, event => {
  event.preventDefault();
  const itemObject = {};

  for(const elem of elementsModalSubmit) {
    itemObject[elem.name] = elem.value;

  }

  dataBase.push(itemObject);
  modalSubmit.reset(); // Очищаем форму
  // console.log('itemObject: ', itemObject);
  closeModal(event);
});





// Открываем карточку из каталога
catalog.addEventListener(`click`, event => {
  const target = event.target;
  // console.log(target.closest(`.card`));

  // Проверяет есть ли данный класс и если нет поднимается выше
  if (target.closest(`.card`)) {
    modalItem.classList.remove(`hide`);
    document.addEventListener('keydown', closeModal); 
  }
});




