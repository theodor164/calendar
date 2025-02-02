const daysContainer = document.querySelector('.days-container');
const todayDay = document.querySelector('.today-day');
const todayDate = document.querySelector('.date');

const previousMonthButton = document.querySelector('.previous-month');
const nextMonthButton = document.querySelector('.next-month');

const selectedMonthElement = document.querySelector('.selected-month');
const selectedYearElement = document.querySelector('.selected-year');

const todayDayContainer = document.querySelector('.today-date');

const nextCourseReminder = document.querySelector('.next-course');

let daysWrapper = document.querySelector('.days-wrapper.active');

const eventDateElement = document.querySelector('.event-date');
const eventTitleElement = document.querySelector('.event-title');
const eventDescriptionElement = document.querySelector('.event-description');
const eventHourElement = document.querySelector('.event-hour');
const eventButtonElement = document.querySelector('.event-button');
const eventPictureElement = document.querySelector('.event-picture');

let animationClass;

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
let selectedMonth = month;
let selectedYear = year;

let selectedEventDay;


const daysOfTheWeek = [
  'luni',
  'marți',
  'miercuri',
  'joi',
  'vineri',
  'sâmbătă',
  'duminică'
];

const monthsOfTheYear = [
  'ianuarie',
  'februarie',
  'martie',
  'aprilie',
  'mai',
  'iunie',
  'iulie',
  'august',
  'septembrie',
  'octombrie',
  'noiembrie',
  'decembrie'
];

const events = {
  '2025-02-25': {
    title: 'BIM | GIS',
    description:
      'Obligativitatea de livrare a documentației de urbanism în noul format GIS, conform Ordin nr. 904/2023',
    time: '17:00',
    pictureLink:
      '/Pictures/GetPictureById?pictureId=6b99a5bf-66c7-4fcf-bb00-dcd107aed837',
    link: '/product/16e1726f-1223-4a62-847e-d25a158f6c8b/obligativitatea-de-livrare-a-documentatiilor-de-urbanism-si-amenajarea-teritoriului-in-noul-format-gis-conform-normelor-tehnice-aprobate-prin-ordinul-nr-904-2023/allbim-net'
  },
  '2025-03-25': {
    title: 'BIM | COSTS',
    description:
      'Avantajele BIM în evaluarea costurilor. Obligații legale și bune practici în extrase inteligente de cantități',
    time: '17:00',
    pictureLink:
      '/Pictures/GetPictureById?pictureId=d08085ea-9841-45fe-a634-e8b12bc087a1',
    link: '/product/9a4b53ec-b492-4c4a-a2c1-0cbecb0cd43a/avantajele-bim-in-evaluarea-costurilor-unui-proiect-de-constructii-obligatii-legale-si-bune-practici-in-realizarea-extraselor-inteligente-de-cantitati/allbim-net'
  },
  '2025-04-25': {
    title: 'BIM | DELIVERY',
    description:
      'Cum livrezi documentația de arhitectură în format open BIM? Conformarea cu cerințele SR EN ISO 19650.',
    time: '17:00',
    pictureLink:
      '/Pictures/GetPictureById?pictureId=b1ae5f34-5eff-477f-8427-53a2ce0d1781',
    link: '/product/85b4d7e4-d896-43b0-a80f-553ebac3d5ef/cum-livrezi-documentatia-de-arhitectura-in-format-open-bim-conformarea-cu-cerintele-sr-en-iso-19650/allbim-net'
  },
  '2025-05-27': {
    title: 'BIM | RENDER',
    description:
      'Tandemul ALLPLAN AI Render și Lumion pentru construirea imaginilor de prezentare imersive.',
    time: '17:00',
    pictureLink:
      '/Pictures/GetPictureById?pictureId=f5d08714-fc78-4825-9561-6ff1c06cfa7c',
    link: '/product/cbb45e81-8a0d-4c16-b271-96cb95c96966/tandemul-allplan-ai-render-si-lumion-pentru-construirea-imaginilor-de-prezentare-imersive/allbim-net'
  },
  '2025-06-24': {
    title: 'BIM | LIGHT',
    description:
      'Digitalizarea studiului de însorire: respectarea reglementărilor și cerințelor esențiale pentru documentația de proiect.',
    time: '17:00',
    pictureLink:
      '/Pictures/GetPictureById?pictureId=fece8716-857a-4731-a463-9da9b5ce100e',
    link: '/product/a25c3d64-10f1-4a49-9fc6-c2a786e78578/digitalizarea-studiului-de-insorire-si-umbrire-respectarea-reglementarilor-si-cerintelor-esentiale-pentru-documentatia-de-proiect/allbim-net'
  },
  '2025-07-29': {
    title: 'BIM | NZEB',
    description:
      'Conformarea energetică NZEB a anvelopei clădirilor în acord cu metodologia MC-001/2022',
    time: '17:00',
    pictureLink:
      '/Pictures/GetPictureById?pictureId=107ef7b2-5e6c-46a1-ac23-711d2d8d5db0',
    link: '/product/b2e783e1-a92d-41ed-ae12-7fddfc7fe66c/conformarea-energetica-a-anvelopei-nzeb-in-acord-cu-metodologia-mc-001-2022/allbim-net'
  },
  '2025-09-23': {
    title: 'BIM | RESTORATION',
    description:
      'Monumente istorice: Instrumente pentru digitalizarea istoriei construite prin nori de puncte si fotogrametrie.',
    time: '17:00',
    pictureLink:
      '/Pictures/GetPictureById?pictureId=7f6eb426-575f-4ee7-ad9e-d9d69c3d9d99',
    link: '/product/fc71b576-bb83-4a19-b9e8-d778591b6b18/monumente-istorice-instrumente-pentru-digitalizarea-istoriei-construite-prin-nori-de-puncte-si-fotogrametrie/allbim-net'
  },
  '2025-10-28': {
    title: 'BIM | PARAMETRIC',
    description:
      'Impactul tehnologiei în proiectarea de arhitectură: unelte pentru programare vizuală și parametrizare.',
    time: '17:00',
    pictureLink:
      '/Pictures/GetPictureById?pictureId=434fd402-f9e1-4764-99b4-2e465d0948e0',
    link: '/product/ff4f2e6b-f29b-4f23-9d2d-772e48e284fe/impactul-tehnologiei-in-proiectarea-de-arhitectura-unelte-pentru-programare-vizuala-si-parametrizare/allbim-net'
  },
  '2025-02-01': {
    title: 'BIM | PARAMETRIC',
    description:
      'Impactul tehnologiei în proiectarea de arhitectură: unelte pentru programare vizuală și parametrizare.',
    time: '17:00',
    pictureLink:
      '/Pictures/GetPictureById?pictureId=434fd402-f9e1-4764-99b4-2e465d0948e0',
    link: '/product/ff4f2e6b-f29b-4f23-9d2d-772e48e284fe/impactul-tehnologiei-in-proiectarea-de-arhitectura-unelte-pentru-programare-vizuala-si-parametrizare/allbim-net'
  }
};

