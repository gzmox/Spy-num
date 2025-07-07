import { scrapeNumLookup } from './numlookup.js';
import { scrapeTellows } from './tellows.js';
import { analyzeData } from './analyze.js';

export default async function handler(req, res) {
  const { number } = req.query;
  if (!number) return res.status(400).json({ error: 'Nummer mangler' });

  const results = await Promise.allSettled([
    scrapeNumLookup(number),
    scrapeTellows(number)
  ]);

  const data = results.filter(r => r.status === 'fulfilled').map(r => r.value);
  const finalResult = analyzeData(data);
  res.status(200).json(finalResult);
}
