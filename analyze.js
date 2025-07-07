export function analyzeData(results) {
  const names = results.map(r => r.name).filter(n => n);
  const mostCommon = names.sort((a, b) =>
    names.filter(n => n === a).length - names.filter(n => n === b).length
  ).pop();
  return {
    name: mostCommon || null,
    sources: results
  };
}
