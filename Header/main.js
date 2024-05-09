import { eventsStore } from "./data.js";
import { createDomElement } from "./utils.js";
import { formatDate } from "./utils.js";


const allcontainer = document.querySelector(".filters")
const selectevents2 = document.getElementById("eventselect")
const distanceselect = document.getElementById("selectdistance")
const typeselect = document.getElementById("selecttype")

function createEvent(eventsarr) {
  eventsarr.forEach((dataevents2) => {
    const linkevents2 = createDomElement({ tag: "a", className: "events2link", href: "#" })
    allcontainer.append(linkevents2)
    const bildsevent = createDomElement({ tag: "div", className: "eventbilds" })
    linkevents2.append(bildsevent)
    const events2bilds = createDomElement({ tag: "img", className: "bildsevents2", src: dataevents2.image })
    bildsevent.append(events2bilds)
    const eventVisual = createDomElement({ tag: "div", className: "Visualevent" })
    linkevents2.append(eventVisual)
    const dateevents2 = createDomElement({ tag: "p", className: "events2date", textValue: formatDate(dataevents2.date) })
    const nameevents2 = createDomElement({ tag: "h3", className: "events2name", textValue: dataevents2.title })
    const typeevents2 = createDomElement({ tag: "p", className: "events2type", textValue: dataevents2.category })
    eventVisual.append(dateevents2, nameevents2, typeevents2);
    if (dataevents2.type === "online") {
      const onlineEventImage = createDomElement({
        tag: "img",
        className: "onlineevents2",
        src: "./img/события/Online Event.svg",
        alt: "online event",
      })
      eventVisual.append(onlineEventImage)
    }
    if (dataevents2.attendees) {
      const atendes = createDomElement({
        tag: "p",
        className: "atendesevents2",
        textValue:`${dataevents2.attendees} attendees`,
      })
      eventVisual.append(atendes)
    }
  })
}
function clearEvents() {
  while (allcontainer.firstChild) {
    allcontainer.removeChild(allcontainer.firstChild);
  }
}
function filterEvents(eventsarr) {
  const selectedType = selectevents2.value === "any" ? undefined : selectevents2.value
  const selectedDistance = distanceselect.value === "any" ? undefined : distanceselect.value
  const selectedCategory = typeselect.value === "any" ? undefined : typeselect.value
  let filteredArr = eventsarr
  if (selectedType) {
    filteredArr = filteredArr.filter((element) => element.type === selectedType)
  }
  if (selectedDistance) {
    filteredArr = filteredArr.filter((element) => String(element.distance) === selectedDistance)
  }
  if (selectedCategory) {
    filteredArr = filteredArr.filter((element) => element.category === selectedCategory)
  }
  clearEvents()
  createEvent(filteredArr)
}
selectevents2.addEventListener("change", () => {filterEvents(eventsStore)})
distanceselect.addEventListener("change", () => {filterEvents(eventsStore)})
typeselect.addEventListener("change", () => {filterEvents(eventsStore)})
createEvent(eventsStore)