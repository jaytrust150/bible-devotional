// --- Constants (Bible App Elements - Initially Visible) ---
const appTitle = document.getElementById('appTitle');
const dailyDevotionalButton = document.getElementById('dailyDevotionalButton');
const bibleAppButton = document.getElementById('bibleAppButton');
const darkModeToggle = document.getElementById('darkModeToggle');
const bookSelect = document.getElementById('bookSelect');
const chapterSelect = document.getElementById('chapterSelect');
const versionSelectTop = document.getElementById('versionSelectTop');
const instructionText = document.querySelector('.instruction-text');
const decreaseFont = document.getElementById('decreaseFont');
const increaseFont = document.getElementById('increaseFont');
const searchInputs = document.querySelectorAll('#searchInput'); // Select both search inputs
const searchButtons = document.querySelectorAll('#searchButton'); // Select both search buttons
const copySelectedVerses = document.querySelectorAll('#copySelectedVerse'); //Both copy verse buttons
const shareSelectedVerses = document.querySelectorAll('#shareSelectedVerse'); //Both share verse buttons
const prevChapter = document.getElementById('prevChapter');
const nextChapter = document.getElementById('nextChapter');
const shareOptions = document.getElementById('shareOptions');
const answerDisplay = document.getElementById('answerDisplay');
const copyVerseLink = document.getElementById('copyVerseLink'); // For copying Bible verses

// --- Constants (Daily Devotional Elements - Initially Hidden) ---
const monthSelect = document.getElementById('monthSelect');
const daySelect = document.getElementById('daySelect');
const yearDisplay = document.getElementById('yearDisplay');
const welcomeMessage = document.getElementById('welcomeMessage');
const decreaseFontDevotional = document.getElementById('decreaseFontDevotional');
const increaseFontDevotional = document.getElementById('increaseFontDevotional');
const audioButton = document.getElementById('audioButton');
const podcastsButton = document.getElementById('podcastsButton');
const shareDevotionals = document.querySelectorAll('#shareDevotional'); // Select both buttons
const shareOptionsDevotionals = document.querySelectorAll('.share-options-devotional'); // Select both divs
const copyDevotionalLink = document.getElementById('copyDevotionalLink');
const prevDevotionals = document.querySelectorAll('#prevDevotional'); // Select both buttons
const nextDevotionals = document.querySelectorAll('#nextDevotional'); // Select both buttons
const devotionalText = document.getElementById('devotionalText');


// --- Functions ---

// --- Daily Devotional Button ---
dailyDevotionalButton.addEventListener('click', () => {
    // 1. Hide Bible App elements
    const bibleAppElements = document.querySelectorAll('.bible-app-elements');
    bibleAppElements.forEach(element => element.style.display = 'none');

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
    const bibleAppElements = document.querySelectorAll('.bible-app-elements');
    bibleAppElements.forEach(element => element.style.display = 'block');

    // 3. Update button text and functionality
    bibleAppButton.style.display = 'none';
    dailyDevotionalButton.style.display = 'inline-block';

    // Update the title
    appTitle.innerHTML = '<span class="bible">Bible</span> <span class="app">App</span>';
});

// --- Dark Mode Toggle Button ---
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Toggle button text
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = 'Light Mode';
    } else {
        darkModeToggle.textContent = 'Dark Mode';
    }
});

// --- Month Select ---
monthSelect.addEventListener('change', fetchDevotional);

// --- Day Select ---
function populateDaySelect() {
    const month = monthSelect.value;
    const year = new Date().getFullYear();
    const daysInMonth = new Date(year, month, 0).getDate();
    const today = new Date().getDate(); // Get today's date

    daySelect.innerHTML = ''; // Clear existing options

    for (let i = 1; i <= daysInMonth; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i;
        daySelect.appendChild(option);
    }

    // Set initial day value
    daySelect.value = today;

    // Set year in the yearDisplay
    yearDisplay.textContent = year;
}

