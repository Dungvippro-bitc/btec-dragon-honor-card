import { teachers } from './data.js';
import { createSearchController } from './search.js';
import { createGoalGame } from './game.js';
import { createAnimationController } from './animations.js';
import { renderCard, resetCard } from './card.js';

const screens = {
  WELCOME: document.getElementById('welcome-screen'),
  GOAL_CHALLENGE: document.getElementById('challenge-screen'),
  GREETING_CARD: document.getElementById('card-screen')
};
const announcement = document.getElementById('app-announcement');
const challengeTitle = document.getElementById('challenge-title');
const challengeRecipient = document.getElementById('challenge-recipient');
const challengeInstruction = document.getElementById('challenge-instruction');
const gameHint = document.getElementById('game-hint-text');
const shootButton = document.getElementById('shoot-button');
let state = 'WELCOME';
let selectedTeacher = null;

function showScreen(next) {
  Object.entries(screens).forEach(([key, screen]) => {
    screen.hidden = key !== next;
    screen.classList.toggle('is-active', key === next);
  });
  state = next;
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function loadLogos() {
  document.querySelectorAll('[data-dragon-logo]').forEach(image => {
    image.addEventListener('load', () => {
      image.hidden = false;
      image.nextElementSibling.hidden = true;
    });
    image.addEventListener('error', () => { image.hidden = true; });
    if (image.complete && image.naturalWidth > 0) {
      image.hidden = false;
      image.nextElementSibling.hidden = true;
    }
  });
}

const animations = createAnimationController();
const game = createGoalGame({
  onGoal() {
    if (state !== 'GOAL_CHALLENGE' || !selectedTeacher) return;
    animations.playGoal(() => {
      renderCard(selectedTeacher);
      showScreen('GREETING_CARD');
      announcement.textContent = selectedTeacher.language === 'en' ? `The honor card for ${selectedTeacher.name} is ready.` : `Thẻ vinh danh dành cho ${selectedTeacher.honorific} ${selectedTeacher.name} đã xuất hiện.`;
      document.getElementById('card-heading').focus({ preventScroll: true });
    }, selectedTeacher.language);
  }
});

const search = createSearchController({
  onSelect(teacher) {
    if (state !== 'WELCOME') return;
    selectedTeacher = teacher;
    const english = teacher.language === 'en';
    challengeTitle.innerHTML = english ? 'A THANK-YOU SHOT<br><em>JUST FOR YOU!</em>' : 'CÚ SÚT TRI ÂN<br><em>DÀNH CHO THẦY/CÔ!</em>';
    challengeRecipient.textContent = `${teacher.honorific} ${teacher.name}`;
    challengeInstruction.textContent = english ? 'Drag the ball into the goal to receive your gift from DRAGON!' : 'Kéo quả bóng vào khung thành để nhận món quà từ DRAGON!';
    gameHint.textContent = english ? 'DRAG INTO THE GOAL · OR TAP THE BALL TO SHOOT' : 'KÉO BÓNG VÀO GÔN · HOẶC CHẠM BÓNG ĐỂ SÚT';
    shootButton.textContent = english ? 'SHOOT ⚽' : 'SÚT BÓNG ⚽';
    document.getElementById('challenge-screen').lang = teacher.language;
    game.reset();
    showScreen('GOAL_CHALLENGE');
    announcement.textContent = english ? `Goal challenge for ${teacher.name}. Drag the ball into the goal or tap it to shoot.` : `Thử thách ghi bàn dành cho ${teacher.name}. Kéo bóng vào khung thành hoặc chạm bóng để sút.`;
    document.getElementById('game-ball').focus({ preventScroll: true });
  }
});

document.getElementById('home-button').addEventListener('click', () => {
  if (state !== 'GREETING_CARD') return;
  animations.reset();
  game.reset();
  resetCard();
  selectedTeacher = null;
  search.reset();
  challengeRecipient.textContent = '';
  document.getElementById('challenge-screen').lang = 'vi';
  showScreen('WELCOME');
  announcement.textContent = 'Đã trở về trang chủ. Mời Thầy/Cô nhập tên để bắt đầu.';
  search.input.focus({ preventScroll: true });
});

loadLogos();
if (teachers.length !== 24 || new Set(teachers.map(item => item.id)).size !== 24 || teachers.some(item => !item.greeting)) {
  console.error('Teacher data failed validation.');
}
