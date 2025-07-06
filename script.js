async function lookup() {
  const phone = document.getElementById('phoneInput').value.trim().replace(/\s+/g, '');
  const out = document.getElementById('result');
  if (!phone) {
    out.innerHTML = '<p>❗ Skriv inn et telefonnummer</p>';
    return;
  }

  out.innerHTML = '<p>🔎 Søker...</p>';

  try {
    const res = await fetch(`/api/lookup?number=${phone}`);
    const data = await res.json();

    if (data.error) {
      out.innerHTML = `<p>❌ Feil: ${data.error}</p>`;
    } else {
      out.innerHTML = `
        <h3>Resultat for ${phone}</h3>
        <ul>
          <li><strong>Navn:</strong> ${data.name || 'Ukjent'}</li>
          <li><strong>Lokasjon:</strong> ${data.location || 'Ukjent'}</li>
          <li><strong>Teleoperatør:</strong> ${data.carrier || 'Ukjent'}</li>
        </ul>
      `;
    }
  } catch (err) {
    out.innerHTML = '<p>❌ Klarte ikke hente data</p>';
    console.error(err);
  }
}
