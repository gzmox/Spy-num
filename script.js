const proxy = 'https://api.allorigins.win/raw?url=';

async function scrape(url, parser) {
  try {
    const res = await fetch(proxy + encodeURIComponent(url));
    const text = await res.text();
    return parser(text);
  } catch(e) {
    console.error('Error scraping', url, e);
    return null;
  }
}

function parseNumLookup(html) {
  const m = html.match(/<td>Name<\/td>[\s\S]*?<td>([^<]+)<\/td>/);
  return m ? m[1].trim() : null;
}

function parseWhitepages(html) {
  const m = html.match(/<h1.*?>([\w\s,]+)<\/h1>/);
  return m ? m[1].trim() : null;
}

function parsePhonebookcz(html) {
  const m = html.match(/<h2>([^<]+)<\/h2>/);
  return m ? m[1].trim() : null;
}

function parseTruecaller(html) {
  const m = html.match(/<title>([^|]+)\|/);
  return m ? m[1].trim() : null;
}

function parseTellows(html) {
  const m = html.match(/Score:\s*([\d.]+)/);
  return m ? m[1] : null;
}

async function lookup() {
  const phone = document.getElementById('phoneInput').value.trim().replace(/\s+/g, '');
  const out = document.getElementById('result');
  out.innerHTML = '<p>🔍 Fetching...</p>';

  const sources = [
    { name:'NumLookup', url:`https://www.numlookup.com/lookup/${phone}`, parser: parseNumLookup },
    { name:'WhitePages', url:`https://www.whitepages.com/phone/${phone}`, parser: parseWhitepages },
    { name:'PhonebookCZ', url:`https://www.phonebook.cz/${phone}`, parser: parsePhonebookcz },
    { name:'Truecaller', url:`https://www.truecaller.com/search/${phone}`, parser: parseTruecaller },
    { name:'Tellows', url:`https://www.tellows.co.uk/phone/${phone}`, parser: parseTellows }
  ];

  const results = {};
  await Promise.all(sources.map(async s => {
    const v = await scrape(s.url, s.parser);
    results[s.name] = v || '—not found—';
  }));

  out.innerHTML = `
    <h3>Results for ${phone}</h3>
    <ul>
      ${sources.map(s=>`<li><strong>${s.name}:</strong> ${results[s.name]}</li>`).join('')}
    </ul>
  `;
}
