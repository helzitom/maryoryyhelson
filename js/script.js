// 21 de septiembre de 2026 (el mes va de 0 a 11, por eso septiembre = 8)
const INICIO = new Date(2026, 8, 21, 0, 0, 0);

// Tus recuerdos. tipo: "foto" o "video"
const RECUERDOS = [
  {
    tipo: "foto",
    src: "img/1.JPEG",
    fecha: " 13 agos",
    titulo: "First Day",
    texto: "El día que conocí a mi papita;3, el mejor día de mi vida uwu",
  },
  {
    tipo: "foto",
    src: "img/22.JPEG",
    fecha: "no recuerdo...",
    titulo: "Papita mmirando uwu",
    texto:
      "Ola papita vonita porke miras a otro ladito ke eh jeje papita te amo uwu",
  },
  {
    tipo: "video",
    src: "img/2.MP4",
    fecha: "2 sep",
    titulo: "Tu y yo en videito uwu",
    texto: "Éramos rigby y mordecai, pero ahora somos más que eso uwu",
  },
  {
    tipo: "foto",
    src: "img/3.JPEG",
    poster: "img/2.jpg",
    fecha: "no recuerdo :'v",
    titulo: "Tu y yo en mi casita",
    texto: "Tomándonos fotito yo con mi pijamita y tu toda preciosa uwu",
  },
  {
    tipo: "foto",
    src: "img/4.JPEG",
    fecha: "7 sep",
    titulo: "Cuando nos tomamos foto de nuestros outfits",
    texto:
      "Siempre viéndonos preciosos y siendo la envidia de todos los demás uwu",
  },
  {
    tipo: "foto",
    src: "img/6.JPEG",
    fecha: "7 oct",
    titulo: "Pre BTS uwuwu",
    texto: "Besito en el parquesito antes de oir bts uwuwu",
  },
  {
    tipo: "foto",
    src: "img/5.JPEG",
    fecha: "7 oct",
    titulo: "Post BTS uwuwu",
    texto: "Besito en tu manito luego de oir a tu grupo favorito de Kpop:3",
  },
  {
    tipo: "foto",
    src: "img/com.JPEG",
    fecha: "7 oct",
    titulo: "Pre BTS uwuwu",
    texto:
      "MI papita comiendo su cuchareable de chocolate con fresa (con todo y tallo) U n U",
  },
  {
    tipo: "foto",
    src: "img/7.jpg",
    fecha: "17 oct",
    titulo: "Post Berilio",
    texto: "Tu y yo en el metropolitano luego de oir Dimelo en Live uwuwuwuwu",
  },
];

// Emojis flotantes (Pompompurin, Shooky, BTS ★)
const EMOJIS = ["🍮", "⭐", "🧡", "🔥", "🍯", "✨", "🌅"];

/* ===== 2) LÓGICA (no necesitas tocar) ===== */

const $ = (s) => document.querySelector(s);

// Portada
$("#abrir").addEventListener("click", () => {
  $("#portada").classList.add("fuera");
  $("#contenido").hidden = false;
  setTimeout(() => $("#portada").remove(), 800);
});

// Contador
function tick() {
  const d = Math.max(0, Date.now() - INICIO.getTime());
  $("#dias").textContent = Math.floor(d / 864e5);
  $("#horas").textContent = Math.floor(d / 36e5) % 24;
  $("#mins").textContent = Math.floor(d / 6e4) % 60;
  $("#segs").textContent = Math.floor(d / 1e3) % 60;
}
tick();
setInterval(tick, 1000);

