import axios from 'axios';
import cheerio from 'cheerio';

export async function scrapeTellows(number) {
  const clean = number.replace(/\+/g, '').replace(/\s/g, '');
  const url = \`https://www.tellows.com/num/\${clean}\`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const score = $('span.score').first().text().trim();
  const name = $('h2').first().text().trim();
  return { source: 'Tellows', name, score };
}
