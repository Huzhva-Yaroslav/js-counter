function didgitCounterInits(didgitCounterItems) {
  didgitCounterItems.forEach((didgitCounter) => {
    didgitCounterAnimation(didgitCounter);
  });
}
function didgitCounterAnimation(didgitCounter) {
  let startTimestamp = null;
  let duration = parseInt(didgitCounter.dataset.digitsCounter)
    ? parseInt(didgitCounter.dataset.digitsCounter)
    : 5000;
   let startValue = parseInt(didgitCounter.innerHTML);
   let startPosition = 0;
   const step = (timestamp) => { // функция шага - и эти шаги будут формировать анимацию с помощью requestAnimationFrame
                
    if (!startTimestamp) startTimestamp = timestamp // если startTimestamp еще пуста, то присваиваем ей значение timestamp
    // расчитываем прогресс анимации
    // console.log(startTimestamp)
    const progress = Math.min((timestamp - startTimestamp) / duration, 1); // анимация в наших счетчиках закончится одновременно
    didgitCounter.innerHTML = Math.floor(progress * (startPosition + startValue))  // рассчитываем прогресс от суммы (progress идет от 0 до 1)
    if (progress < 1) { // все это происходит, когда progress < 1
        window.requestAnimationFrame(step)
    }
}
window.requestAnimationFrame(step)
}

const options = {
  threshold: 0.3, // какой процент объекта от его высоты должен появится на экране
};
const obServer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const targetElement = entry.target;
      const didgitsCounterItems = targetElement.querySelectorAll(
        '[data-digits-counter]'
      );
      if (didgitsCounterItems.length) {
        didgitCounterInits(didgitsCounterItems);
      }
    }
  });
}, options);

const sections = document.querySelectorAll('.page__section');
if (sections.length) {
  sections.forEach((section) => {
    obServer.observe(section);
  });
}