// Álbum
const album = $("#album");
RECUERDOS.forEach((r, i) => {
  const card = document.createElement("article");
  card.className = "tarjeta";
  card.dataset.tipo = r.tipo;
  card.style.setProperty(
    "--giro",
    (i % 2 ? 1 : -1) * (0.6 + (i % 3) * 0.4) + "deg",
  );

  let media;
  if (r.tipo === "video") {
    media = document.createElement("video");
    media.src = r.src;
    if (r.poster) media.poster = r.poster;
    media.controls = true;
    media.playsInline = true;
    media.preload = "metadata";
  } else {
    media = document.createElement("img");
    media.src = r.src;
    media.alt = r.titulo;
    media.loading = "lazy";
    media.addEventListener("click", () => abrirLB(r));
  }
  media.className = "media";

  const info = document.createElement("div");
  info.className = "info";
  info.innerHTML = `<span class="fecha">${r.fecha}</span><h3>${r.titulo}</h3><p>${r.texto}</p>`;

  card.append(media, info);
  album.appendChild(card);
});

// Aparecer al hacer scroll
const io = new IntersectionObserver(
  (es) => {
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".tarjeta").forEach((c) => io.observe(c));

// Lightbox
function abrirLB(r) {
  $("#lb-img").src = r.src;
  $("#lb-txt").textContent = r.titulo + " · " + r.fecha;
  $("#lightbox").hidden = false;
}
$("#cerrar").addEventListener("click", () => ($("#lightbox").hidden = true));
$("#lightbox").addEventListener("click", (e) => {
  if (e.target.id === "lightbox") e.target.hidden = true;
});

// Emojis flotantes
const cont = $("#flotantes");
for (let i = 0; i < 16; i++) {
  const s = document.createElement("span");
  s.textContent = EMOJIS[i % EMOJIS.length];
  s.style.left = Math.random() * 100 + "%";
  s.style.fontSize = 18 + Math.random() * 26 + "px";
  s.style.animationDuration = 12 + Math.random() * 14 + "s";
  s.style.animationDelay = -Math.random() * 20 + "s";
  cont.appendChild(s);
}

/* ===== MENÚ HAMBURGUESA ===== */
const burger = $("#burger"),
  menu = $("#menu"),
  velo = $("#velo");

function menuToggle(abrir) {
  burger.classList.toggle("abierto", abrir);
  menu.classList.toggle("abierto", abrir);
  velo.classList.toggle("on", abrir);
  burger.setAttribute("aria-expanded", abrir);
  document.body.style.overflow = abrir ? "hidden" : "";
}
burger.addEventListener("click", () =>
  menuToggle(!menu.classList.contains("abierto")),
);
velo.addEventListener("click", () => menuToggle(false));
menu
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", () => menuToggle(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    menuToggle(false);
    $("#lightbox").hidden = true;
  }
});

// Marca la sección actual en el menú
const links = [...menu.querySelectorAll("a")];
const ioMenu = new IntersectionObserver(
  (es) => {
    es.forEach((e) => {
      if (e.isIntersecting)
        links.forEach((l) =>
          l.classList.toggle(
            "activo",
            l.getAttribute("href") === "#" + e.target.id,
          ),
        );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" },
);
["inicio", "recuerdos", "carta"].forEach((id) =>
  ioMenu.observe(document.getElementById(id)),
);

/* ===== FILTROS ===== */
document.querySelectorAll(".chip").forEach((ch) =>
  ch.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("on"));
    ch.classList.add("on");
    const f = ch.dataset.f;
    document.querySelectorAll(".tarjeta").forEach((t) => {
      t.style.display = f === "todos" || t.dataset.tipo === f ? "" : "none";
    });
  }),
);

/* ===== BOTÓN SUBIR ===== */
const arriba = $("#arriba");
addEventListener(
  "scroll",
  () => arriba.classList.toggle("ver", scrollY > 500),
  { passive: true },
);
arriba.addEventListener("click", () =>
  scrollTo({ top: 0, behavior: "smooth" }),
);

/* ===== MÚSICA ===== */
const audio = $("#musica"),
  bm = $("#btn-musica");
bm.addEventListener("click", () => {
  if (audio.paused) {
    audio
      .play()
      .then(() => (bm.textContent = "🎵 Música: encendida"))
      .catch(() => (bm.textContent = "🎵 Falta img/cancion.mp3"));
  } else {
    audio.pause();
    bm.textContent = "🎵 Música: apagada";
  }
});

