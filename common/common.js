

// ヘッダー
const headerBer = document.querySelector(".header__ber");
const drawerBg = document.querySelector(".drawer__bg");
const drawerItems = document.querySelectorAll(".drawer__items > a");
const drawer = document.querySelector(".drawer");
const headerLogo = document.querySelector(".header__logo");

headerBer.addEventListener("click", toggleDrawer);
drawerBg.addEventListener("click", toggleDrawer);
drawerItems.forEach(item => {
    item.addEventListener("click", toggleDrawer);
});

function toggleDrawer() {
    // クラスの切り替え
    drawer.classList.toggle("active");
    headerLogo.classList.toggle("active");
    drawerBg.classList.toggle("active");
    if (drawer.classList.contains("active")) {
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // 対象の要素の位置を取得
        const targetElement = document.querySelector(this.getAttribute('href'));
        let targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

        // 画面幅が768px以上の時に100px下にスクロール
        if (window.innerWidth >= 768) {
            targetPosition -= 100; // 100px下にスクロール
        }

        // スムーズにスクロール
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth' // スムーズにスクロール
        });
    });
});




$(window).on('scroll', function () {
    var scrollTop = $(this).scrollTop();
    var windowHeight = $(window).height();

    // 100vh + 500pxに達した時点でopacityが1になるように計算
    var opacity = Math.min((scrollTop - windowHeight + 300) / 500, 1); // 100vh + 500pxで1に達し、それ以上は1

    // class="bg"の要素に対してopacityを設定
    $('.bg').css('opacity', opacity);
});
