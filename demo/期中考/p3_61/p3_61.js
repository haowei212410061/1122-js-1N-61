const menu1 = document.querySelectorAll('menu1');
function changeImage(index) {
  const player = document.querySelector('#player');
  console.log('player', player);
  switch (index) {
    case 1:
      player.innerHTML = `<div id="player">
    <img src="./images/TKU1.png" style="width: 100%; height: auto" />
  </div>`;
      break;
    case 2:
      player.innerHTML = `<div id="player">
      <img src="./images/TKU2.png" style="width: 100%; height: auto" />
    </div>`;
      break;

    case 3:
      player.innerHTML = `
    <div id="player">
      <img src="./images/TKU3.png" style="width: 100%; height: auto" />
    </div>`;
      break;

    case 4:
      player.innerHTML = `<div id="player">
      <img src="./images/TKU4.png" style="width: 100%; height: auto" />
    </div>`;
      break;
    case 5:
      player.innerHTML = `<div id="player">
      <img src="./images/TKU5.png" style="width: 100%; height: auto" />
    </div>`;
  }
}

function showTKU60() {
  const p = document.querySelector('#menu1');
  p.innerHTML = `
  <ul>
    <li onclick="changeImage(1)">
      <a href="#">淡江大戲 1</a>
    </li>
    <li class="item item-1 hidden" onclick="changeImage(2)">
      <a href="#">淡江大戲 2</a>
    </li>
    <li  class="item item-2 hidden" onclick="changeImage(3)">
      <a href="#">淡江大戲 3</a>
    </li>
    <li  class="item item-3 hidden" onclick="changeImage(4)">
      <a href="#">淡江大戲 4</a>
    </li>
    <li  class="item item-4 hidden" onclick="changeImage(5)">
      <a href="#">淡江大戲 5</a>
    </li>
  </ul>
`;
}

function clearMenu1All() {
  const p = document.querySelector('#menu1');
  p.innerHTML = '';
}