/* ===== DOMINGO DE NOVIOS (máquina de cápsulas) ===== */

// Disponible desde esta fecha (mes 9 = octubre) y luego 1 giro por semana
const DESBLOQUEO = new Date(2026, 9, 21, 0, 0, 0);
const ESPERA = 7 * 24 * 60 * 60 * 1000;

// Íconos dibujados en SVG (usan los colores de tu paleta)
const ICONOS = {
  picnic: `
    <path class="n" d="M20 24C20 6 44 6 44 24"/>
    <path class="a" d="M10 26h44l-5 27a4 4 0 0 1-4 3H19a4 4 0 0 1-4-3z"/>
    <rect class="c" x="8" y="22" width="48" height="9" rx="3"/>
    <path class="n" d="M27 31v25M37 31v25M16 42h32"/>`,
  museo: `
    <path class="c" d="M8 24L32 8l24 16z"/>
    <circle class="w" cx="32" cy="18" r="2.6"/>
    <rect class="w" x="10" y="24" width="44" height="5" rx="1.5"/>
    <path class="a" d="M17 29h6v20h-6zM29 29h6v20h-6zM41 29h6v20h-6z"/>
    <rect class="o" x="9" y="49" width="46" height="7" rx="2"/>`,
  cupcake: `
    <path class="w" d="M13 33a8 8 0 0 1 4-14 10 10 0 0 1 19-4 9 9 0 0 1 11 8 8 8 0 0 1 4 10z"/>
    <circle class="c" cx="27" cy="10" r="4"/>
    <path class="c" d="M14 32h36l-4 22a3 3 0 0 1-3 2H21a3 3 0 0 1-3-2z"/>
    <path class="n" d="M24 35l1.5 18M32 35v19M40 35l-1.5 18"/>`,
  helado: `
    <circle class="c" cx="32" cy="31" r="13"/>
    <path class="a" d="M19 36h26L32 61z"/>
    <path class="n" d="M24 42l11 10M40 42L29 52"/>
    <circle class="w" cx="32" cy="18" r="10"/>
    <circle class="o" cx="32" cy="6" r="3.5"/>`,
  karaoke: `
    <rect class="c" x="43.3" y="30.8" width="9" height="26" rx="4.5" transform="rotate(-45 47.8 43.8)"/>
    <circle class="a" cx="28" cy="24" r="15"/>
    <path class="n" d="M13 24h30M28 9c-8 8-8 22 0 30M28 9c8 8 8 22 0 30"/>
    <path class="w" d="M52 7l2.2 4.8L59 14l-4.8 2.2L52 21l-2.2-4.8L45 14l4.8-2.2z"/>`,
  atardecer: `
    <path class="n" d="M32 8v7M13 17l5 5M51 17l-5 5M5 34h8M51 34h8"/>
    <circle class="a" cx="32" cy="38" r="16"/>
    <path class="c" d="M4 38h56v18a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/>
    <path class="n" d="M12 46q5-4 10 0t10 0t10 0t10 0M18 54q5-4 10 0t10 0t10 0"/>`,
  juegos: `
    <g transform="rotate(-10 20 37)">
      <rect class="a" x="6" y="23" width="28" height="28" rx="7"/>
      <circle class="b ns" cx="14" cy="31" r="2.6"/><circle class="b ns" cx="26" cy="31" r="2.6"/>
      <circle class="b ns" cx="20" cy="37" r="2.6"/>
      <circle class="b ns" cx="14" cy="43" r="2.6"/><circle class="b ns" cx="26" cy="43" r="2.6"/>
    </g>
    <g transform="rotate(12 46 22)">
      <rect class="c" x="33" y="9" width="26" height="26" rx="6"/>
      <circle class="w ns" cx="40" cy="16" r="2.4"/><circle class="w ns" cx="46" cy="22" r="2.4"/>
      <circle class="w ns" cx="52" cy="28" r="2.4"/>
    </g>`,
  fotos: `
    <g transform="rotate(-6 32 32)">
      <rect class="w" x="12" y="7" width="40" height="50" rx="4"/>
      <rect class="c" x="17" y="12" width="30" height="30" rx="2"/>
      <path class="a" d="M32 36C25 31 22 28 22 25a5 5 0 0 1 10-1.5A5 5 0 0 1 42 25c0 3-3 6-10 11z"/>
      <path class="n" d="M20 49h14"/>
    </g>`,
  cocina: `
    <path class="w" d="M16 32a9 9 0 0 1 3-17 13 13 0 0 1 26 0 9 9 0 0 1 3 17z"/>
    <path class="n" d="M27 22v7M37 22v7"/>
    <rect class="a" x="17" y="32" width="30" height="17" rx="3"/>
    <path class="n" d="M17 41h30"/>
    <path class="c" d="M12 49h40v4a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3z"/>`,
  siesta: `
    <path class="a" d="M42 8A24 24 0 1 0 56 44 20 20 0 0 1 42 8z"/>
    <path class="n" d="M44 12h8l-8 9h8M53 28h5.5l-5.5 6.5h5.5"/>
    <circle class="c" cx="21" cy="30" r="3"/>
    <circle class="c" cx="27" cy="43" r="2"/>`,
  diversiones: `
    <path class="n" d="M32 30L16 58M32 30l16 28M8 58h48"/>
    <circle class="w" cx="32" cy="30" r="20"/>
    <path class="n" d="M32 10v40M12 30h40M17.9 15.9l28.2 28.2M46.1 15.9L17.9 44.1"/>
    <circle class="c" cx="32" cy="30" r="4"/>
    <circle class="a" cx="32" cy="10" r="3.6"/><circle class="c" cx="52" cy="30" r="3.6"/>
    <circle class="a" cx="32" cy="50" r="3.6"/><circle class="c" cx="12" cy="30" r="3.6"/>
    <circle class="o" cx="46.1" cy="15.9" r="3.6"/><circle class="o" cx="46.1" cy="44.1" r="3.6"/>
    <circle class="o" cx="17.9" cy="44.1" r="3.6"/><circle class="o" cx="17.9" cy="15.9" r="3.6"/>`,
};
const ico = k => `<svg class="ico" viewBox="0 0 64 64" aria-hidden="true">${ICONOS[k]}</svg>`;

