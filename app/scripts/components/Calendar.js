const MONTHNAMES = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const CURRENTDATE = new Date();
// document.write("The current month is " + monthNames[d.getMonth()]);

class Calendar {
  constructor() {
    debugger;
    this.element = document.querySelector('.calendar');
    this.renderTitleDays = this.renderTitleDays.bind(this);

    this.renderTitleDays();
    this.renderMonthName();
    this.renderDays();
  }

  renderDays() {
    const days = this.getDaysInMonth(CURRENTDATE.getMonth(), CURRENTDATE.getFullYear());
    const calendarDaysElement = this.element.querySelector('.calendar-days');

    for (let i = 0; i < days[0].getDay(); i++) {
      const spanElement = document.createElement('span');
      calendarDaysElement.append(spanElement);
    }

    days.map(day => {
      const spanElement = document.createElement('span');
      spanElement.innerHTML = day.getDate();

      if (day.getDate() === CURRENTDATE.getDate()) {
        spanElement.classList.add('current-day');
      }

      calendarDaysElement.append(spanElement);
    });
  }

  renderTitleDays() {
    const calendarDaysElement = this.element.querySelector('.calendar-days');

    WEEKDAYS.map(day => {
      const spanElement = document.createElement('span');
      spanElement.innerHTML = day;
      calendarDaysElement.append(spanElement);
    });
  }

  renderMonthName() {
    const currentMonthElement = this.element.querySelector('#current-month');
    currentMonthElement.innerText = `${MONTHNAMES[CURRENTDATE.getMonth()]}, ${CURRENTDATE.getFullYear()}`;
  }

 getDaysInMonth(month, year) {
   const date = new Date(year, month, 1);
   const days = [];

   while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
   }

   return days;
 }
}

export default Calendar;
