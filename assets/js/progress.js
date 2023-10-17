var el = window.el = window.el || {
  progress: document.getElementById('progress'),
  progressbar: document.getElementById('progressbar'),
  progresspercent: document.getElementById('progresspercent'),
  progresscount: document.getElementById('progresscount'),
  progresstarget: document.getElementById('progresstarget'),
  progresstimeago: document.getElementById('progresstimeago'),
};
// Progress!
(function () {
  if (!el.progress) return;
  const target = 1000;
  (async () => {
    const res = await fetch('https://startupunicorns-api.deno.dev/stats');
    const stats = await res.json();
    const count = stats && stats.member_count;
    const sub_date = stats && stats.last_sub_date;
    if (count) {
      let percent = Math.ceil(count/target*100);
      if (percent < 5) percent = 5;
      console.log('We have a percent', percent);
      el.progresscount.innerText = count;
      el.progresstarget.innerText = target;
      el.progresspercent.style.width = `${percent}%`;
      el.progress.classList.toggle('displayed');
      el.progresstimeago.innerText = timeago().format(sub_date);
    }
  })();
})();