// Tus citas
const PREMIOS = [
  {
    i: "picnic",
    t: "Picnic en el parque",
    costo: "UWU",
    d: "Compramos comidita y a comer mientras conversamos en el parquesin uwuwuwu",
  },
  {
    i: "museo",
    t: "Vamos a un museo",
    costo: "UWU",
    d: "Vamos a visitar un museito y a aprender cosas nuevas juntos. Si nos aburrimos, nos vamos a comer algo rico uwu",
  },
  {
    i: "cupcake",
    t: "Cupcake casero",
    costo: "UWU",
    d: "Lo preparamos juntos y lo comemos, aprobado por Pompompurin uwuwuwu. Si queda chueco, igual sabrá rico.",
  },
  {
    i: "helado",
    t: "Helado y paseo sin rumbo",
    costo: "UWU",
    d: "Compramos un heladito y a webear por Lima la gris uwuwuwu",
  },
  {
    i: "karaoke",
    t: "Karaoke en casa",
    costo: "UWU",
    d: "Ponemos nuestras canciones favoritas y nos ponemos a cantar y bailar como si nadie nos viera uwuwuwu",
  },
  {
    i: "atardecer",
    t: "Atardecer en la playa",
    costo: "UWU",
    d: "Vamos a nuestra playa favorita a ver el atardecer y caminar sin rumbo :3",
  },
  {
    i: "juegos",
    t: "Tarde de juegos",
    costo: "UWU",
    d: "Juegos de mesa, videojuegos, o unito uwu. El que pierda paga prenda jejejeje",
  },
  {
    i: "cocina",
    t: "Cocinar",
    costo: "UWU",
    d: "Yo compro los ingredientes y pongo cocina, tu me ayudas a cocinar y luego nos comemos todito uwuwuwu",
  },
  {
    i: "fotos",
    t: "Sesión de fotos para postear en Instagram",
    costo: "UWU",
    d: "Nos tomamos fotos asi bien kiuts o estilizadas para subirlas a Instagram y que todos nos envidien uwuwuwu",
  },
  {
    i: "siesta",
    t: "Siesta",
    costo: "UWU",
    d: "¿Tuvimos una larga semana? Nos vamos a dormir juntos y a descansar un ratito uwuwuwu",
  },
  {
    i: "diversiones",
    t: "Parque de diversiones",
    costo: "UWU",
    d: "Vamos al Coney Park o algún parque de diversiones a divertirnos y bajar pepa uwuwuwuwu",
  },
];