// Call populateDaySelect() on page load to set initial values
populateDaySelect();

daySelect.addEventListener('change', fetchDevotional);

// --- Fetch Devotional ---
function fetchDevotional() {
    const month = monthSelect.value; // Get the selected month
    const day = daySelect.value;     // Get the selected day

    // Construct the file path using template literals correctly:
    const filePath = `${month}.${day}-devotional.txt`; 

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Devotional not found');
                } else {
                    throw new Error('Network error');
                }
            }
            return response.text();
        })
        .then(text => {
            // Use innerHTML to correctly render HTML content from the file
            devotionalText.innerHTML = text;
        })
        .catch(error => {
            console.error("Error fetching devotional:", error);
            if (error.message === 'Devotional not found') {
                devotionalText.innerHTML = `
                    <p>Edits in Progress</p>
                    <p>May God bless your heart for seeking Him!</p>
                    <p>Just say a prayer for today to Him! In Jesus' name, Amen!</p>
                `;
            } else {
                devotionalText.textContent = "Failed to load devotional.";
            }
        });
}

// --- Book Select, Chapter Select, Version Select ---
// ... (your existing code for book, chapter, version selection) ...

// --- Font Size Buttons ---
// ... (your existing code for font size buttons) ...

// --- Search Functionality ---
searchButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const searchQuery = searchInputs[index].value;

        // --- Check if in Bible App mode ---
        const isBibleAppMode = bibleAppButton.style.display === 'none';

        if (!isBibleAppMode) {
            // 1. Hide Daily Devotional elements
            const devotionalElements = document.querySelectorAll('.devotional-elements');
            devotionalElements.forEach(element => element.style.display = 'none');

            // 2. Show Bible App elements
            const bibleAppElements = document.querySelectorAll('.bible-app-elements');
            bibleAppElements.forEach(element => element.style.display = 'block');

            // 3. Update button text and functionality
            bibleAppButton.style.display = 'none';
            dailyDevotionalButton.style.display = 'inline-block';

            // Update the title
            appTitle.innerHTML = '<span class="bible">Bible</span> <span class="app">App</span>';
        }

        // 4. Perform the search (using the top search input)
        searchInputs[0].value = searchQuery; // Set the value of the top search input (index 0)
        // Trigger a 'click' event on the top search button to reuse its functionality
        searchButtons[0].click();
    });
});

// --- Copy Selected Verse ---
copySelectedVerses.forEach(button => {
    button.addEventListener('click', () => {
        const selectedVerse = getSelectedVerse();

        if (selectedVerse) {
            navigator.clipboard.writeText(selectedVerse)
                .then(() => {
                    // Optional: Display a success message
                    alert('Verse copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy verse: ', err);
                });
        } else {
            // Optional: Alert the user that they need to select a verse first
            alert('Please select a verse to copy.');
        }
    });
});

