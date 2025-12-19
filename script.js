// 5 film dengan trailer
const movies = [
  {
    id: 1,
    title: "Joker",
    year: 2019,
    genre: "Drama",
    rating: 8.4,
    image: "joker.jpeg",
    trailer: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    desc: "Transformasi komedian jalanan menjadi sosok Joker yang berbahaya.",
    synopsis:
      "Arthur Fleck adalah komedian stand-up yang gagal dan hidup terpinggirkan. Tekanan sosial dan masalah kesehatan mental mendorongnya berubah menjadi Joker, simbol kekacauan di kota Gotham."
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    rating: 9.0,
    image: "thedark.jpg",
    trailer: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    desc: "Pertarungan Batman melawan Joker di Gotham.",
    synopsis:
      "Batman, Letnan Gordon, dan Jaksa Harvey Dent berusaha memberantas kejahatan di Gotham. Kehadiran Joker mengguncang kota dan memaksa Batman mengambil keputusan moral paling sulit dalam hidupnya."
  },
  {
    id: 3,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    image: "inception.jpg",
    trailer: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    desc: "Pencuri yang mencuri rahasia dari alam mimpi.",
    synopsis:
      "Dom Cobb adalah pencuri profesional yang mencuri rahasia berharga dari alam bawah sadar targetnya saat mereka bermimpi. Ia diberi tugas menanamkan sebuah ide ke dalam pikiran seseorang, tugas yang nyaris mustahil."
  },
  {
    id: 4,
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.6,
    image: "instellar.jpg",
    trailer: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    desc: "Perjalanan melintasi ruang dan waktu demi masa depan manusia.",
    synopsis:
      "Bumi mengalami krisis lingkungan dan tidak lagi layak huni. Cooper dan tim astronot lain melakukan perjalanan melalui lubang cacing untuk mencari planet baru demi kelangsungan hidup umat manusia."
  },
  {
    id: 5,
    title: "Coco",
    year: 2017,
    genre: "Animation",
    rating: 8.4,
    image: "coco.jpg",
    trailer: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    desc: "Petualangan Miguel di Dunia Arwah untuk mengejar mimpinya bermusik.",
    synopsis:
      "Miguel sangat mencintai musik meski keluarganya melarang. Saat ia mencuri gitar dari makam idolanya, ia terseret ke Dunia Arwah dan harus mencari restu keluarganya yang telah tiada untuk kembali."
  }
];

// ELEMEN DOM
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const homeMovieList = document.getElementById("homeMovieList");
const movieListEl = document.getElementById("movieList");

// HERO featured
const featuredPoster = document.getElementById("featuredPoster");
const featuredTitle = document.getElementById("featuredTitle");
const featuredYear = document.getElementById("featuredYear");
const featuredGenre = document.getElementById("featuredGenre");
const featuredRating = document.getElementById("featuredRating");
const featuredDesc = document.getElementById("featuredDesc");
const featuredPlay = document.getElementById("featuredPlay");
const featuredDetail = document.getElementById("featuredDetail");

// MODAL
const modal = document.getElementById("movieModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalRating = document.getElementById("modalRating");
const modalDesc = document.getElementById("modalDesc");
const modalSynopsis = document.getElementById("modalSynopsis");
const modalVideo = document.getElementById("modalVideo");
const modalVideoSource = document.getElementById("modalVideoSource");

// FORM
const suggestForm = document.getElementById("suggestForm");
const formStatus = document.getElementById("formStatus");

// ---------- NAVIGASI HALAMAN ----------
function showPage(pageId) {
  navLinks.forEach((l) => {
    const target = l.getAttribute("data-page");
    l.classList.toggle("active", target === pageId);
  });
  pages.forEach((p) => p.classList.toggle("active", p.id === pageId));
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const pageId = link.getAttribute("data-page");
    showPage(pageId);
  });
});

// tombol "Lihat semua" di home
document.querySelectorAll("[data-page='movies'].link-more").forEach((btn) => {
  btn.addEventListener("click", () => showPage("movies"));
});

// ---------- RENDER FILM ----------
function createMovieCards(container, list) {
  container.innerHTML = "";
  list.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.dataset.id = movie.id;
    card.innerHTML = `
      <div class="movie-poster">
        <img src="${movie.image}" alt="Poster ${movie.title}">
      </div>
      <div class="movie-info">
        <div class="movie-title">${movie.title}</div>
        <div class="movie-year-genre">${movie.year} • ${movie.genre}</div>
        <div class="movie-rating-badge">★ ${movie.rating}</div>
        <div class="movie-desc">${movie.desc}</div>
      </div>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll(".movie-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = parseInt(card.dataset.id, 10);
      const movie = movies.find((m) => m.id === id);
      if (movie) openMovieModal(movie);
    });
  });
}

// render awal
createMovieCards(homeMovieList, movies);
createMovieCards(movieListEl, movies);

// ---------- HERO FEATURED ----------
const featuredMovie = movies[1]; // The Dark Knight dijadikan unggulan

function setFeatured(movie) {
  featuredPoster.src = movie.image;
  featuredPoster.alt = `Poster ${movie.title}`;
  featuredTitle.textContent = movie.title;
  featuredYear.textContent = movie.year;
  featuredGenre.textContent = movie.genre;
  featuredRating.textContent = `Rating ${movie.rating}/10`;
  featuredDesc.textContent = movie.desc;
}

setFeatured(featuredMovie);

featuredPlay.addEventListener("click", () => {
  openMovieModal(featuredMovie, true);
});

featuredDetail.addEventListener("click", () => {
  openMovieModal(featuredMovie, false);
});

// ---------- FILTER KATEGORI DI HOME ----------
const categoryChips = document.querySelectorAll(".category-chip");

categoryChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;
    categoryChips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");

    let filtered = movies;
    if (filter !== "all") {
      filtered = movies.filter((m) => m.genre === filter);
    }
    createMovieCards(homeMovieList, filtered);
  });
});

// ---------- SEARCH ----------
searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = movies.filter((movie) => {
    const text = `${movie.title} ${movie.genre} ${movie.year} ${movie.desc} ${movie.synopsis}`.toLowerCase();
    return text.includes(term);
  });
  createMovieCards(homeMovieList, filtered);
  createMovieCards(movieListEl, filtered);
});

// ---------- DARK MODE ----------
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  const isDark = body.classList.toggle("dark-mode");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ---------- MODAL ----------
function openMovieModal(movie, autoplay = false) {
  modalImage.src = movie.image;
  modalImage.alt = `Poster ${movie.title}`;
  modalTitle.textContent = movie.title;
  modalMeta.textContent = `${movie.year} • ${movie.genre}`;
  modalRating.textContent = `Rating: ${movie.rating}/10`;
  modalDesc.textContent = movie.desc;
  modalSynopsis.textContent = movie.synopsis;

  modalVideo.pause();
  modalVideoSource.src = movie.trailer;
  modalVideo.load();

  if (autoplay) {
    modalVideo.play().catch(() => {});
  }

  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
  modalVideo.pause();
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "flex") {
    closeModal();
  }
});

// ---------- FORM ----------
if (suggestForm) {
  suggestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.textContent = "Terima kasih! Saran film Anda sudah tercatat (demo).";
    suggestForm.reset();
    setTimeout(() => {
      formStatus.textContent = "";
    }, 4000);
  });
}
