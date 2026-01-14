/*
Load and display the available assets. Each image entry references an asset src.
Tap an image to open it fullscreen.
*/

const images = [
  "/a/2d1919e9-4926-4a27-a0d1-63b198e44d57",
  "/a/22ca6d18-148d-450b-891c-68316c571c97",
  "/a/91d62a5f-a34c-4099-b582-32db062babaa",
  "/a/93276a8c-8719-4c46-bcaa-b0ced38164c4",
  "/a/d2af8d2b-41b8-40b8-80df-fc2567988ab7",
  "/a/a88a5c0c-c9c3-4fd7-a12f-39009e4b8e38",
  "/a/1615ffc3-c8bd-4f1a-9a4d-39797605efea",
  "/a/6f56bdc9-40e2-455b-8832-f2f416418f2d",
  "/a/86a55ae4-4bb0-44ae-9779-1818f7d77d70",
  "/a/3c36ed55-bfc8-4b42-878a-b4a35946b74c",
  "/a/109e8dba-785c-4301-b3e8-000e93781e4b",
  "/a/f1d88fd4-1938-4ca3-a5d1-8c9def415bf6",
  "/a/6c0619d3-a765-47c9-90f8-61a072d1de0a",
  "/a/60df9e1f-ec89-42fa-854d-6c7a86a9bab1",
  "/a/a27fbc11-984a-4518-a430-48843c2aa9f0",
  "/a/d87237ef-63bf-4d92-b19e-8fca96692327",
  "/a/6fdfd456-3306-48be-a789-4d497367637d"
];

// gallery population
const gallery = document.getElementById('gallery');

images.forEach((src, idx) => {
  const card = document.createElement('figure');
  card.className = 'card';
  card.tabIndex = 0;
  const img = document.createElement('img');
  // ensure using .png/webp served by platform – add extension if not present
  img.src = src.endsWith('.png') || src.endsWith('.webp') ? src : src;
  img.alt = `Screenshot ${idx+1}`;
  card.appendChild(img);

  const cap = document.createElement('figcaption');
  cap.className = 'caption';
  cap.textContent = `${idx+1}`;
  card.appendChild(cap);

  // open viewer
  card.addEventListener('click', () => openViewer(img.src, img.alt));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') openViewer(img.src, img.alt);
  });

  gallery.appendChild(card);
});

// viewer logic
const viewer = document.getElementById('viewer');
const viewerImg = document.getElementById('viewerImg');
const closeBtn = document.getElementById('closeBtn');

function openViewer(src, alt = '') {
  viewerImg.src = src;
  viewerImg.alt = alt;
  viewer.classList.remove('hidden');
  viewer.setAttribute('aria-hidden','false');
  // lock scroll
  document.body.style.overflow = 'hidden';
}

function closeViewer() {
  viewer.classList.add('hidden');
  viewer.setAttribute('aria-hidden','true');
  viewerImg.src = '';
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeViewer);
viewer.addEventListener('click', (e) => {
  if (e.target === viewer) closeViewer();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !viewer.classList.contains('hidden')) closeViewer();
});