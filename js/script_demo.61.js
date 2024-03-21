const menu = document.querySelector('.menu');
const menuSection = menu.querySelector('.menu-section');
const menuArrow = menu.querySelector('.menu-mobile-arrow');
const menuClosed = menu.querySelector('.menu-mobile-close');
const menuTrigger = document.querySelector('.menu-mobile-trigger');
const menuOverlay = document.querySelector('.overlay');
let subMenu;
menuSection.addEventListener('click', (e) => {
    if (!menu.classList.contains('active')) {
        return;
    }
    if (e.target.closest('.menu-item-has-children')) {
        const hasChildren = e.target.closest('.menu-item-has-children');
        showSubMenu(hasChildren);
    }
}
);
menuArrow.addEventListener('click', () => {
    hideSubMenu();
}
);
menuTrigger.addEventListener('click', () => {
    toggleMenu();
}
);
menuClosed.addEventListener('click', () => {
    toggleMenu();
}
);
menuOverlay.addEventListener('click', () => {
    toggleMenu();
}
);
function toggleMenu() {
    menu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
}
function showSubMenu(hasChildren) {
    subMenu = hasChildren.querySelector('.menu-subs');
    subMenu.classList.add('active');
    subMenu.style.animation = 'slideLeft 0.5s ease forwards';
    const menuTitle = hasChildren.querySelector('i').parentNode.childNodes[0].textContent;
    menu.querySelector('.menu-mobile-title').innerHTML = menuTitle;
    menu.querySelector('.menu-mobile-header').classList.add('active');
}
function hideSubMenu() {
    subMenu.style.animation = 'slideRight 0.5s ease forwards';
    setTimeout(() => {
        subMenu.classList.remove('active');
    }
        , 300);
    menu.querySelector('.menu-mobile-title').innerHTML = '';
    menu.querySelector('.menu-mobile-header').classList.remove('active');
}
window.onresize = function () {
    if (this.innerWidth > 991) {
        if (menu.classList.contains('active')) {
            toggleMenu();
        }
    }
}

function showdemo(week) {
    const p = document.querySelector('.show-classdemo');
    console.log('p', p);
    switch (week) {
        case 'w1':
            p.innerHTML = `<iframe src="./demo/w01_61/index.html" width="100%" height="100%" /></iframe>`;
            break;
        case 'w2':
            p.innerHTML = `<iframe src="./demo/w02_tictactoe.61/tictactoe.html" width="100%" height="100%" /></iframe>`;
            break;
        case 'w3-p1':
            p.innerHTML = `<iframe src="./demo/w03_basics_61/p1_61/p1_61.html" width="100%" height="100%" /></iframe>`;
            break;
        case 'w3-p2':
            p.innerHTML = `<iframe src="./demo/w03_basics_61/p2_61/p2_61.html" width="100%" height="100%" /></iframe>`;
            break;
        case 'w3-p3':
            p.innerHTML = `<iframe src="./demo/w03_basics_61/p3_61/p3_61.html" width="100%" height="100%" /></iframe>`;
            break;
        case 'w4-p4':
            p.innerHTML = `<iframe src="./demo/w04_basics_61/p4_61/p4_61.html" width="100%" height="100%" /></iframe>`;
            break;
        case 'w4-p5':
            p.innerHTML = `<iframe src="./demo/w04_basics_61/p5_61/p5_61.html" width="100%" height="100%" /></iframe>`;
            break;
        case 'w4-p6':
            p.innerHTML = `<iframe src="./demo/w04_basics_61/p6_bmi_61/p6_61.html" width="100%" height="100%" /></iframe>`;
            break;
        case 'w5':
            p.innerHTML = `<iframe src="./demo/w05_61/index.html" width="100%" height="100%" /></iframe>`;
            break;
    }
}