// --- Share Selected Verse ---
shareSelectedVerses.forEach(button => {
    button.addEventListener('click', () => {
        // Get the content to share (verse) - You'll implement this later
        const contentToShare = getSelectedVerse(); // Placeholder function

        // Show the share options (relative to the clicked button)
        const shareOptions = button.closest('.chapter-navigation').querySelector('.share-options');
        shareOptions.style.display = shareOptions.style.display === 'none' ? 'block' : 'none';

        // --- Share via Facebook ---
        const shareFacebook = shareOptions.querySelector('#shareFacebookVerse');
        navigator.clipboard.writeText(contentToShare).then(() => {
            console.log('Verse text copied to clipboard');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
        shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://jaytrust150.github.io/bible-app/')}`;
        shareFacebook.target = '_blank';

        // --- Share via X (Twitter) ---
        const shareX = shareOptions.querySelector('#shareXVerse');
        shareX.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(contentToShare.trim())}`;
        shareX.target = '_blank';

        // --- Share via Reddit ---
        const shareReddit = shareOptions.querySelector('#shareRedditVerse');
        shareReddit.href = `https://www.reddit.com/submit?title=Shared%20Verse&text=${encodeURIComponent(contentToShare.trim())}`;
        shareReddit.target = '_blank';

        // --- Share via Google Docs ---
        const shareGoogleDocs = shareOptions.querySelector('#shareGoogleDocsVerse');
        shareGoogleDocs.href = `https://docs.google.com/document/create?usp=docs_home&title=Shared%20Verse&content=${encodeURIComponent(contentToShare.trim())}`;
        shareGoogleDocs.target = '_blank';

        // --- Share via Word ---
        const shareWord = shareOptions.querySelector('#shareWordVerse');
        shareWord.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            // For Microsoft Word, have the user copy the verse manually
            alert('For Microsoft Word, please copy the verse text and paste it into a new document.');
        });

        // --- Share via Email ---
        const shareEmail = shareOptions.querySelector('#shareEmailVerse');
        const emailBody = `${contentToShare.trim()}\n\nRead more at: [your website link here]`; // Replace with your actual link
        shareEmail.href = `mailto:?subject=Shared Verse&body=${encodeURIComponent(emailBody)}`;

        // --- Share via Text (SMS) ---
        const shareText = shareOptions.querySelector('#shareTextVerse');
        shareText.href = `sms:?body=${encodeURIComponent(contentToShare.trim())}`;
    });
});

// --- Previous Chapter / Next Chapter ---
// ... (your existing code for previous/next chapter with "Next Book" functionality) ...

// --- Copy Verse Link ---
copyVerseLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior

    // Get the currently displayed Bible verse (you'll need to implement this based on how you display verses)
    const verseToCopy = "This is where you get the Bible verse to copy"; // Replace with your logic to get the verse

    navigator.clipboard.writeText(verseToCopy)
        .then(() => {
            // Optional: Display a success message to the user
            alert('Verse copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy verse: ', err);
        });
});

// --- Audio Button ---
// ... (your existing code for audio playback using accessibility features) ...

// --- Podcasts Button ---
podcastsButton.addEventListener('click', () => {
    devotionalText.innerHTML = `
        <p>Future Site of Podcasts!</p>
        <p>Stay tuned!</p>
    `;
});

// --- Share Devotional ---
shareDevotionals.forEach(button => {
    button.addEventListener('click', () => {
        // Get the content to share (devotional)
        const devotionalTextDiv = document.getElementById('devotionalText');
        let contentToShare = devotionalTextDiv.innerHTML;

        // Create a temporary DOM element to parse the HTML content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = contentToShare;

        // Remove the <title> tag
        const title = tempDiv.querySelector('title');
        if (title) {
            title.remove();
        }

        // Get the cleaned HTML content as a string
        const cleanedHtml = tempDiv.innerHTML;

        // Convert the HTML content to plain text and ensure only one line between paragraphs
        const cleanedText = tempDiv.innerText.replace(/\n\s*\n/g, '\n\n');

        // Show the share options (relative to the clicked button)
        const shareOptionsDevotional = button.closest('.chapter-navigation').querySelector('.share-options-devotional');
        shareOptionsDevotional.style.display = shareOptionsDevotional.style.display === 'none' ? 'block' : 'none';

        // --- Share via Facebook ---
        const shareFacebook = shareOptionsDevotional.querySelector('#shareFacebookDevotional');
        shareFacebook.addEventListener('click', () => {
            navigator.clipboard.writeText(cleanedText).then(() => {
                console.log('Devotional text copied to clipboard for Facebook');
                alert('Devotional text copied to clipboard. You can now paste it into your Facebook status.');
                window.open('https://www.facebook.com/sharer/sharer.php', '_blank');
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        });

        // --- Share via X (Twitter) ---
        const shareX = shareOptionsDevotional.querySelector('#shareXDevotional');
        shareX.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(cleanedText)}`;
        shareX.target = '_blank';

        // --- Share via Reddit ---
        const shareReddit = shareOptionsDevotional.querySelector('#shareRedditDevotional');
        shareReddit.href = `https://www.reddit.com/submit?title=Shared%20Devotional&text=${encodeURIComponent(cleanedText)}`;
        shareReddit.target = '_blank';

        // --- Share via Google Docs ---
        const shareGoogleDocs = shareOptionsDevotional.querySelector('#shareGoogleDocsDevotional');
        shareGoogleDocs.href = `https://docs.google.com/document/create?usp=docs_home&title=Shared%20Devotional&content=${encodeURIComponent(cleanedHtml)}`;
        shareGoogleDocs.target = '_blank';

        // --- Share via Word ---
        const shareWord = shareOptionsDevotional.querySelector('#shareWordDevotional');
        shareWord.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            // For Microsoft Word, have the user copy the verse manually
            alert('For Microsoft Word, please copy the devotional text and paste it into a new document.');
        });

        // --- Share via Email ---
        const shareEmail = shareOptionsDevotional.querySelector('#shareEmailDevotional');
        const emailBody = `${cleanedText}\n\nRead more at: [your website link here]`; // Replace with your actual link
        shareEmail.href = `mailto:?subject=Shared Devotional&body=${encodeURIComponent(emailBody)}`;

        // --- Share via Text (SMS) ---
        const shareText = shareOptionsDevotional.querySelector('#shareTextDevotional');
        shareText.href = `sms:?body=${encodeURIComponent(cleanedText)}`;
    });
});