const closestEvent = getClosestEvent(events);
showEventDetails(closestEvent);
selectedEventDay = closestEvent.date;
console.log(selectedEventDay);

// Display the current date

todayDay.textContent = 'Întoarce-te la ziua curentă';
selectedMonthElement.textContent = monthsOfTheYear[now.getMonth()];
selectedYearElement.textContent = now.getFullYear();

// Get data about the month: days in the month, first day

const { daysInMonth, firstDay } = getMonthData(year, month);

function getMonthData(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  return { daysInMonth, firstDay };
}

resetDaysContainer(); // Reset the days container

function resetDaysContainer(wrapper = daysWrapper) {
  wrapper.innerHTML = ''; // Clear the container
  const { daysInMonth, firstDay } = getMonthData(selectedYear, selectedMonth);

  // Add empty divs for previous month days
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement('div');
    emptyDiv.classList.add('day', 'empty-day');
    wrapper.appendChild(emptyDiv);
  }

  // Add actual days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const dayContainer = document.createElement('div');
    dayContainer.classList.add('day');
    dayContainer.textContent = i;
    wrapper.appendChild(dayContainer);
  }
}

loadCalendar(firstDay, daysInMonth, month, year);
highlightSelectedDay(closestEvent.date);

function loadCalendar(
  firstDay,
  daysInMonth,
  selectedMonth,
  selectedYear,
  wrapper = daysWrapper
) {
  let dayIndex = 0;

  for (let day = 1; day <= firstDay; day++) {
    dayIndex++;
  }

  // Insert days of the current month

  for (let day = 1; day <= daysInMonth; day++) {
    const isTodayFlag = isToday(day, selectedMonth, selectedYear);
    const eventFlag = checkForEvent(day, selectedMonth, selectedYear);

    populateDay(
      dayIndex,
      day,
      isTodayFlag ? 'marked-as-today' : '',
      eventFlag,
      wrapper,
      selectedYear,
      selectedMonth
    );
    dayIndex++;
  }
}

