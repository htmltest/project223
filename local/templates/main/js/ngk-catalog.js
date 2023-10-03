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

// Дропдаун у бренда
const dropdownsBrand = document.querySelectorAll('.brands__dropdown');
const dropdownBrandToggles = document.querySelectorAll(
  '.brands__dropdown-toggle'
);

dropdownBrandToggles.forEach(function (dropdownToggle, index) {
  dropdownToggle.addEventListener('click', function () {
    dropdownsBrand[index].classList.toggle('open');
  });

  dropdownsBrand[index].addEventListener('blur', function () {
    this.classList.remove('open');
  });
});

document.querySelectorAll('.brands__dropdown-toggle').forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();
  });
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

function sortMob() {
  var optionValue = document.getElementById('sort-mob').value;
  console.log(optionValue);
  window.location.href = optionValue;
}

// Табы на странице товара
function openTab(evt, tabName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove('active');
  }
  tablinks = document.querySelectorAll('.tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove('active');
  }
  document.getElementById(tabName).classList.add('active');
  evt.currentTarget.classList.add('active');
}

// Слайдер Просмотренные товары

const viewSlider = new Swiper('.view_swiper-container', {
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
  loop:
    document.querySelectorAll('.view_swiper-container .swiper-slide').length > 6
      ? true
      : false,
});

$(function () {
  function refreshBasketCount(){
    $.ajax({
      url: '/local/ajax/getBasketCount.php',
      method: 'post',
      success: function (data) {
        if(data > 0){
          //
          if($('.basketCountPos').length){
            $('.basketCountPos').text(data);
          }
          else{
            $('a.basket').append('<span class="basketCountPos">'+data+'</span>');           
          }
          //
          if($('.basketCountPosMob').length){
            $('.basketCountPosMob').text(data);
          }
          else{
            $('a.basketMob').appendTo('<span class="basketCountPosMob">'+data+'</span>');           
          }
          //
        }
        else{
          $('.basketCountPos').remove();
          $('.basketCountPosMob').remove();
        }
      },
    });
  }
  $(document).on('click', '.js-addToCart', function (e) {
    e.preventDefault();
    url = $(this).data('url');
    this_button = $(this);
    $.ajax({
      url: url,
      method: 'get',
      dataType: 'html',
      data: {},
      success: function (data) {
        this_button.removeClass('js-addToCart');
        //this_button.addClass("js-empty");
        this_button.addClass('successButton');
        this_button.text('В корзине');
        refreshBasketCount();
      },
    });
  });

  $(document).on('click', '.js-addToCartDetail', function (e) {
    e.preventDefault();
    id = $(this).data('id');
    quantity = $('#qty').val();
    this_button = $(this);
    $.ajax({
      url: '/local/ajax/basket.php',
      method: 'post',
      dataType: 'json',
      data: { id: id, quantity: quantity, action: 'add2basket' },
      success: function (data) {
        this_button.removeClass('js-addToCartDetail');
        this_button.addClass('js-goToCart');
        this_button.addClass('successButtonDetail');
        this_button.text('В корзине');
        refreshBasketCount();
      },
    });
  });

  $(document).on('click', '.js-empty', function (e) {
    e.preventDefault();
  });

  $(document).on('click', '.js-goToCart', function (e) {
    location.href = '/basket/';
  });
});

var thumbs = new Swiper('.product-thumbs', {
  spaceBetween: 10,
  slidesPerView: 'auto',
  direction: 'horizontal',
  watchSlidesProgress: true,
  breakpoints: {
    1070: {
      direction: 'vertical',
      slidesPerView: 5,
    },
  },
});
var photos = new Swiper('.product-photos', {
  spaceBetween: 10,
  slidesPerView: 1,
  thumbs: {
    swiper: thumbs,
  },
});
