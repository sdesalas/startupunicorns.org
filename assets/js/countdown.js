


const targetDate = new Date("2023-09-30T18:00:00.000Z");
class CountdownTimer {
  // setup timer values
  constructor({ selector, targetDate, backgroundColor = null, foregroundColor = null }) {
      this.selector = selector;
      this.targetDate = targetDate;
      this.backgroundColor = backgroundColor;
      this.foregroundColor = foregroundColor;

      // grab divs on frontend using supplied selector ID
      this.refs = {
          days: document.querySelector(`${this.selector} [data-value="days"]`),
          hours: document.querySelector(`${this.selector} [data-value="hours"]`),
          mins: document.querySelector(`${this.selector} [data-value="minutes"]`),
          secs: document.querySelector(`${this.selector} [data-value="seconds"]`),
      };
  }

  getTimeRemaining(endtime) {
      const total = Date.parse(endtime) - Date.parse(new Date());
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((total / 1000 / 60) % 60);
      const secs = Math.floor((total / 1000) % 60);
      return {
          total,
          days,
          hours,
          mins,
          secs,
      };
  }

  updateTimer({ days, hours, mins, secs }) {
      this.refs.days.textContent = days;
      this.refs.hours.textContent = hours;
      this.refs.mins.textContent = mins;
      this.refs.secs.textContent = secs;
  }

  updateColors() {
      if (this.backgroundColor != null) {
          this.refs.days.style.background = this.backgroundColor;
          this.refs.hours.style.background = this.backgroundColor;
          this.refs.mins.style.background = this.backgroundColor;
          this.refs.secs.style.background = this.backgroundColor;
      }

      if (this.foregroundColor != null) {
          this.refs.days.style.color = this.foregroundColor;
          this.refs.hours.style.color = this.foregroundColor;
          this.refs.mins.style.color = this.foregroundColor;
          this.refs.secs.style.color = this.foregroundColor;
      }
  }

  start() {
      setInterval(() => {
        const t = this.getTimeRemaining(this.targetDate);
        this.updateTimer(t);
    }, 1000);
      const t = this.getTimeRemaining(this.targetDate);
      this.updateTimer(t);
      this.updateColors();
      return this;
  }
}

const timer = new CountdownTimer({
  selector: "#clock1",
  targetDate,
}).start(); 

const timer2 = new CountdownTimer({
  selector: "#clock2",
  targetDate,
}).start(); 
