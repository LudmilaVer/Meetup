import { eventsStore } from "./data.js";
import { createDomElement } from "./utils.js";
import { formatDate } from "./utils.js";


// Получение контейнера для фильтрованных событий и элементов управления фильтрами
const allcontainer = document.querySelector(".filters");
const selectevents2 = document.getElementById("eventselect");
const distanceselect = document.getElementById("selectdistance");
const typeselect = document.getElementById("selecttype");

// Функция для создания и отображения событий в DOM
function createEvent(eventsarr) {
  eventsarr.forEach((dataevents2) => {
    // Создание ссылки для каждого события
    const linkevents2 = createDomElement({ tag: "a", className: "events2link", href: "#" });
    allcontainer.append(linkevents2);

    // Создание контейнера для изображения события
    const bildsevent = createDomElement({ tag: "div", className: "eventbilds" });
    linkevents2.append(bildsevent);
    const events2bilds = createDomElement({ tag: "img", className: "bildsevents2", src: dataevents2.image });
    bildsevent.append(events2bilds);

    // Создание визуального представления события
    const eventVisual = createDomElement({ tag: "div", className: "Visualevent" });
    linkevents2.append(eventVisual);

    // Добавление даты, названия и типа события
    const dateevents2 = createDomElement({ tag: "p", className: "events2date", textValue: formatDate(dataevents2.date) });
    const nameevents2 = createDomElement({ tag: "h3", className: "events2name", textValue: dataevents2.title });
    const typeevents2 = createDomElement({ tag: "p", className: "events2type", textValue: dataevents2.category });
    eventVisual.append(dateevents2, nameevents2, typeevents2);

    // Добавление иконки онлайн-события, если это применимо
    if (dataevents2.type === "online") {
      const onlineEventImage = createDomElement({
        tag: "img",
        className: "onlineevents2",
        src: "./img/события/Online Event.svg",
        alt: "online event",
      });
      eventVisual.append(onlineEventImage);
    }

    // Добавление информации о количестве участников, если она есть
    if (dataevents2.attendees) {
      const atendes = createDomElement({
        tag: "p",
        className: "atendesevents2",
        textValue: `${dataevents2.attendees} attendees`,
      });
      eventVisual.append(atendes);
    }
  });
}

// Функция для очистки списка событий перед добавлением новых
function clearEvents() {
  while (allcontainer.firstChild) {
    allcontainer.removeChild(allcontainer.firstChild);
  }
}

// Функция для фильтрации событий по выбранным параметрам и обновления отображаемого списка
function filterEvents(eventsarr) {
  const selectedType = selectevents2.value === "any" ? undefined : selectevents2.value;
  const selectedDistance = distanceselect.value === "any" ? undefined : distanceselect.value;
  const selectedCategory = typeselect.value === "any" ? undefined : typeselect.value;

  let filteredArr = eventsarr;
  if (selectedType) {
    filteredArr = filteredArr.filter((element) => element.type === selectedType);
  }
  if (selectedDistance) {
    filteredArr = filteredArr.filter((element) => String(element.distance) === selectedDistance);
  }
  if (selectedCategory) {
    filteredArr = filteredArr.filter((element) => element.category === selectedCategory);
  }

  clearEvents();
  createEvent(filteredArr);
}

// Присоединение обработчиков событий к элементам select для динамического обновления списка событий
selectevents2.addEventListener("change", () => {filterEvents(eventsStore)});
distanceselect.addEventListener("change", () => {filterEvents(eventsStore)});
typeselect.addEventListener("change", () => {filterEvents(eventsStore)});

// Инициализация отображения событий при загрузке страницы
createEvent(eventsStore)