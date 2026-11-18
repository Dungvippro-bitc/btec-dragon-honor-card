export function createAnimationController() {
  const goal = document.getElementById('goal-structure');
  const celebration = document.getElementById('goal-celebration');
  const announcement = document.getElementById('app-announcement');
  let running = false;
  let generation = 0;

  async function wait(ms) { return new Promise(resolve => window.setTimeout(resolve, ms)); }

  return {
    async playGoal(onReveal, language = 'vi') {
      if (running) return;
      running = true;
      const current = ++generation;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      announcement.textContent = language === 'en' ? 'GOAL! Your honor card is appearing.' : 'GOAL! Đã ghi bàn. Thẻ vinh danh đang xuất hiện.';
      goal.classList.add('is-impact');
      await wait(reduced ? 20 : 320);
      if (current !== generation) return;
      celebration.classList.add('is-visible');
      celebration.setAttribute('aria-hidden', 'false');
      await wait(reduced ? 30 : 1350);
      if (current !== generation) return;
      celebration.classList.remove('is-visible');
      celebration.setAttribute('aria-hidden', 'true');
      running = false;
      onReveal();
    },
    reset() {
      generation++;
      running = false;
      goal.classList.remove('is-impact', 'is-near');
      celebration.classList.remove('is-visible');
      celebration.setAttribute('aria-hidden', 'true');
    }
  };
}
