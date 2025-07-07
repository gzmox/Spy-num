import axios from 'axios';
import cheerio from 'cheerio';

export async function scrapeNumLookup(number) {
  const url = \`https://www.numlookup.com/\${number.replace('+', '')}\`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const name = $('h1').first().text().trim();
  return { source: 'NumLookup', name };
}
