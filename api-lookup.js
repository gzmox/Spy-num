export default async function (req, res) {
  const { number } = req.query;
  if (!number) {
    return res.status(400).json({ error: 'Missing phone number' });
  }

  try {
    const apiUrl = `https://numvalidate.com/api/validate?number=${encodeURIComponent(number)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'API request failed' });
  }
}
