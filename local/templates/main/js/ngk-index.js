// Прилипающее меню
const stickyBlock = document.querySelector('.top-sticky');

window.addEventListener('scroll', function () {
  if (window.innerWidth > 1070) {
    // проверяем ширину экрана
    if (window.pageYOffset > 300) {
      stickyBlock.style.display = 'block';
    } else {
      stickyBlock.style.display = 'none';
    }
  } else {
    stickyBlock.style.display = 'none'; // скрываем блок при ширине меньше 1070
  }
});

// Прилипающее меню моб
const header = document.querySelector('.header-mob');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 0) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});

// Дропдаун у меню моб
const dropdowns = document.querySelectorAll('.popup_menu__dropdown');
const dropdownToggles = document.querySelectorAll(
  '.popup_menu__dropdown-toggle'
);

dropdownToggles.forEach(function (dropdownToggle, index) {
  dropdownToggle.addEventListener('click', function () {
    dropdowns[index].classList.toggle('open');
  });

  dropdowns[index].addEventListener('blur', function () {
    this.classList.remove('open');
  });
});

document
  .querySelectorAll('.popup_menu__dropdown-toggle')
  .forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
    });
  });

// Свайпер слайдеры
const firstscreenSlider = new Swiper('.slider-head__line', {
  navigation: {
    nextEl: '.slider-head_next',
    prevEl: '.slider-head_prev',
  },

  loop: true,
  slidesPerGroup: 1,
});

let catalogSlider = new Swiper('.catalog-home_swiper-container', {
  navigation: {
    nextEl: '.next',
    prevEl: '.prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: false,
  },
  breakpoints: {
    1069: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1071: {
      slidesPerView: 4,
    },
  },
  loop: true,
});

window.addEventListener('resize', () => {
  if (window.matchMedia('(max-width: 1069px)').matches) {
    catalogSlider.destroy(false, false);
    catalogSlider.disable();
  } else {
    catalogSlider = new Swiper('.catalog-home_swiper-container', {
      navigation: {
        nextEl: '.next',
        prevEl: '.prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: false,
      },
      breakpoints: {
        1069: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        1071: {
          slidesPerView: 4,
        },
      },
      loop: true,
    });

    catalogSlider.enable();
  }
});

if (window.matchMedia('(max-width: 1069px)').matches) {
  catalogSlider.destroy(false, false);
  catalogSlider.disable();
} else {
  catalogSlider = new Swiper('.catalog-home_swiper-container', {
    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: false,
    },
    breakpoints: {
      1069: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1071: {
        slidesPerView: 4,
      },
    },
    loop: true,
  });

  catalogSlider.enable();
}

document.addEventListener('DOMContentLoaded', () => {
  const width = window.innerWidth;
  if (width > 376) {
    const slider = new Swiper();
  }
});

const newsSlider = new Swiper('.news_swiper-container', {
  slidesPerView: 2,
  loop:
    document.querySelectorAll('.news_swiper-container .swiper-slide').length > 6
      ? true
      : false,

  navigation: {
    nextEl: '.next',
    prevEl: '.prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    1069: {
      slidesPerView: 2,
    },
    1070: {
      slidesPerView: 4,
    },
  },
});

const licenSlider = new Swiper('.licen_swiper-container', {
  navigation: {
    nextEl: '.next',
    prevEl: '.prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    1069: {
      slidesPerView: 2,
      slidesPerGroup: 1,
    },
    1070: {
      slidesPerView: 4,
    },
  },
  loop: true,
});

// Всплывающий поиск моб
const header_search_btn = document.querySelector('.header-cont_search');
const header_search = document.querySelector('.top.hidden');

header_search_btn.addEventListener('click', function (event) {
  event.preventDefault();
  header_search.classList.toggle('open');
});

document
  .querySelector('.show-all-cats')
  ?.addEventListener('click', function (e) {
    e.preventDefault();

    this.style.display = 'none';

    document
      .querySelectorAll('.slide-block__card[data-overflow="true"]')
      .forEach((item) => {
        item.classList.remove('hdm');
      });
  });
