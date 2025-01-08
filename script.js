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

// Bible App Elements (initially visible)
const bookSelect = document.getElementById('bookSelect');
const chapterSelect = document.getElementById('chapterSelect');
const versionSelectTop = document.getElementById('versionSelectTop');
const instructionText = document.querySelector('.instruction-text');
const fontButtons = document.querySelector('.font-buttons');
const searchContainer = document.querySelector('.search-container');
const chapterNavigation = document.querySelectorAll('.chapter-navigation'); // Select all elements with this class
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
  chapterNavigation.forEach(element => element.style.display = 'none'); // Hide all chapter navigation elements
  answerDisplay.style.display = 'none';

  // 2. Show Daily Devotional elements
  monthSelect.style.display = 'inline-block';
  daySelect.style.display = 'inline-block';
  yearDisplay.style.display = 'inline-block';
  devotionalText.style.display = 'block';
  audioButton.style.display = 'inline-block';
  podcastsButton.style.display = 'inline-block';
  shareButton.style.display = 'inline-block';
  prevDevotional.style.display = 'inline-block';
  nextDevotional.style.display = 'inline-block';

  // 3. Update button text and functionality
  dailyDevotionalButton.style.display = 'none';
  bibleAppButton.style.display = 'block';

  // 4. Fetch and display initial devotional
  fetchDevotional();
});

// --- Bible App Button ---
bibleAppButton.addEventListener('click', () => {
  // 1. Hide Daily Devotional elements
  monthSelect.style.display = 'none';
  daySelect.style.display = 'none';
  yearDisplay.style.display = 'none';
  devotionalText.style.display = 'none';
  audioButton.style.display = 'none';
  podcastsButton.style.display = 'none';
  shareButton.style.display = 'none';
  prevDevotional.style.display = 'none';
  nextDevotional.style.display = 'none';

  // 2. Show Bible App elements
  bookSelect.style.display = 'inline-block';
  chapterSelect.style.display = 'inline-block';
  versionSelectTop.style.display = 'inline-block';
  instructionText.style.display = 'block';
  fontButtons.style.display = 'block';
  searchContainer.style.display = 'block';
  chapterNavigation.forEach(element => element.style.display = 'block'); // Show all chapter navigation elements
  answerDisplay.style.display = 'block';

  // 3. Update button text and functionality
  bibleAppButton.style.display = 'none';
  dailyDevotionalButton.style.display = 'block';
});

// --- Dark Mode Toggle Button ---
darkModeToggle.addEventListener('click', () => {
  // ... code to toggle dark mode ...
  document.body.classList.toggle('dark-mode');
});

// --- Month Select ---
monthSelect.addEventListener('change', fetchDevotional);

// --- Day Select ---
// Populate daySelect with days of the month
function populateDaySelect() {
  const month = monthSelect.value;
  const year = new Date().getFullYear();
  const daysInMonth = new Date(year, month, 0).getDate(); 

  daySelect.innerHTML = ''; // Clear existing options

  for (let i = 1; i <= daysInMonth; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    daySelect.appendChild(option);
  }
}

populateDaySelect(); // Populate on initial load
monthSelect.addEventListener('change', populateDaySelect); // Update when month changes

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

// --- Share Button ---
shareButton.addEventListener('click', () => {
  // ... code to show share options ...
});

// --- Previous Devotional Button ---
prevDevotional.addEventListener('click', () => {
  // ... code to fetch and display previous devotional ...
});

// --- Next Devotional Button ---
nextDevotional.addEventListener('click', () => {
  // ... code to fetch and display next devotional ...
});

// --- Search Button ---
searchButton.addEventListener('click', () => {
  // ... code to handle search using api.bible ...
});

// ... other button functions ...

// --- Helper Functions ---

function fetchDevotional() {
  const month = monthSelect.value;
  const day = daySelect.value;

  // Construct the file path based on the selected date
  const filePath = `devotionals/${month}-${day}-devotional.txt`;

  // Fetch the devotional text file
  fetch(filePath)
    .then(response => response.text())
    .then(text => {
      // Display the devotional text
      devotionalText.textContent = text;
    })
    .catch(error => {
      console.error("Error fetching devotional:", error);
      devotionalText.textContent = "Failed to load devotional.";
    });
}

// --- Other Helper Functions ---
// (This section is currently empty. You can add any other helper functions you need here.)