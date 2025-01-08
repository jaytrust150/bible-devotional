// script.js

// --- Constants --- 
const bibleAppButton = document.getElementById('bibleAppButton');
const dailyDevotionalButton = document.getElementById('dailyDevotionalButton');
const darkModeToggle = document.getElementById('darkModeToggle');
const monthSelect = document.getElementById('monthSelect');
const daySelect = document.getElementById('daySelect');
const yearDisplay = document.getElementById('yearDisplay');
const audioButton = document.getElementById('audioButton');
const podcastsButton = document.getElementById('podcastsButton');
const shareButton = document.getElementById('shareButton');
const prevDevotional = document.getElementById('prevDevotional');
const nextDevotional = document.getElementById('nextDevotional');
const devotionalText = document.getElementById('devotionalText');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const podcastsButtonBottom = document.getElementById('podcastsButtonBottom');
const shareButtonBottom = document.getElementById('shareButtonBottom');
const prevDevotionalBottom = document.getElementById('prevDevotionalBottom');
const nextDevotionalBottom = document.getElementById('nextDevotionalBottom');


// --- Bible App Elements (initially visible) ---
const bookSelect = document.getElementById('bookSelect');
const chapterSelect = document.getElementById('chapterSelect');
const versionSelectTop = document.getElementById('versionSelectTop');
const instructionText = document.querySelector('.instruction-text');
const fontButtons = document.querySelector('.font-buttons');
const searchContainer = document.querySelector('.search-container');
const chapterNavigation = document.querySelectorAll('.chapter-navigation'); 
const answerDisplay = document.getElementById('answerDisplay');


// --- Functions ---

// --- Daily Devotional Button ---
dailyDevotionalButton.addEventListener('click', () => {
  // 1. Hide Bible App elements
  bookSelect.style.display = 'none';
  chapterSelect.style.display = 'none';
  versionSelectTop.style.display = 'none';
  instructionText.style.display = 'none';
  fontButtons.style.display = 'none';
  searchContainer.style.display = 'none';
  chapterNavigation.forEach(element => element.style.display = 'none'); 
  answerDisplay.style.display = 'none';

  // 2. Show Daily Devotional elements
  const devotionalElements = document.querySelectorAll('.devotional-elements');
  devotionalElements.forEach(element => element.style.display = 'block'); 

  // 3. Update button text and functionality
  dailyDevotionalButton.style.display = 'none';
  bibleAppButton.style.display = 'block';

  // 4. Fetch and display initial devotional
  fetchDevotional();
});

// --- Bible App Button ---
bibleAppButton.addEventListener('click', () => {
  // 1. Hide Daily Devotional elements
  const devotionalElements = document.querySelectorAll('.devotional-elements');
  devotionalElements.forEach(element => element.style.display = 'none'); 

  // 2. Show Bible App elements
  bookSelect.style.display = 'inline-block';
  chapterSelect.style.display = 'inline-block';
  versionSelectTop.style.display = 'inline-block';
  instructionText.style.display = 'block';
  fontButtons.style.display = 'block';
  searchContainer.style.display = 'block';
  chapterNavigation.forEach(element => element.style.display = 'block'); 
  answerDisplay.style.display = 'block';

  // 3. Update button text and functionality
  bibleAppButton.style.display = 'none';
  dailyDevotionalButton.style.display = 'block';
});

// --- Dark Mode Toggle Button ---
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// --- Month Select ---
monthSelect.addEventListener('change', fetchDevotional);

// --- Day Select ---
function populateDaySelect() {
  // ... (same as before) ...
}

populateDaySelect(); 
monthSelect.addEventListener('change', populateDaySelect); 
daySelect.addEventListener('change', fetchDevotional);

// --- Year Display ---
yearDisplay.textContent = new Date().getFullYear();

// --- Audio Button ---
audioButton.addEventListener('click', () => {
  // ... code to handle audio playback ...
});

// --- Podcasts Button ---
podcastsButton.addEventListener('click', () => {
  // ... code to navigate to podcasts section ...
});
podcastsButtonBottom.addEventListener('click', () => {
  // ... code to navigate to podcasts section ...
});


// --- Share Button ---
shareButton.addEventListener('click', () => {
  // ... code to show share options ...
});
shareButtonBottom.addEventListener('click', () => {
  // ... code to show share options ...
});

// --- Previous Devotional Button ---
prevDevotional.addEventListener('click', () => {
  // ... code to fetch and display previous devotional ...
});
prevDevotionalBottom.addEventListener('click', () => {
  // ... code to fetch and display previous devotional ...
});


// --- Next Devotional Button ---
nextDevotional.addEventListener('click', () => {
  // ... code to fetch and display next devotional ...
});
nextDevotionalBottom.addEventListener('click', () => {
  // ... code to fetch and display next devotional ...
});


// --- Search Button ---
searchButton.addEventListener('click', () => {
  // ... code to handle search using api.bible ...
});

// ... other button functions ...

// --- Helper Functions ---

function fetchDevotional() {
  // ... (same as before) ... 
}

// --- Other Helper Functions ---
// (This section is currently empty. You can add any other helper functions you need here.)