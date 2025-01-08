// --- Constants --- 
const appTitle = document.getElementById('appTitle');
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

// --- New Constants for Devotional Buttons ---
const copyDevotionalTop = document.getElementById('copyDevotionalTop');
const shareDevotionalTop = document.getElementById('shareDevotionalTop');
const shareOptionsDevotionalTop = document.getElementById('shareOptionsDevotionalTop');
const copyDevotional = document.getElementById('copyDevotional');
const shareDevotional = document.getElementById('shareDevotional');
const shareOptionsDevotional = document.getElementById('shareOptionsDevotional');
const searchInputDevotional = document.getElementById('searchInputDevotional');
const searchButtonDevotional = document.getElementById('searchButtonDevotional');
const decreaseFontDevotional = document.getElementById('decreaseFontDevotional');
const increaseFontDevotional = document.getElementById('increaseFontDevotional');


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
  bibleAppButton.style.display = 'inline-block';

  // Update the title
  appTitle.innerHTML = '<span class="daily">Daily</span> <span class="devotional">Devotional</span>'; 

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
  dailyDevotionalButton.style.display = 'inline-block';

  // Update the title
  appTitle.innerHTML = '<span class="bible">Bible</span> <span class="app">App</span>'; 
});

// --- Dark Mode Toggle Button ---
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// --- Month Select ---
monthSelect.addEventListener('change', fetchDevotional);

// --- Day Select ---
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


// --- Copy Devotional Button ---
copyDevotionalTop.addEventListener('click', () => {
  // ... code to copy devotional text ...
  const textToCopy = devotionalText.textContent; 
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      // Optional: Display a success message to the user
      alert('Devotional copied to clipboard!'); 
    })
    .catch(err => {
      console.error('Failed to copy devotional: ', err);
    });
});

copyDevotional.addEventListener('click', () => {
  // ... code to copy devotional text ...
  const textToCopy = devotionalText.textContent; 
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      // Optional: Display a success message to the user
      alert('Devotional copied to clipboard!'); 
    })
    .catch(err => {
      console.error('Failed to copy devotional: ', err);
    });
});


// --- Share Devotional Button ---
shareDevotionalTop.addEventListener('click', () => {
  // ... code to show share options for devotional ...
  shareOptionsDevotionalTop.style.display = 'block'; // Example to show share options
});

shareDevotional.addEventListener('click', () => {
  // ... code to show share options for devotional ...
  shareOptionsDevotional.style.display = 'block'; // Example to show share options
});

// --- Search Button (Devotional) ---
searchButtonDevotional.addEventListener('click', () => {
  // ... code to handle search in the Bible App from the devotional section ...
});

// --- Font Buttons (Devotional) ---
decreaseFontDevotional.addEventListener('click', () => {
  // ... code to decrease font size in the devotional text ...
});

increaseFontDevotional.addEventListener('click', () => {
  // ... code to increase font size in the devotional text ...
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