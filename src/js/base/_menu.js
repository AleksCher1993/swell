export const _menu = () => {
  // ----------------------------Проверка на мобильность---------------
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    IOS: function () {
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
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.IOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };
  if (isMobile.any()) {
    document.body.classList.add("_touch");
    let menuArrows = document.querySelectorAll(".menu_arrow");
    if (menuArrows.length > 0) {
      menuArrows.forEach((menuArrow) => {
        menuArrow.addEventListener("click", () => {
          menuArrow.parentElement.classList.toggle("_active");
        });
      });
    }
  } else {
    document.body.classList.add("_pc");
  }
  // ----------------------------------Плавный скролинг----------------------------------
  // прокрутка при клике
  // для начала установите data(Пример: data-goto=".page__section_1") атрибуты для кнопок для прокрутки страницы
  // .page__section_1 - раздел контента

  const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
  const iconMenu = document.querySelector(".menu__icon");
  const menuBody = document.querySelector(".menu__body");
  if (menuLinks.length > 0) {
    menuLinks.forEach((menuLink) => {
      menuLink.addEventListener("click", onMenuLinkClick);
    });
    function onMenuLinkClick(e) {
      const menuLink = e.target;
      if (
        menuLink.dataset.goto &&
        document.querySelector(menuLink.dataset.goto)
      ) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue =
          gotoBlock.getBoundingClientRect().top +
          pageYOffset -
          document.querySelector("header").offsetHeight; //высщта контейнера навигации

        if (iconMenu.classList.contains("_active")) {
          document.body.classList.remove("_lock");
          iconMenu.classList.remove("_active");
          menuBody.classList.remove("_active");
        }
        window.scrollTo({
          top: gotoBlockValue,
          behavior: "smooth",
        });
      }

      e.preventDefault();
    }
  }
  // ----------------------------Ьургер----------------------

  if (iconMenu) {
    iconMenu.addEventListener("click", () => {
      document.body.classList.toggle("_lock");
      iconMenu.classList.toggle("_active");
      menuBody.classList.toggle("_active");
    });
  }
};
