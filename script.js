const lang = navigator.language.slice(0, 2); // detect language

const texts = {
  no: {
    search: "Søk",
    searching: "🔎 Søker...",
    error: "❌ Klarte ikke hente data",
    name: "Navn",
    location: "Lokasjon",
    carrier: "Teleoperatør",
    enterNumber: "❗ Skriv inn et telefonnummer",
    resultFor: "Resultat for"
  },
  en: {
    search: "Search",
    searching: "🔎 Searching...",
    error: "❌ Failed to fetch data",
    name: "Name",
    location: "Location",
    carrier: "Carrier",
    enterNumber: "❗ Please enter a phone number",
    resultFor: "Result for"
  }
};

const t = texts[lang] || texts["en"];
document.getElementById("searchBtn").innerText = t.search;

async function lookup() {
  const phone = document.getElementById('phoneInput').value.trim().replace(/\s+/g, '');
  const out = document.getElementById('result');
  if (!phone) {
    out.innerHTML = `<p>${t.enterNumber}</p>`;
    return;
  }

  out.innerHTML = `<p>${t.searching}</p>`;

  const url = `https://www.numlookup.com/lookup/${phone}`;
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(proxyUrl);
    const html = await response.text();

    // Simple scrape using regex
    const nameMatch = html.match(/<td>Name<\/td>\s*<td>(.*?)<\/td>/i);
    const locationMatch = html.match(/<td>Location<\/td>\s*<td>(.*?)<\/td>/i);
    const carrierMatch = html.match(/<td>Carrier<\/td>\s*<td>(.*?)<\/td>/i);

    const name = nameMatch ? nameMatch[1].trim() : null;
    const location = locationMatch ? locationMatch[1].trim() : null;
    const carrier = carrierMatch ? carrierMatch[1].trim() : null;

    out.innerHTML = `
      <h3>${t.resultFor} ${phone}</h3>
      <ul>
        <li><strong>${t.name}:</strong> ${name || 'Unknown'}</li>
        <li><strong>${t.location}:</strong> ${location || 'Unknown'}</li>
        <li><strong>${t.carrier}:</strong> ${carrier || 'Unknown'}</li>
      </ul>
    `;
  } catch (err) {
    out.innerHTML = `<p>${t.error}</p>`;
    console.error(err);
  }
}
