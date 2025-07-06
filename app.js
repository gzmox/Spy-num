// Regex to find international and local phone formats
const phoneRegex = /(\+?\d{1,3}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)*\d{3,4}[\s-]?\d{3,4}/g;

async function fetchAndExtract() {
  const url = document.getElementById('urlInput').value.trim();
  if (!url) return alert('Enter a URL first!');
  
  try {
    const res = await fetch(url);
    const text = await res.text();
    displayResults(text);
  } catch (e) {
    alert('Error fetching URL. (CORS may block request)');
  }
}

function extractFromRaw() {
  const text = document.getElementById('rawInput').value;
  if (!text) return alert('Enter raw HTML/text first!');
  displayResults(text);
}

function displayResults(text) {
  const resultDiv = document.getElementById('result');
  const matches = text.match(phoneRegex) || [];
  const uniq = [...new Set(matches)];
  
  if (uniq.length) {
    resultDiv.innerHTML = '<strong>Found phone numbers:</strong><br>' +
      uniq.map(n => `<div>${n}</div>`).join('');
  } else {
    resultDiv.innerHTML = 'No phone numbers found.';
  }
  
  resultDiv.style.display = 'block';
}
