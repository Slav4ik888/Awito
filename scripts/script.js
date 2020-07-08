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
  // card = document.querySelector(`.card`),
  modalItem = document.querySelector(`.modal__item`);


console.log('modalAdd: ', modalAdd);

// Открытие окна
addAd.addEventListener(`click`, () => {
  modalAdd.classList.remove(`hide`);
  //блокируем кнопку отправить в модалке
  modalBtnSubmit.disabled = true;
});

// Закрытие окна
modalAdd.addEventListener(`click`, event => {
  const target = event.target;

  if (target.closest(`.modal__close`) ||
  // if (target.classList.contains(`modal__close`) ||
    target === modalAdd) 
  {
    modalAdd.classList.add(`hide`);
    // Очищаем форму
    modalSubmit.reset();
  }
});

// Открываем карточку из каталога
catalog.addEventListener(`click`, event => {
  const target = event.target;

  if (target.classList.contains(`card__image`) ||
      target.classList.contains(`card__description`) ||
      target.classList.contains(`card__header`) ||
      target.classList.contains(`card__price`) ) 
    {
    modalItem.classList.remove(`hide`);

    
    // Закрытие по нажатию Esc
    document.addEventListener('keypress', e => {
      let keyCode = e.keyCode;
      console.log('keyCode: ', keyCode);
      if (keyCode === 32) {
        modalItem.classList.add(`hide`);
      };
    }); 
    
    // Закрытие окна карточки
    modalItem.addEventListener(`click`, event => {
      const target = event.target;
      console.log('target: ', target);

      // if (target.closest(`.modal__close`) ||
      if (target.classList.contains(`modal__close`) ||
        target === modalItem) 
      {
        modalItem.classList.add(`hide`);
      }
    });

  }

});


