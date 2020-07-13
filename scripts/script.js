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
let dataBase = JSON.parse(localStorage.getItem(`awito`)) || [];
const saveDB = () => localStorage.setItem(`awito`, JSON.stringify(dataBase));

// dataBase.forEach(it => {
//   it.id = new Date().getTime() + Math.random();
// });

// console.log('arr: ', dataBase);

// saveDB();

const
  // Модалка
  modalAdd = document.querySelector(`.modal__add`),
  addAd = document.querySelector(`.add__ad`),
  modalBtnSubmit = document.querySelector(`.modal__btn-submit`),
  modalSubmit = document.querySelector(`.modal__submit`),
  modalBtnWarning = document.querySelector(`.modal__btn-warning`),

  // Каталог 
  catalog = document.querySelector(`.catalog`),
  modalItem = document.querySelector(`.modal__item`),

  // Модалка описания товара
  modalImageItem = document.querySelector(`.modal__image-item`),
  modalStatusItem = document.querySelector(`.modal__status-item`),
  modalDescriptionItem = document.querySelector(`.modal__description-item`),
  modalCostItem = document.querySelector(`.modal__cost-item`),
  modalHeaderItem = document.querySelector(`.modal__header-item`),

  // Поиск 
  searchInput = document.querySelector(`.search__input`);

// Для фото
const infoPhoto = {};

const modalFileInput = document.querySelector(`.modal__file-input`),
      modalFileBtn = document.querySelector(`.modal__file-btn`),
      modalImageAdd = document.querySelector(`.modal__image-add`);

const textFileBtn = modalFileBtn.textContent,
      srcModalImage = modalImageAdd.src;


modalFileInput.addEventListener(`change`, event => {
  const target = event.target;

  // Чтобы считать с файла формат 64
  const reader = new FileReader();
  const file = target.files[0];

  infoPhoto.fileName = file.name;
  infoPhoto.fileSize = file.size;

  // Отслеживаем когда появился файл и считываем его содержимое
  reader.readAsBinaryString(file);
  reader.addEventListener(`load`, event => {
    if (infoPhoto.fileSize < 4000000) {
      modalFileBtn.textContent = infoPhoto.fileName;
      // конвертируем картинку в строку
      infoPhoto.base64 = btoa(event.target.result);
      modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`;
    } else {
      modalFileBtn.textContent = `Файл не должен превышать 4 Мб`;
      modalFileInput.value = '';
      checkForm();
    }
  });
});


// ПОИСК
searchInput.addEventListener(`input`, () => {
  const valueSearch = searchInput.value.toLowerCase();

  if (valueSearch.length > 2) {
    const result = dataBase.filter(it => 
      it.nameItem.toLowerCase().includes(valueSearch) ||
      it.descriptionItem.toLowerCase().includes(valueSearch)
    );
    renderCard(result);
  } else {
    renderCard();
  }

});

// Закрытие модальных окон
const closeModal = function(event) {
  const target = event.target;
  // console.log('target: ', target);
  // console.log(this);
  if (target.closest(`.modal__close`) || 
    // target === this ||
    target.classList.contains('modal') ||
    // target.type === 'submit' || // target.tagName === `FORM`
    event.code === 'Escape'  // Закрытие по нажатию Esc
  ) {
    // this.classList.add(`hide`);
    modalItem.classList.add(`hide`);
    modalAdd.classList.add(`hide`);
    document.removeEventListener('keydown', closeModal); 
    modalFileBtn.textContent = textFileBtn;
    modalImageAdd.src = srcModalImage;
    checkForm();
  }
};

// Слушатель на модальные окна
modalAdd.addEventListener(`click`, closeModal);
modalItem.addEventListener(`click`, closeModal);



// ОТКРЫТИЕ ОКНА ПОДАЧИ ОБЪЯВЛЕНИЯ
addAd.addEventListener(`click`, () => {
  modalAdd.classList.remove(`hide`);
  //блокируем кнопку отправить в модалке
  modalBtnSubmit.disabled = true;

  // Очищаем форму
  modalSubmit.reset();
  document.addEventListener('keydown', closeModal); 
});

// Контроль заполнения формы объявления
const elementsModalSubmit = [...modalSubmit.elements]
  .filter(it => it.tagName !== `BUTTON` && it.type !== `submit`);


 // Проверка заполнения формы 
const checkForm = () => {
  // every проверяет все эл в массиве, если хотя бы 1 возвр false то вернёт false
  const validForm = elementsModalSubmit.every( it => it.value);

  // если ВСЕ поля формы заполнены то разблокируем кнопку и убираем надпись
  modalBtnSubmit.disabled = !validForm;
  modalBtnWarning.style.display = validForm ? 'none' : ''; 
}

//  Слушатель на ввод данных в форму
modalSubmit.addEventListener(`input`, checkForm);


// НАЖАТИЕ НА ОТПРАВКУ ФОРМЫ
modalSubmit.addEventListener(`submit`, event => {
  event.preventDefault();
  const itemObj = {};

  for(const elem of elementsModalSubmit) {
    itemObj[elem.name] = elem.value;
  }

  itemObj.id = new Date().getTime();
  itemObj.image64 = `data:image/jpeg;base64,${infoPhoto.base64}`;
  dataBase.push(itemObj); // добавляем в базу
  console.log('itemObject: ', itemObj);
  modalSubmit.reset(); // Очищаем форму
  closeModal({target: modalAdd});
  saveDB(); // Сохраняем в локал сторадж
  renderCard();
});


const renderCard = (DB = dataBase) => {
  catalog.textContent = '';

  DB.forEach(it => {
    catalog.insertAdjacentHTML(`beforeend`, `
      <li class="card" data-id-item="${it.id}">
        <img class="card__image" src=${it.image64} alt="">
        <div class="card__description">
          <h3 class="card__header">${it.nameItem}</h3>
          <div class="card__price">${it.costItem} ₽</div>
        </div>
      </li>
    `);
  });
  
};


// ОТКРЫВАЕМ КАРТОЧКУ ИЗ КАТАЛОГА
catalog.addEventListener(`click`, event => {
  const target = event.target;
  // console.log(target.closest(`.card`));
  const card = target.closest(`.card`);
  // console.dir(card);
  // Проверяет есть ли данный класс и если нет поднимается выше
  if (card) {
    // Получаем ID
    console.log(card.dataset.idItem);

    // Получаем из нашей базы
    // const item = dataBase[card.dataset.idItem];
    // console.log('item: ', item);
    const item = dataBase.find(it => it.id === +card.dataset.idItem);
     


    modalImageItem.src = item.image64;
    modalStatusItem.textContent = item.status === 'new' ? `Новый` : `б/у`;
    modalDescriptionItem.textContent = item.descriptionItem;
    modalCostItem.textContent = item.costItem;
    modalHeaderItem.textContent = item.nameItem;
    modalItem.classList.remove(`hide`);
    document.addEventListener('keydown', closeModal); 
  }
});

renderCard();