const COLORES_BOLA = ["var(--rojo)", "var(--rojo-osc)", "var(--claro)", "var(--cafe)"];
const LS_KEY = "album_domingo_novios";
const LS_ULTIMO = "album_domingo_ultimo_giro";

let obtenidos = [];
try { obtenidos = JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch { }

const gacha = $("#gacha"), perilla = $("#perilla"), rueda = $("#rueda"), cap = $("#cap");
const zona = $("#gacha-zona"), contenido = $("#g-contenido"), candado = $("#candado");
let girando = false;

// Bolitas dentro del globo
const NS = "http://www.w3.org/2000/svg";
const POS = [
  [98, 182, 0], [130, 184, 1], [162, 182, 2],
  [84, 154, 3], [116, 156, 0], [148, 154, 1], [180, 156, 2],
  [70, 126, 1], [102, 128, 2], [134, 126, 3], [166, 128, 0], [196, 124, 1],
  [92, 98, 3], [124, 100, 0], [158, 98, 2],
];
POS.forEach(([x, y, c], n) => {
  const g = document.createElementNS(NS, "g");
  g.setAttribute("transform", `translate(${x} ${y}) rotate(${(n * 47) % 80 - 40})`);
  g.innerHTML = `
    <g class="b-in" style="--d:${(n % 5) * 0.05}s;--r:${(n % 2 ? 1 : -1) * (14 + (n % 4) * 6)}deg">
      <path class="bt" d="M-16 0a16 16 0 0 1 32 0z" style="fill:${COLORES_BOLA[c]}"/>
      <path class="bb" d="M-16 0a16 16 0 0 0 32 0z"/>
      <circle class="bc" r="16"/>
      <ellipse class="bl" cx="-6" cy="-8" rx="4" ry="2.4" transform="rotate(-35 -6 -8)"/>
    </g>`;
  $("#bolas").appendChild(g);
});

// Colección
$("#g-total").textContent = PREMIOS.length;
function pintarColeccion(nuevo) {
  const cont = $("#coleccion");
  cont.innerHTML = "";
  PREMIOS.forEach((p, i) => {
    const tiene = obtenidos.includes(i);
    const s = document.createElement("button");
    s.type = "button";
    s.className = "slot" + (tiene ? " on" : "") + (i === nuevo ? " nuevo" : "");
    s.disabled = !tiene;
    s.setAttribute("aria-label", tiene ? p.t : "Cita por descubrir");
    s.innerHTML = tiene ? ico(p.i) : '<span class="script">?</span>';
    if (tiene) s.addEventListener("click", () => mostrar(i, false));
    cont.appendChild(s);
  });
  $("#g-cont").textContent = obtenidos.length;
}
pintarColeccion();

// ----- Límite: desde el 21/oct/2026 y 1 giro cada 7 días -----
function proximoGiro() {
  let ult = 0;
  try { ult = +localStorage.getItem(LS_ULTIMO) || 0; } catch { }
  return Math.max(DESBLOQUEO.getTime(), ult ? ult + ESPERA : 0);
}
function fmt(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400), h = Math.floor(s / 3600) % 24;
  const m = Math.floor(s / 60) % 60, x = s % 60;
  const p = n => String(n).padStart(2, "0");
  return (d ? d + "d " : "") + p(h) + "h " + p(m) + "m " + p(x) + "s";
}
function actualizarEstado() {
  const ahora = Date.now();
  const antes = ahora < DESBLOQUEO.getTime();
  const falta = proximoGiro() - ahora;
  const puede = falta <= 0;

  zona.classList.toggle("bloqueada", antes);
  contenido.inert = antes;
  candado.hidden = !antes;
  if (antes) $("#cuenta-atras").textContent = "Faltan " + fmt(DESBLOQUEO.getTime() - ahora);

  if (!girando) perilla.disabled = !puede;
  gacha.classList.toggle("espera", !puede && !antes);

  $("#g-estado").textContent = antes ? ""
    : puede ? "Tienes una cápsula disponible. ¡Gira la perilla!"
      : "Ya giraste esta semana. Próxima cápsula en " + fmt(falta);
}
actualizarEstado();
setInterval(actualizarEstado, 1000);

