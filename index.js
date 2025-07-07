import { useState } from 'react';

export default function Home() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(null);

  const lookup = async () => {
    const res = await fetch(\`/api.js?number=\${encodeURIComponent(number)}\`);
    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: 40, fontFamily: 'Arial' }}>
      <h1>🔍 Nummeroppslag</h1>
      <input value={number} onChange={e => setNumber(e.target.value)} placeholder="+4712345678" />
      <button onClick={lookup}>Søk</button>
      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Resultat:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
          {result.name && (
            <a href={\`https://www.google.com/search?q=\${encodeURIComponent(result.name)} site:linkedin.com OR site:facebook.com\`} target="_blank">
              🔗 Søk etter {result.name}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
