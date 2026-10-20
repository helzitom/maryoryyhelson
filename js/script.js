

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
    texto: "Ola papita vonita porke miras a otro ladito ke eh jeje papita te amo uwu",
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
    texto: "Siempre viéndonos preciosos y siendo la envidia de todos los demás uwu",
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
    texto: "MI papita comiendo su cuchareable de chocolate con fresa (con todo y tallo) U n U",
  },
  {
    tipo: "foto",
    src: "img/7.jpg",
    fecha: "17 oct",
    titulo: "Post Berilio",
    texto: "Tu y yo en el metropolitano luego de oir Dimelo en Live uwuwuwuwu",
  }
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
