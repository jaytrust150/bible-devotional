// --- Global Variables ---
const apiKey = "e8494e15ce590ee0936ad96abfe85880"; // **FOR TESTING ONLY - Move to server-side**
let selectedLanguage = "English"; // Default language
let selectedVersionId = "de4e12af7f28f599-01"; // Default version (KJV)
let selectedBookId = "GEN"; // Default book
let selectedChapter = 1; // Default chapter

// --- Data ---
const bibleVersions = {
    "English": [
        { name: "King James Version (KJV)", id: "de4e12af7f28f599-01" },
        { name: "American Standard Version (ASV)", id: "06125adad2d5898a-01" },
        { name: "World English Bible (WEB)", id: "9879dbb7cfe39e4d-01" },
        { name: "Geneva Bible", id: "c315fa9f71d4af3a-01" },
        { name: "Douay-Rheims American 1899", id: "179568874c45066f-01" },
        { name: "Revised Version 1885", id: "40072c4a5aba4022-01" },
        { name: "Literal Standard Version", id: "01b29f4b342acc35-01" }
    ],
    "Arabic, Standard": [
        // Add other languages and versions here
    ]
};

// --- DOM Elements ---
const languageSelect = document.getElementById("languageSelect");
const versionSelect = document.getElementById("versionSelect");
const bookSelect = document.getElementById("bookSelect");
const chapterSelect = document.getElementById("chapterSelect");
const bibleTextDisplay = document.getElementById("answerDisplay");
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// --- Functions ---

// 1. Populate Language Select
function populateLanguageSelect() {
    languageSelect.innerHTML = ""; // Clear existing options
    for (const language in bibleVersions) {
        const option = document.createElement("option");
        option.value = language;
        option.text = language;
        languageSelect.appendChild(option);
    }
}

// 2. Populate Version Select
function populateVersionSelect() {
    versionSelect.innerHTML = "";
    const versions = bibleVersions[selectedLanguage];
    for (const version of versions) {
        const option = document.createElement("option");
        option.value = version.id;
        option.text = version.name;
        versionSelect.appendChild(option);
    }
}

