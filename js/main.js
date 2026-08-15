document.addEventListener("DOMContentLoaded", async () => {
  // Header
  const headerContainer = document.querySelector("#header");

  if (headerContainer) {
    const response = await fetch("/components/header.html");
    headerContainer.innerHTML = await response.text();

    // Header読み込み完了後にメニュー開閉のイベントを設定
    initHeaderMenu();
  }

  // Footer
  const footer = document.querySelector("#footer");

  if (footer) {
    const response = await fetch("/components/footer.html");
    footer.innerHTML = await response.text();
  }

  // 年齢の自動計算
  initAgeCalculation();
});

function initAgeCalculation() {
  const ageElements = document.querySelectorAll("[data-birthday]");

  ageElements.forEach((el) => {
    const birthday = new Date(el.dataset.birthday);

    if (isNaN(birthday.getTime())) return;

    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();

    const hasHadBirthdayThisYear =
      today.getMonth() > birthday.getMonth() ||
      (today.getMonth() === birthday.getMonth() &&
        today.getDate() >= birthday.getDate());

    if (!hasHadBirthdayThisYear) {
      age -= 1;
    }

    el.textContent = `${age}歳`;
  });
}

function initHeaderMenu() {
  const header = document.querySelector(".header");
  const menuButton = document.querySelector(".header__menu-button");

  if (!header || !menuButton) return;

  // ボタンクリックで開閉をトグル
  menuButton.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-menu-open");
    menuButton.setAttribute("aria-expanded", isOpen);
  });

  // メニュー内のリンクをクリックしたら自動で閉じる
  const navLinks = header.querySelectorAll(".header__navigation-list a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  // Escキーで閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      header.classList.remove("is-menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}
