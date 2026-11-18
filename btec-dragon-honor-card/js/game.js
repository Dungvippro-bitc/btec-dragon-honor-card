export function createGoalGame({ onGoal }) {
  const stage = document.getElementById('game-stage');
  const ball = document.getElementById('game-ball');
  const goal = document.getElementById('goal-structure');
  const target = document.getElementById('goal-target');
  const shootButton = document.getElementById('shoot-button');
  const origin = { x: 0.5, y: 0.76 };
  let state = 'IDLE';
  let pointerId = null;
  let start = null;
  let offset = null;
  let moved = false;
  let returnTimer = null;

  function setPosition(x, y) {
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;
  }

  function resetBall() {
    window.clearTimeout(returnTimer);
    ball.classList.add('is-returning');
    ball.style.left = `${origin.x * 100}%`;
    ball.style.top = `${origin.y * 100}%`;
    ball.style.transform = 'translate(-50%,-50%)';
    goal.classList.remove('is-near');
    returnTimer = window.setTimeout(() => ball.classList.remove('is-returning'), 440);
  }

  function ballCenter() {
    const rect = ball.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }

  function inGoal() {
    const area = target.getBoundingClientRect();
    const center = ballCenter();
    return center.x >= area.left && center.x <= area.right && center.y >= area.top && center.y <= area.bottom;
  }

  function score() {
    if (state === 'SCORING' || state === 'ANIMATING') return;
    state = 'SCORING';
    shootButton.disabled = true;
    ball.disabled = true;
    ball.classList.remove('is-dragging', 'is-returning');
    ball.classList.add('is-scored');
    goal.classList.remove('is-near');
    const area = target.getBoundingClientRect();
    const rect = stage.getBoundingClientRect();
    setPosition(area.left + area.width / 2 - rect.left, area.top + area.height / 2 - rect.top);
    ball.style.transform = 'translate(-50%,-50%) scale(.48) rotate(35deg)';
    onGoal();
    state = 'ANIMATING';
  }

  function onPointerDown(event) {
    if (state !== 'IDLE') return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerId = event.pointerId;
    state = 'DRAGGING';
    moved = false;
    const center = ballCenter();
    start = { x: event.clientX, y: event.clientY };
    offset = { x: event.clientX - center.x, y: event.clientY - center.y };
    ball.classList.remove('is-returning');
    ball.classList.add('is-dragging');
    ball.setPointerCapture(pointerId);
    event.preventDefault();
  }

  function onPointerMove(event) {
    if (state !== 'DRAGGING' || event.pointerId !== pointerId) return;
    const rect = stage.getBoundingClientRect();
    const radius = ball.offsetWidth / 2;
    const x = Math.max(radius, Math.min(rect.width - radius, event.clientX - rect.left - offset.x));
    const y = Math.max(radius, Math.min(rect.height - radius, event.clientY - rect.top - offset.y));
    moved ||= Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8;
    setPosition(x, y);
    ball.style.transform = `translate(-50%,-50%) scale(1.08) rotate(${Math.max(-18, Math.min(18, (event.clientX - start.x) / 12))}deg)`;
    goal.classList.toggle('is-near', inGoal());
  }

  function endPointer(event, cancelled = false) {
    if (state !== 'DRAGGING' || event.pointerId !== pointerId) return;
    if (ball.hasPointerCapture(pointerId)) ball.releasePointerCapture(pointerId);
    pointerId = null;
    ball.classList.remove('is-dragging');
    if (!cancelled && (!moved || inGoal())) score();
    else { state = 'IDLE'; resetBall(); }
  }

  ball.addEventListener('pointerdown', onPointerDown);
  ball.addEventListener('pointermove', onPointerMove);
  ball.addEventListener('pointerup', event => endPointer(event));
  ball.addEventListener('pointercancel', event => endPointer(event, true));
  ball.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); score(); }
  });
  shootButton.addEventListener('click', score);

  return {
    reset() {
      window.clearTimeout(returnTimer);
      if (pointerId !== null && ball.hasPointerCapture(pointerId)) ball.releasePointerCapture(pointerId);
      state = 'IDLE';
      pointerId = null;
      moved = false;
      ball.disabled = false;
      shootButton.disabled = false;
      ball.classList.remove('is-scored', 'is-returning', 'is-dragging');
      ball.style.left = `${origin.x * 100}%`;
      ball.style.top = `${origin.y * 100}%`;
      ball.style.transform = 'translate(-50%,-50%)';
      goal.classList.remove('is-near', 'is-impact');
    }
  };
}
