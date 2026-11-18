export function renderCard(teacher) {
  const card = document.getElementById('honor-card');
  const heading = document.getElementById('card-heading');
  const day = document.getElementById('card-day');
  const greeting = document.getElementById('card-greeting');
  const displayName = `${teacher.honorific} ${teacher.name}`;
  card.lang = teacher.language;
  heading.textContent = displayName;
  day.textContent = teacher.language === 'en' ? "HAPPY TEACHERS' DAY 20/11" : 'CHÚC MỪNG NGÀY NHÀ GIÁO VIỆT NAM 20/11';
  greeting.textContent = teacher.greeting;
  heading.setAttribute('tabindex', '-1');
}

export function resetCard() {
  const card = document.getElementById('honor-card');
  card.removeAttribute('lang');
  document.getElementById('card-heading').textContent = '';
  document.getElementById('card-day').textContent = "HAPPY TEACHERS' DAY 20/11";
  const greeting = document.getElementById('card-greeting');
  greeting.textContent = '';
  greeting.scrollTop = 0;
}