function isToday(day, month, year) {
  return (
    day === now.getDate() &&
    month === now.getMonth() &&
    year === now.getFullYear()
  );
}

function checkForEvent(day, month, year) {
  const date = new Date(year, month, day);
  const dateString = date.toLocaleDateString('en-CA');
  return events[dateString] ? 'event-day' : '';
}

function populateDay(
  index,
  text,
  additionalClass = '',
  eventClass = '',
  wrapper = daysWrapper,
  year,
  month
) {
  const dayElement = wrapper.children[index];
  dayElement.textContent = text;
  dayElement.className = `day ${additionalClass} ${eventClass}`;

  // const newDayElement = dayElement.cloneNode(true); // Remove event listeners of the days in the previous and next month

  const dateString = new Date(year, month, text).toLocaleDateString('en-CA');
  dayElement.setAttribute('data-date', dateString);

  if (dayElement.classList.contains('event-day')) {
    setEventDayClickHandler(dayElement);
  }
  // dayElement.replaceWith(newDayElement);
}

function setEventDayClickHandler(dayElement) {
  dayElement.addEventListener('click', handleEventDisplay);
}

function handleEventDisplay(event) {
  const eventDate = new Date(
    selectedYear,
    selectedMonth,
    event.target.textContent
  ).toLocaleDateString('en-CA');

  selectedEventDay = eventDate;

  if (event.target.classList.contains('event-day')) {
    const eventDetails = { date: eventDate, ...events[eventDate] };
    showEventDetails(eventDetails);
    // Highlight the day in the calendar
    highlightSelectedDay(eventDate);
  }
}

function showEventDetails(event) {
  const eventDate =
    `${event.date.split('-')[2]}` +
    ` ${monthsOfTheYear[parseInt(event.date.split('-')[1] - 1)]}` +
    ` ${event.date.split('-')[0]}`;

  nextCourseReminder.innerHTML = isClosestEvent(event.date, events)
    ? 'Următorul curs va fi:'
    : isPastEvent(event.date) ? 'Curs indisponibil' :'Te poți înscrie și la:';

  eventDateElement.innerHTML = `
  <svg class="svg-inline--fa fa-calendar-days" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-days" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"></path></svg>
  ${eventDate}
  `;
  eventTitleElement.innerHTML = event.title;
  eventDescriptionElement.innerHTML = event.description;
  eventHourElement.innerHTML =
    '<svg class="svg-inline--fa fa-clock-five" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock-five" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm24-392l0 128.7 60 90c7.4 11 4.4 25.9-6.7 33.3s-25.9 4.4-33.3-6.7l-64-96c-2.6-3.9-4-8.6-4-13.3l0-136c0-13.3 10.7-24 24-24s24 10.7 24 24z"></path></svg> Ora ' +
    event.time;
  eventButtonElement.setAttribute('href', `${event.link}`);
  eventPictureElement.setAttribute('src', event.pictureLink);
  
  if (isPastEvent(event.date)) {
    eventButtonElement.classList.add('event-button-past');
  } else {
    eventButtonElement.classList.remove('event-button-past');
  }

  eventButtonElement.innerHTML =
    '<svg class="svg-inline--fa fa-arrow-right-long" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right-long" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"></path></svg> Află mai multe';
}

todayDayContainer.addEventListener('click', handleMonthChange);

previousMonthButton.addEventListener('click', handleMonthChange);
nextMonthButton.addEventListener('click', handleMonthChange);

function handleMonthChange(event) {
  if (event.target.classList.contains('previous-month')) {
    animateMonthChange(false);
  } else if (event.target.classList.contains('next-month')) {
    animateMonthChange(true);
  } else if (
    event.target.classList.contains('date') ||
    event.target.classList.contains('today-date') ||
    event.target.classList.contains('today-day')
  ) {
    // Check if the selected month and year are the same as today's month and year
    if (selectedMonth === month && selectedYear === year) {
      return; // Do nothing if the selected month is the same as today
    }
    selectedEventDay = closestEvent.date;
    animateMonthChange('today');
    showEventDetails(closestEvent);
  }

  updateHeader();
}