// --- Copy Devotional Link ---
copyDevotionalLink.addEventListener('click', () => {
    const devotionalTextDiv = document.getElementById('devotionalText');
    let contentToShare = devotionalTextDiv.innerHTML;

    // Create a temporary DOM element to parse the HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contentToShare;

    // Remove the <title> tag
    const title = tempDiv.querySelector('title');
    if (title) {
        title.remove();
    }

    // Get the cleaned HTML content as a string
    const cleanedHtml = tempDiv.innerHTML;

    navigator.clipboard.write([
        new ClipboardItem({
            'text/html': new Blob([cleanedHtml], { type: 'text/html' })
        })
    ]).then(() => {
        console.log('Devotional text copied to clipboard');
        alert('Devotional text copied to clipboard.');
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
});

// --- Prior Day / Next Day ---
// --- Previous Devotional Function ---
function handlePrevDevotional() {
    let currentMonth = parseInt(monthSelect.value);
    let currentDay = parseInt(daySelect.value);
    let currentYear = parseInt(yearDisplay.textContent);

    currentDay--;

    if (currentDay < 1) {
        currentMonth--;
        if (currentMonth < 1) {
            currentMonth = 12;
            currentYear--;
            yearDisplay.textContent = currentYear;
        }
        monthSelect.value = currentMonth;
        const daysInPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();
        currentDay = daysInPreviousMonth;
    }

    daySelect.value = currentDay;
    fetchDevotional();
}

// --- Next Devotional Function ---
function handleNextDevotional() {
    let currentMonth = parseInt(monthSelect.value);
    let currentDay = parseInt(daySelect.value);
    let currentYear = parseInt(yearDisplay.textContent);
    const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();

    currentDay++;

    if (currentDay > daysInCurrentMonth) {
        currentDay = 1;
        currentMonth++;
        if (currentMonth > 12) {
            currentMonth = 1;
            currentYear++;
            yearDisplay.textContent = currentYear;
        }
        monthSelect.value = currentMonth;
    }

    daySelect.value = currentDay;
    fetchDevotional();
}

// --- Attach Event Listeners to Both Sets of Buttons ---
prevDevotionals.forEach(button => {
    button.addEventListener('click', handlePrevDevotional);
});

nextDevotionals.forEach(button => {
    button.addEventListener('click', handleNextDevotional);
});

// --- Helper Functions ---