// 3. Fetch and Populate Book Select
async function populateBookSelect() {
    bookSelect.innerHTML = "";
    const url = `https://api.scripture.api.bible/v1/bibles/${selectedVersionId}/books`;

    try {
        const response = await fetch(url, {
            headers: {
                "api-key": apiKey,
            },
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        data.data.forEach(book => {
            const option = document.createElement("option");
            option.value = book.id;
            option.text = book.name;
            bookSelect.appendChild(option);
        });

        selectedBookId = data.data[0].id; // Default to the first book
        populateChapterSelect();

    } catch (error) {
        console.error("Error fetching books:", error);
        bibleTextDisplay.innerHTML = "Error loading Bible books.";
    }
}

// 4. Fetch and Populate Chapter Select
async function populateChapterSelect() {
    chapterSelect.innerHTML = "";
    const url = `https://api.scripture.api.bible/v1/bibles/${selectedVersionId}/books/${selectedBookId}/chapters`;

    try {
        const response = await fetch(url, {
            headers: {
                "api-key": apiKey,
            },
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const chapters = data.data;

        for (let i = 0; i < chapters.length; i++) {
            const option = document.createElement("option");
            option.value = chapters[i].id;
            option.text = chapters[i].number;
            chapterSelect.appendChild(option);
        }

        selectedChapter = chapters[0].id; // Default to the first chapter

    } catch (error) {
        console.error("Error fetching chapters:", error);
        bibleTextDisplay.innerHTML = "Error loading chapters.";
    }
}

// 5. Fetch Bible Text
async function fetchBibleText() {
    const baseURL = "https://api.scripture.api.bible/v1/bibles";
    const url = `${baseURL}/${selectedVersionId}/chapters/${selectedChapter}?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false`;

    try {
        const response = await fetch(url, {
            headers: {
                "api-key": apiKey,
            },
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        displayBibleText(data.data.content);
    } catch (error) {
        console.error("Error fetching Bible text:", error);
        bibleTextDisplay.innerHTML = "Error loading Bible text.";
    }
}

// 6. Display Bible Text
function displayBibleText(text) {
    bibleTextDisplay.innerHTML = text;
}

// --- Search Functionality ---
async function searchBible(query) {
    const url = `https://api.scripture.api.bible/v1/bibles/${selectedVersionId}/search?query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url, {
            headers: {
                'api-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        displaySearchResults(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        bibleTextDisplay.innerHTML = "Error performing search.";
    }
}

function displaySearchResults(data) {
    bibleTextDisplay.innerHTML = ''; // Use the global variable

    if (data.data && data.data.verses && data.data.verses.length > 0) { // Check for verses array
        data.data.verses.forEach(verse => {
            const verseElement = document.createElement('div');
            verseElement.classList.add('search-result');
            verseElement.innerHTML = `
                <h3>${verse.reference}</h3>
                <p>${verse.text}</p>
            `;
            bibleTextDisplay.appendChild(verseElement);
        });
    } else {
        bibleTextDisplay.innerHTML = '<p>No results found.</p>';
    }
}

// Initialize the app
function initializeApp() {
    populateLanguageSelect();
    populateVersionSelect();
    populateBookSelect().then(() => {
        fetchBibleText(); // Initial fetch for the default version and chapter
    });
}

window.addEventListener("DOMContentLoaded", initializeApp);
// 5. Fetch Bible Text
async function fetchBibleText() {
    const baseURL = "https://api.scripture.api.bible/v1/bibles";
    const url = `${baseURL}/${selectedVersionId}/chapters/${selectedChapter}?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false`;

    try {
        const response = await fetch(url, {
            headers: {
                "api-key": apiKey,
            },
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        displayBibleText(data.data.content);
    } catch (error) {
        console.error("Error fetching Bible text:", error);
        bibleTextDisplay.innerHTML = "Error loading Bible text.";
    }
}

// 6. Display Bible Text
function displayBibleText(text) {
    bibleTextDisplay.innerHTML = text;
}

// --- Search Functionality ---
async function searchBible(query) {
    const url = `https://api.scripture.api.bible/v1/bibles/${selectedVersionId}/search?query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url, {
            headers: {
                'api-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        displaySearchResults(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        bibleTextDisplay.innerHTML = "Error performing search.";
    }
}

function displaySearchResults(data) {
    bibleTextDisplay.innerHTML = ''; // Use the global variable

    if (data.data && data.data.verses && data.data.verses.length > 0) { // Check for verses array
        data.data.verses.forEach(verse => {
            const verseElement = document.createElement('div');
            verseElement.classList.add('search-result');
            verseElement.innerHTML = `
                <h3>${verse.reference}</h3>
                <p>${verse.text}</p>
            `;
            bibleTextDisplay.appendChild(verseElement);
        });
    } else {
        bibleTextDisplay.innerHTML = '<p>No results found.</p>';
    }
}

// --- Event Listeners ---

// Language Select Change
languageSelect.addEventListener("change", () => {
    selectedLanguage = languageSelect.value;
    populateVersionSelect();
    populateBookSelect(); // Update book list when language changes
});

// Version Select Change
versionSelect.addEventListener("change", () => {
    selectedVersionId = versionSelect.value;
    populateBookSelect(); // Update book list when version changes
});

// Book Select Change
bookSelect.addEventListener("change", () => {
    selectedBookId = bookSelect.value;
    populateChapterSelect();
    fetchBibleText(); // Fetch text when book changes
});

// Chapter Select Change
chapterSelect.addEventListener("change", () => {
    selectedChapter = chapterSelect.value;
    fetchBibleText(); // Fetch text when chapter changes
});

// Search Button Click
searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        searchBible(query);
    }
});

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
    const filePath = `<span class="math-inline">\{month\}\.</span>{day}-devotional.txt`; 

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

// --- Copy Selected Verse ---
function copySelectedVerses() {
    // Implement the logic to copy selected verses
    const selectedVerses = document.querySelectorAll('.selected-verse');
    let versesText = '';
    selectedVerses.forEach(verse => {
        versesText += verse.innerText + '\n';
    });

    navigator.clipboard.writeText(versesText).then(() => {
        console.log('Verses copied to clipboard');
        alert('Verses copied to clipboard');
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

// Add event listener for copy button
document.querySelectorAll('.copy-selected-verse').forEach(button => {
    button.addEventListener('click', copySelectedVerses);
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
        const shareFacebook = shareOptions.querySelector('.share-facebook-verse');
        navigator.clipboard.writeText(contentToShare).then(() => {
            console.log('Verse text copied to clipboard');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
        shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://jaytrust150.github.io/bible-app/')}`;
        shareFacebook.target = '_blank';

        // --- Share via X (Twitter) ---
        const shareX = shareOptions.querySelector('.share-x-verse');
        shareX.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(contentToShare.trim())}`;
        shareX.target = '_blank';

        // --- Share via Reddit ---
        const shareReddit = shareOptions.querySelector('.share-reddit-verse');
        shareReddit.href = `https://www.reddit.com/submit?title=Shared%20Verse&text=${encodeURIComponent(contentToShare.trim())}`;
        shareReddit.target = '_blank';

        // --- Share via Google Docs ---
        const shareGoogleDocs = shareOptions.querySelector('.share-google-docs-verse');
        shareGoogleDocs.href = `https://docs.google.com/document/create?usp=docs_home&title=Shared%20Verse&content=${encodeURIComponent(contentToShare.trim())}`;
        shareGoogleDocs.target = '_blank';

        // --- Share via Word ---
        const shareWord = shareOptions.querySelector('.share-word-verse');
        shareWord.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            // For Microsoft Word, have the user copy the verse manually
            alert('For Microsoft Word, please copy the verse text and paste it into a new document.');
        });

        // --- Share via Email ---
        const shareEmail = shareOptions.querySelector('.share-email-verse');
        const emailBody = `${contentToShare.trim()}\n\nRead more at: [your website link here]`; // Replace with your actual link
        shareEmail.href = `mailto:?subject=Shared Verse&body=${encodeURIComponent(emailBody)}`;

        // --- Share via Text (SMS) ---
        const shareText = shareOptions.querySelector('.share-text-verse');
        shareText.href = `sms:?body=${encodeURIComponent(contentToShare.trim())}`;
    });
});

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

// --- Podcasts Button ---
podcastsButton.addEventListener('click', () => {
    devotionalText.innerHTML = `
        <p>Future Site of Podcasts!</p>
        <p>Stay tuned!</p>
    `;
});

// --- Share Devotional ---
document.querySelectorAll('.share-devotional').forEach(button => {
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
        const shareFacebook = shareOptionsDevotional.querySelector('.share-facebook-devotional');
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
        const shareX = shareOptionsDevotional.querySelector('.share-x-devotional');
        shareX.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(cleanedText)}`;
        shareX.target = '_blank';

        // --- Share via Reddit ---
        const shareReddit = shareOptionsDevotional.querySelector('.share-reddit-devotional');
        shareReddit.href = `https://www.reddit.com/submit?title=Shared%20Devotional&text=${encodeURIComponent(cleanedText)}`;
        shareReddit.target = '_blank';

        // --- Share via Google Docs ---
        const shareGoogleDocs = shareOptionsDevotional.querySelector('.share-google-docs-devotional');
        shareGoogleDocs.href = `https://docs.google.com/document/create?usp=docs_home&title=Shared%20Devotional&content=${encodeURIComponent(cleanedHtml)}`;
        shareGoogleDocs.target = '_blank';

        // --- Share via Word ---
        const shareWord = shareOptionsDevotional.querySelector('.share-word-devotional');
        shareWord.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            // For Microsoft Word, have the user copy the verse manually
            alert('For Microsoft Word, please copy the devotional text and paste it into a new document.');
        });

        // --- Share via Email ---
        const shareEmail = shareOptionsDevotional.querySelector('.share-email-devotional');
        const emailBody = `${cleanedText}\n\nRead more at: [your website link here]`; // Replace with your actual link
        shareEmail.href = `mailto:?subject=Shared Devotional&body=${encodeURIComponent(emailBody)}`;

        // --- Share via Text (SMS) ---
        const shareText = shareOptionsDevotional.querySelector('.share-text-devotional');
        shareText.href = `sms:?body=${encodeURIComponent(cleanedText)}`;
    });
});