function updateHeader() {
  selectedMonthElement.textContent = monthsOfTheYear[selectedMonth];
  selectedYearElement.textContent = selectedYear;
}

// Function to animate and update the calendar
function animateMonthChange(isNext) {
  const activeWrapper = document.querySelector('.days-wrapper.active');
  const nextWrapper =
    activeWrapper.nextElementSibling || activeWrapper.previousElementSibling;

  animationClass =
    isNext === 'today'
      ? selectedYear > year || (selectedYear === year && selectedMonth > month)
        ? 'slide-right'
        : 'slide-left'
      : isNext
      ? 'slide-left'
      : 'slide-right';
  updateSelectedMonthAndYear(isNext);
  const { daysInMonth, firstDay } = getMonthData(selectedYear, selectedMonth);

  // Apply animation class
  activeWrapper.classList.add(animationClass); // Animate the current wrapper OUT

  nextWrapper.classList.add(
    animationClass === 'slide-left' ? 'slide-right' : 'slide-left'
  ); // Animate the next wrapper IN

  setTimeout(() => {
    nextWrapper.classList.add('active');
    activeWrapper.innerHTML = ''; // Clear the container
    activeWrapper.classList.remove('active');
    activeWrapper.classList.remove(animationClass);

    // setTimeout(() => {

    resetDaysContainer(nextWrapper);

    loadCalendar(
      firstDay,
      daysInMonth,
      selectedMonth,
      selectedYear,
      nextWrapper
    );
    // Update the daysWrapper variable:
    daysWrapper = document.querySelector('.days-wrapper.active'); // This is important!

    updateHeader();
    nextWrapper.classList.remove(
      animationClass === 'slide-left' ? 'slide-right' : 'slide-left'
    );
    highlightSelectedDay(selectedEventDay);
    // }, 1000);
  }, 200);
}

function updateSelectedMonthAndYear(isNext) {
  if (isNext !== 'today') {
    selectedMonth += isNext ? 1 : -1;
    if (selectedMonth < 0) {
      selectedMonth = 11;
      selectedYear--;
    } else if (selectedMonth > 11) {
      selectedMonth = 0;
      selectedYear++;
    }
  } else {
    selectedMonth = month;
    selectedYear = year;
  }
  highlightTodayDayContainer();
}

function highlightTodayDayContainer() {
  if (selectedMonth === month && selectedYear === year) {
    todayDayContainer.classList.remove('hover-over-current-date');
  } else {
    todayDayContainer.classList.add('hover-over-current-date');
  }
}

function getClosestEvent(events) {
  const today = new Date();
  let closestEvent = null;
  let closestDate = null;

  for (const date in events) {
    const eventDate = new Date(date);

    if (eventDate >= today && (!closestDate || eventDate < closestDate)) {
      closestDate = eventDate;
      closestEvent = { date, ...events[date] };
    }
  }

  return closestEvent;
}

function isClosestEvent(selectedDate, events) {
  const closestEvent = getClosestEvent(events);
  return closestEvent.date === selectedDate;
}

calendarContainer = document.querySelector('.calendar-container');

let touchStartX = 0;
let touchEndX = 0;

calendarContainer.addEventListener('touchstart', (event) => {
  touchStartX = event.touches[0].clientX;
});

calendarContainer.addEventListener('touchend', (event) => {
  touchEndX = event.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;

  if (touchStartX - touchEndX > swipeThreshold) {
    animateMonthChange(true);
  } else if (touchEndX - touchStartX > swipeThreshold) {
    animateMonthChange(false);
  }
}

function highlightSelectedDay(eventDateString) {
  // Remove highlight from any previously highlighted day
  document.querySelectorAll('.day.highlighted-event').forEach((el) => {
    el.classList.remove('highlighted-event');
  });

  // Find the day element that has the matching data-date attribute
  const dayElement = document.querySelector(
    `.day[data-date="${eventDateString}"]`
  );
  if (dayElement) {
    dayElement.classList.add('highlighted-event');
  }
}

function isPastEvent(selectedDate) {
  const eventDate = new Date(selectedDate);
  const today = new Date();
  
  // Normalize today's date to ignore time
  today.setHours(0, 0, 0, 0);

  return eventDate < today;
}
