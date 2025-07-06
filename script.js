async function lookupNumber() {
  const number = document.getElementById("phoneInput").value.replace(/\s+/g, '');
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "🔍 Looking up...";

  // NumLookup (name + location)
  const numLookupUrl = `https://api.numlookupapi.com/api/v1/lookup/${number}?apikey=YOUR_NUMLOOKUP_API_KEY`;

  // IPQualityScore (carrier, type, fraud risk)
  const ipqsUrl = `https://ipqualityscore.com/api/json/phone/YOUR_IPQS_API_KEY/${number}?country_hint=NO`;

  try {
    const [numLookupRes, ipqsRes] = await Promise.all([
      fetch(numLookupUrl).then(res => res.json()),
      fetch(ipqsUrl).then(res => res.json())
    ]);

    resultDiv.innerHTML = `
      <h3>Results:</h3>
      <p><strong>Phone:</strong> ${number}</p>
      <p><strong>Name:</strong> ${numLookupRes.valid ? numLookupRes.name || 'Unknown' : 'Invalid number'}</p>
      <p><strong>Location:</strong> ${numLookupRes.location || 'Unknown'}</p>
      <p><strong>Carrier:</strong> ${ipqsRes.carrier || 'Unknown'}</p>
      <p><strong>Line Type:</strong> ${ipqsRes.line_type || 'Unknown'}</p>
      <p><strong>Risk Score:</strong> ${ipqsRes.fraud_score}/100</p>
      <p><strong>VOIP:</strong> ${ipqsRes.is_voip ? 'Yes' : 'No'}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = "<p>❌ Failed to fetch phone data. Check API keys and connection.</p>";
    console.error(error);
  }
}