// Elegir cita (primero las que aún no ha descubierto)
function elegir() {
  const faltan = PREMIOS.map((_, i) => i).filter(i => !obtenidos.includes(i));
  const pool = faltan.length ? faltan : PREMIOS.map((_, i) => i);
  return pool[Math.floor(Math.random() * pool.length)];
}

// Confeti con formas simples (estrellas, círculos y tiras)
function confeti() {
  const colores = ["var(--claro)", "var(--crema)", "var(--rojo)", "#fff"];
  const formas = ["c", "e", "r"];
  for (let i = 0; i < 34; i++) {
    const s = document.createElement("span");
    s.className = "confeti " + formas[i % 3];
    s.style.background = colores[i % colores.length];
    s.style.setProperty("--dx", (Math.random() * 2 - 1) * 46 + "vw");
    s.style.setProperty("--dy", -(8 + Math.random() * 34) + "vh");
    s.style.animationDelay = Math.random() * .2 + "s";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1900);
  }
}

// Ventana de la cita
function mostrar(i, nuevo) {
  const p = PREMIOS[i];
  $("#p-icono").innerHTML = ico(p.i);
  $("#p-titulo").textContent = p.t;
  $("#p-texto").textContent = p.d;
  $("#p-costo").textContent = p.costo || "UWU";
  $("#premio").hidden = false;
  if (nuevo) {
    confeti();
    if (!obtenidos.includes(i)) {
      obtenidos.push(i);
      try { localStorage.setItem(LS_KEY, JSON.stringify(obtenidos)); } catch { }
    }
    pintarColeccion(i);
  }
}

// Girar la perilla
function girar() {
  if (girando || Date.now() < proximoGiro()) return;
  girando = true;
  perilla.disabled = true;
  try { localStorage.setItem(LS_ULTIMO, String(Date.now())); } catch { }  // cuenta desde que gira
  actualizarEstado();

  gacha.classList.add("usada", "agitar");
  rueda.classList.remove("gira");
  void rueda.getBoundingClientRect();           // reinicia la animación
  rueda.classList.add("gira");
  const i = elegir();

  setTimeout(() => {
    gacha.classList.remove("agitar");
    cap.style.setProperty("--c", COLORES_BOLA[i % COLORES_BOLA.length]);
    cap.classList.add("cae");
  }, 950);

  setTimeout(() => {
    mostrar(i, true);
    cap.classList.remove("cae");
    girando = false;
    actualizarEstado();
  }, 2100);
}

perilla.addEventListener("click", girar);
$("#p-cerrar").addEventListener("click", () => $("#premio").hidden = true);
$("#premio").addEventListener("click", e => { if (e.target.id === "premio") e.target.hidden = true; });
document.addEventListener("keydown", e => { if (e.key === "Escape") $("#premio").hidden = true; });