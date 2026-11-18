import { teachers } from './data.js';

export function normalizeName(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[Đđ]/g, 'd').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
}

function editDistance(a, b, limit = 2) {
  if (Math.abs(a.length - b.length) > limit) return limit + 1;
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    previous = current;
  }
  return previous[b.length];
}

function matchScore(query, teacher) {
  const name = normalizeName(teacher.name);
  const words = name.split(' ');
  if (name === query) return 1000;
  if (name.startsWith(query)) return 800 - (name.length - query.length);
  if (name.includes(query)) return 700 - name.indexOf(query);
  if (words.some(word => word.startsWith(query))) return 600 - words.findIndex(word => word.startsWith(query));
  const terms = query.split(' ');
  if (terms.every(term => words.some(word => word.startsWith(term)))) return 500;
  if (query.length >= 4) {
    const wholeDistance = editDistance(query, name);
    if (wholeDistance <= 2) return 400 - wholeDistance * 20;
    // One or two mistyped characters in a token are still useful suggestions.
    const allTermsClose = terms.every(term => words.some(word => editDistance(term, word) <= (term.length >= 5 ? 2 : 1)));
    if (allTermsClose) return 300;
  }
  return -1;
}

export function findTeachers(value) {
  const query = normalizeName(value);
  if (!query) return [];
  return teachers.map(teacher => ({ teacher, score: matchScore(query, teacher) }))
    .filter(result => result.score >= 0)
    .sort((a, b) => b.score - a.score || a.teacher.name.localeCompare(b.teacher.name, 'vi'))
    .map(result => result.teacher);
}

export function createSearchController({ onSelect }) {
  const input = document.getElementById('teacher-search');
  const list = document.getElementById('search-results');
  const message = document.getElementById('search-message');
  let results = [];
  let activeIndex = -1;

  function setMessage(value, error = false) {
    message.textContent = value;
    message.classList.toggle('is-error', error);
  }

  function closeResults() {
    list.hidden = true;
    list.replaceChildren();
    list.classList.remove('is-upward');
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  }

  function highlight(index) {
    activeIndex = index;
    list.querySelectorAll('button').forEach((button, itemIndex) => {
      const selected = itemIndex === index;
      button.classList.toggle('is-active', selected);
      button.parentElement.setAttribute('aria-selected', String(selected));
      if (selected) button.scrollIntoView({ block: 'nearest' });
    });
    if (index >= 0) input.setAttribute('aria-activedescendant', `search-option-${index}`);
    else input.removeAttribute('aria-activedescendant');
  }

  function render() {
    const value = input.value;
    results = findTeachers(value);
    activeIndex = -1;
    closeResults();
    if (!normalizeName(value)) {
      setMessage('Gõ tên để bắt đầu hành trình tri ân.');
      return;
    }
    if (results.length === 0) {
      setMessage('DRAGON chưa tìm thấy tên phù hợp. Thầy/Cô thử nhập lại nhé!', true);
      return;
    }
    setMessage(results.length === 1 ? 'Đã tìm thấy tên phù hợp. Nhấn Enter để tiếp tục.' : 'Chọn đúng tên Thầy/Cô trong danh sách gợi ý.');
    results.slice(0, 8).forEach((teacher, index) => {
      const item = document.createElement('li');
      item.id = `search-option-${index}`;
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', 'false');
      const button = document.createElement('button');
      button.type = 'button';
      const name = document.createElement('span');
      name.textContent = `${teacher.honorific} ${teacher.name}`;
      button.append(name);
      button.addEventListener('pointerdown', event => event.preventDefault());
      button.addEventListener('click', () => choose(teacher));
      item.append(button);
      list.append(item);
    });
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    // Keep the dropdown inside the desktop viewport; mobile uses normal flow.
    const footerTop = document.querySelector('.site-footer').getBoundingClientRect().top;
    list.classList.toggle('is-upward', list.getBoundingClientRect().bottom > footerTop - 8);
  }

  function choose(teacher) {
    closeResults();
    onSelect(teacher);
  }

  input.addEventListener('input', render);
  input.addEventListener('keydown', event => {
    if (event.key === 'Escape') { closeResults(); return; }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (!results.length) return;
      event.preventDefault();
      const shown = Math.min(results.length, 8);
      highlight((activeIndex + (event.key === 'ArrowDown' ? 1 : -1) + shown) % shown);
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      const exact = results.find(teacher => normalizeName(teacher.name) === normalizeName(input.value));
      if (activeIndex >= 0 && !list.hidden) choose(results[activeIndex]);
      else if (exact) choose(exact);
      else if (results.length === 1) choose(results[0]);
      else if (results.length > 1) setMessage('Có nhiều tên phù hợp. Thầy/Cô vui lòng chọn đúng tên trong danh sách.', true);
      else setMessage('DRAGON chưa tìm thấy tên phù hợp. Thầy/Cô thử nhập lại nhé!', true);
    }
  });
  document.addEventListener('pointerdown', event => {
    if (!input.contains(event.target) && !list.contains(event.target)) closeResults();
  });
  return {
    input,
    render,
    reset() {
      input.value = '';
      results = [];
      activeIndex = -1;
      closeResults();
      setMessage('Gõ tên để bắt đầu hành trình tri ân.');
    }
  };
}
