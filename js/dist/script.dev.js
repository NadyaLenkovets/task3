"use strict";

// ============  табы  ============ 
var tabsNavItems = document.querySelectorAll('.tabs-nav__item');
var tabsBlocks = document.querySelectorAll('.tabs__block');
tabsNavItems.forEach(onTabClick);

function onTabClick(item) {
  item.addEventListener("click", function () {
    var currentBtn = item;
    var tabID = currentBtn.getAttribute('data-tab');
    var currentTab = document.querySelector(tabID);

    if (!currentBtn.classList.contains('active')) {
      tabsNavItems.forEach(function (item) {
        item.classList.remove('active');
      });
      tabsBlocks.forEach(function (item) {
        item.classList.remove('active');
      });
      currentBtn.classList.add('active');
      currentTab.classList.add('active');
    }
  });
} // сделать второй таб активным изначально не через html


document.querySelector('.tabs-nav__item:nth-child(2)').click(); // ============  counter  ============ 

var startButton = document.querySelector('.start');
var counterValue = document.querySelector('.counter__value');
var counterTop = counterValue.getBoundingClientRect().top;
window.addEventListener("scroll", function onScroll() {
  if (window.pageYOffset > counterTop - 3 * window.innerHeight / 4) {
    var counter = setInterval(function () {
      if (counterValue.innerHTML < 17) {
        counterValue.innerHTML = +counterValue.innerHTML + 1;
      } else if (counterValue.innerHTML == 17) {
        clearInterval(counter);
      }
    }, 300);
  }
}); // ============  попап  ============ 

var playButton = document.querySelector('.play-button');
var body = document.querySelector('body');
var popup = document.querySelector('.popup');
var popupClose = document.querySelector('.popup-close');
var videoSrc = document.querySelector('.iframe').getAttribute('src');
playButton.addEventListener("click", function (e) {
  bodyLock();
  popup.classList.add('open'); // закрывает попап

  popup.addEventListener("click", function (e) {
    if (!e.target.closest('.popup-inner') || e.target == popupClose) {
      bodyUnlock();
      this.classList.remove('open'); // чтобы воспроизведение видео прекращалось при закрытии попапа

      document.querySelector('.iframe').setAttribute('src', videoSrc);
    }
  });
});

function bodyLock() {
  // узнаем ширину правого скролла и при открытом попапе устанавливаем padding-right такого размера,
  // чтобы не дергалось при открытии попапа
  var lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');
}

function bodyUnlock() {
  body.classList.remove('lock');
  body.style.paddingRight = '0px';
} // ============  бургер-меню  ============ 


var headerBurger = document.querySelector('.header__burger');
var headerNav = document.querySelector('.header-nav');
var headerNavLinks = document.querySelectorAll('.header-nav__link');
headerBurger.addEventListener('click', function (e) {
  document.body.classList.toggle('lock');
  headerNav.classList.toggle('active');
  headerBurger.classList.toggle('active');
  console.log(111);
});
headerNavLinks.forEach(function (headerNavLink) {
  headerNavLink.addEventListener('click', onHeaderNavLinkClick);
});

function onHeaderNavLinkClick(e) {
  var headerNavLink = e.target;

  if (headerBurger.classList.contains('active')) {
    document.body.classList.remove('lock');
    headerNav.classList.remove('active');
    headerBurger.classList.remove('active');
  }
} // ============  подменю  ============ 


var isMobile = {
  Android: function Android() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function BlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function Opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function Windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
};

if (isMobile.any()) {
  body.classList.add('touch');
  var arrow = document.querySelectorAll('.menu-arrow');

  var _loop = function _loop() {
    var subMenu = arrow[i].nextElementSibling;
    var thisArrow = arrow[i];
    arrow[i].addEventListener("click", function () {
      subMenu.classList.toggle('open');
      thisArrow.classList.toggle('active');
    });
  };

  for (i = 0; i < arrow.length; i++) {
    _loop();
  }
} else {
  body.classList.add('mouse');
} // ============  поиск  ============ 


var searchButton = document.querySelector('.search');
var searchInput = document.querySelector('.search__input');
searchButton.addEventListener("click", function () {
  searchInput.classList.toggle('active');
});