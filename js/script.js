// ============  табы  ============ 

const tabsNavItems = document.querySelectorAll('.tabs-nav__item');
const tabsBlocks = document.querySelectorAll('.tabs__block');

tabsNavItems.forEach(onTabClick);

function onTabClick(item) {
   item.addEventListener("click", function() {
      let currentBtn = item;
      let tabID = currentBtn.getAttribute('data-tab');
      let currentTab = document.querySelector(tabID);

      if (!currentBtn.classList.contains('active')) {
         tabsNavItems.forEach(function(item) {
            item.classList.remove('active');
         });
   
         tabsBlocks.forEach(function(item) {
            item.classList.remove('active');
         });
   
         currentBtn.classList.add('active');
         currentTab.classList.add('active');
      }
   });
}

// сделать второй таб активным изначально не через html
document.querySelector('.tabs-nav__item:nth-child(2)').click();


// ============  counter  ============ 

const startButton = document.querySelector('.start');
let counterValue = document.querySelector('.counter__value');
let counterTop = counterValue.getBoundingClientRect().top;

window.addEventListener("scroll", function onScroll() {
   if (window.pageYOffset > counterTop - (3 * window.innerHeight / 4)) {

      let counter = setInterval(function() {
   
         if (counterValue.innerHTML < 17) {
            counterValue.innerHTML = +counterValue.innerHTML + 1;
         } else if (counterValue.innerHTML == 17) {
            clearInterval(counter);
         }
      }, 300);
   }
})


// ============  попап  ============ 

const playButton = document.querySelector('.play-button');
const body = document.querySelector('body');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup-close');
let videoSrc = document.querySelector('.iframe').getAttribute('src');

playButton.addEventListener("click", function(e) {
   bodyLock();
   popup.classList.add('open');

   // закрывает попап
   popup.addEventListener("click", function(e) {
      if (!e.target.closest('.popup-inner') || e.target == popupClose) {
         bodyUnlock();
         this.classList.remove('open');

         // чтобы воспроизведение видео прекращалось при закрытии попапа
         document.querySelector('.iframe').setAttribute('src', videoSrc);
      }
   })
})

function bodyLock() {
   // узнаем ширину правого скролла и при открытом попапе устанавливаем padding-right такого размера,
   // чтобы не дергалось при открытии попапа
   const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
   body.style.paddingRight = lockPaddingValue;
   body.classList.add('lock');
}

function bodyUnlock() {
   body.classList.remove('lock');
   body.style.paddingRight = '0px';
}


// ============  бургер-меню  ============ 

const headerBurger = document.querySelector('.header__burger');
const headerNav = document.querySelector('.header-nav');
const headerNavLinks = document.querySelectorAll('.header-nav__link');

headerBurger.addEventListener('click', function(e) {
   document.body.classList.toggle('lock');
   headerNav.classList.toggle('active');
   headerBurger.classList.toggle('active');
   console.log(111);
})

headerNavLinks.forEach(headerNavLink => {
   headerNavLink.addEventListener('click', onHeaderNavLinkClick);
})

function onHeaderNavLinkClick(e) {
   const headerNavLink = e.target;
   if (headerBurger.classList.contains('active')) {
      document.body.classList.remove('lock');
      headerNav.classList.remove('active');
      headerBurger.classList.remove('active');
   }
}


// ============  подменю  ============ 

let isMobile = {
   Android: function () {
       return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
       return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
       return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
       return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
       return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
       return (
               isMobile.Android()
               || isMobile.BlackBerry()
               || isMobile.iOS()
               || isMobile.Opera()
               || isMobile.Windows()
               );
   }
};

if (isMobile.any()) {
   body.classList.add('touch');
   let arrow = document.querySelectorAll('.menu-arrow');
   for (i = 0; i < arrow.length; i++) {
      let subMenu = arrow[i].nextElementSibling;
      let thisArrow = arrow[i];

      arrow[i].addEventListener("click", function() {
         subMenu.classList.toggle('open');
         thisArrow.classList.toggle('active');
      })
   }
} else {
   body.classList.add('mouse');
}



// ============  поиск  ============ 

const searchButton = document.querySelector('.search');
const searchInput = document.querySelector('.search__input');

searchButton.addEventListener("click", function() {
   searchInput.classList.toggle('active');
});