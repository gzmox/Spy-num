export function createSearchUrl(name) {
  const query = encodeURIComponent(\`\${name} site:linkedin.com OR site:facebook.com\`);
  return \`https://www.google.com/search?q=\${query}\`;
}
