const MONTHNAMES = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const DATE = new Date();
const CURRENTDATE = new Date();

class Calendar {
  constructor() {
    this.calendarElement = document.querySelector('.calendar');
    this.calendarDaysElement = this.calendarElement.querySelector('.calendar-days');
    this.renderTitleDays();
    this.renderMonthName(DATE);
    this.renderDays(DATE.getMonth(), DATE.getFullYear());
    this.setMonth = this.setMonth.bind(this);

    this.calendarElement.querySelectorAll('.icon-arrow-right').forEach(icon => icon.addEventListener('click', this.setMonth));
  }

  renderDays(month, day) {
    const days = this.getDaysInMonth(month, day);

    this.calendarDaysElement.innerHTML = '';

    days.map(day => {
      const spanElement = document.createElement('span');
      spanElement.innerHTML = day.getDate();

      if (day.getMonth() === CURRENTDATE.getMonth() && day.getDate() === CURRENTDATE.getDate()) {
        spanElement.classList.add('current-day');
      }

      this.calendarDaysElement.append(spanElement);
    });
  }

  renderTitleDays() {
    WEEKDAYS.map(day => {
      const spanElement = document.createElement('span');

      spanElement.innerHTML = day;
      this.calendarDaysElement.append(spanElement);
    });
  }

  renderMonthName(date) {
    const currentMonthElement = this.calendarElement.querySelector('#current-month');
    currentMonthElement.innerText = `${MONTHNAMES[date.getMonth()]}, ${date.getFullYear()}`;
  }

 getDaysInMonth(month, year) {
   const firstDay = new Date(year, month, 1);
   const prevMonthDays = firstDay.getDay();
   const lastDay = new Date(year, month + 1, 0);
   const nextMonthDays = lastDay.getDay();
   const days = [];

   firstDay.setDate(firstDay.getDate() - prevMonthDays);
   lastDay.setDate(lastDay.getDate() + (6 - nextMonthDays));

   while (firstDay <= lastDay) {
      days.push(new Date(firstDay));
      firstDay.setDate(firstDay.getDate() + 1);
   }

   return days;
 }

 setMonth(event) {
   const setMonthValue = parseInt(event.target.dataset.setMonth);

   DATE.setMonth(DATE.getMonth() + setMonthValue);
   this.renderMonthName(DATE);
   this.renderDays(DATE.getMonth(), DATE.getFullYear());
 }
}

export default Calendar;
