// import anime from '/node_modules/animejs/lib/anime.es.js';
export const timeline = anime.timeline();

const container = document.getElementById('container');
const tick = document.querySelector('.tick');
const circle = document.querySelector('.circle');
const circles = document.querySelectorAll('.circles');
const pulse = document.querySelector('.pulse');

timeline
  .add({
    targets: circles,
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 700,
    opacity: [{ value: 1 }, { value: 0 }],
    easing: 'easeInOutSine',
    delay: (el, i) => {
      return i * 250;
    },
  })
  .add({
    targets: circle,
    direction: 'alternate',
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 700,
    easing: 'easeInOutSine',
    offset: '-=500',
  })
  .add({
    targets: tick,
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 800,
    easing: 'easeOutExpo',
    offset: '-=80',
  })
  .add({
    targets: container,
    duration: 800,
    scale: 1.05,
    easing: 'easeOutElastic',
    elasticity: 500,
    offset: '-=500',
  })
  .add({
    targets: pulse,
    opacity: [0, 1],
    easing: 'easeOutExpo',
    offset: '-=700',
  })
  .add({
    targets: pulse,
    scale: [1, 1.5],
    strokeWidth: '0',
    opacity: [1, 0],
    easing: 'easeOutExpo',
    offset: '-=1000',
  });
