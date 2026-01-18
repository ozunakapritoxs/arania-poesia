const spider = document.getElementById("spider");

const SCALE = 3;
const SIZE = 64; // 32px * scale



/* POSICIÓN */
let x = Math.random() * window.innerWidth;
let y = Math.random() * window.innerHeight;

/* DIRECCIÓN */
let dirX = -1; // -1 izquierda, 1 derecha, 0 quieto
let dirY = 0;  // -1 arriba, 1 abajo, 0 quieto

let speed = 1.8;

/* ESTADOS */
let currentState = "walk";
let isPlayingEvent = false;


/* INICIO */
spider.classList.add("walk");
setRandomDirection();
updateTransform();
updatePosition();

loop();

/* === LOOP PRINCIPAL === */
function loop() {
  if (currentState === "walk" || currentState === "eventA") {
    x += dirX * speed;
    y += dirY * speed;

    handleEdges();
    updatePosition();
  }

  requestAnimationFrame(loop);
}

/* === MOVIMIENTO Y BORDES === */

function handleEdges() {
  const w = window.innerWidth;
  const h = window.innerHeight;

  if (x < -SIZE || x > w || y < -SIZE || y > h) {
    teleport();
  }
}

function teleport() {
  const side = Math.floor(Math.random() * 4);

  if (side === 0) { // izquierda
    x = -SIZE;
    y = Math.random() * window.innerHeight;
    dirX = 1; dirY = 0;
  } else if (side === 1) { // derecha
    x = window.innerWidth;
    y = Math.random() * window.innerHeight;
    dirX = -1; dirY = 0;
  } else if (side === 2) { // arriba
  x = Math.random() * window.innerWidth;
  y = -SIZE;
  dirX = 0;
  dirY = 1;
}
else { // abajo
  x = Math.random() * window.innerWidth;
  y = window.innerHeight;
  dirX = 0;
  dirY = -1;
}

  updateTransform();
}

/* === ORIENTACIÓN === */

function updateTransform() {
  let transform = "";

  if (dirX === -1) {
    // izquierda
    transform = `scale(${SCALE}, ${SCALE})`;
  }
  else if (dirX === 1) {
    // derecha
    transform = `scale(-${SCALE}, ${SCALE})`;
  }
  else if (dirY === 1) {
    // de arriba hacia abajo
    transform = `rotate(-90deg) scale(${SCALE}, -${SCALE})`;
  }
  else if (dirY === -1) {
    // de abajo hacia arriba
    transform = `rotate(90deg) scale(${SCALE}, -${SCALE})`;
  }

  spider.style.transform = transform;
}



/* === POSICIÓN === */

function updatePosition() {
  spider.style.left = x + "px";
  spider.style.top = y + "px";
}

/* === DIRECCIÓN INICIAL === */

function setRandomDirection() {
  teleport();
}

/* === EVENTOS CON EL MOUSE === */

spider.addEventListener("mouseenter", triggerRandomEvent);

function triggerRandomEvent() {
  if (isPlayingEvent) return;

  isPlayingEvent = true;
  spider.classList.remove("walk");

  const eventType = Math.random() < 0.5 ? "eventA" : "eventB";
  currentState = eventType;
  spider.classList.add(eventType);

  setTimeout(() => {
    spider.classList.remove(eventType);
    spider.classList.add("walk");
    currentState = "walk";
    isPlayingEvent = false;
  }, 900);
}