// --- Copy Devotional Link ---
document.querySelectorAll('.copy-devotional-link').forEach(button => {
    button.addEventListener('click', () => {
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
document.querySelectorAll('.prev-devotional').forEach(button => {
    button.addEventListener('click', handlePrevDevotional);
});

document.querySelectorAll('.next-devotional').forEach(button => {
    button.addEventListener('click', handleNextDevotional);
});

// --- Helper Functions ---

// --- Dark Mode Toggle ---
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Save the user's preference in local storage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
}

// Check the user's preference on page load
window.addEventListener('load', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});

// --- Attach Event Listener to Devotional Search Button ---
if (devotionalSearchButton) {
    devotionalSearchButton.addEventListener('click', () => {
        const query = devotionalSearchInput.value;
        if (query) {
            // Switch to Bible app side
            const bibleAppElements = document.querySelectorAll('.bible-app-elements');
            bibleAppElements.forEach(element => element.style.display = 'block');

            const devotionalElements = document.querySelectorAll('.devotional-elements');
            devotionalElements.forEach(element => element.style.display = 'none');

            dailyDevotionalButton.style.display = 'inline-block';
            bibleAppButton.style.display = 'none';

            appTitle.innerHTML = '<span class="bible">Bible</span> <span class="app">App</span>';

            // Perform the search
            searchBible(query);
        }
    });
}

// --- Initialization ---

function initializeApp() {
    populateLanguageSelect();
    populateVersionSelect();
    populateBookSelect().then(() => {
        fetchBibleText(); // Initial fetch for the default version and chapter
    });
}

window.addEventListener("DOMContentLoaded", initializeApp);

// --- Share Selected Verses ---
function shareSelectedVerses() {
    const selectedVerses = document.querySelectorAll('.selected-verse');
    let versesText = '';

    selectedVerses.forEach(verse => {
        versesText += verse.innerText + '\n';
    });

    // Example: Share via email
    const mailtoLink = `mailto:?subject=Shared Bible Verses&body=${encodeURIComponent(versesText)}`;
    window.location.href = mailtoLink;
}

// Add event listener for share button
document.querySelectorAll('.share-selected-verse').forEach(button => {
    button.addEventListener('click', shareSelectedVerses);
});

// Function to share selected verses
function shareSelectedVerses() {
    const selectedVerses = document.querySelectorAll('.selected-verse');
    let versesText = '';

    selectedVerses.forEach(verse => {
        versesText += verse.innerText + '\n';
    });

    // Example: Share via email
    const mailtoLink = `mailto:?subject=Shared Bible Verses&body=${encodeURIComponent(versesText)}`;
    window.location.href = mailtoLink;
}

// Fetch list of Bibles
fetch("https://api.scripture.api.bible/v1/bibles", {
    method: 'GET',
    headers: {
        'accept': 'application/json',
        'api-key': 'e8494e15ce590ee0936ad96abfe85880'
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error fetching Bibles:', error));

// Fetch Bible text
function fetchBibleText(bibleId, chapterId) {
    if (!bibleId || !chapterId) {
        console.error('Invalid bibleId or chapterId');
        return;
    }

    const url = `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false`;

    fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'api-key': apiKey
        }
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 400) {
            throw new Error('Not authorized to retrieve any Bibles or invalid language_code provided');
        } else if (response.status === 401) {
            throw new Error('Unauthorized for API access. Missing or Invalid API Key provided');
        } else if (response.status === 403) {
            throw new Error('Not authorized to retrieve Sections for this Bible');
        } else if (response.status === 404) {
            throw new Error('Book not found');
        } else {
            throw new Error(`API request failed with status ${response.status}`);
        }
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error fetching Bible text:', error));
}

// Example usage of fetchBibleText
fetchBibleText(selectedVersionId, selectedChapter);

// Function to search verses
function searchVerses(bibleId, query, limit = 10, offset = 0) {
    const url = `https://api.scripture.api.bible/v1/bibles/${bibleId}/search?query=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'api-key': apiKey
        }
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 400) {
            throw new Error('Invalid ID supplied');
        } else if (response.status === 401) {
            throw new Error('Unauthorized for API access. Missing or Invalid API Token provided');
        } else if (response.status === 403) {
            throw new Error('Not authorized to retrieve Sections for this Bible');
        } else if (response.status === 404) {
            throw new Error('Section not found');
        } else {
            throw new Error(`API request failed with status ${response.status}`);
        }
    })
    .then(data => {
        console.log(data);
        if (data.data && data.data.verses) {
            data.data.verses.forEach(verse => {
                console.log(`Verse ID: ${verse.id}, Text: ${verse.text}, Reference: ${verse.reference}`);
            });
        }
    })
    .catch(error => console.error('Error searching verses:', error));
}

// Example usage of searchVerses
searchVerses(selectedVersionId, 'love', 10, 0);