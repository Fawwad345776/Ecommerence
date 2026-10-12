const fs = require('fs');

function checkFile(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  const lines = content.split('\n');
  const urduWords = [
    'karein', 'apna', 'jayein', 'mein', 'hoga', 'shukriya', 'darj', 'bhi', 'hain',
    'paisa', 'dena', 'hongay', 'rakhein', 'kisi', 'tarna', 'wala', 'wali', 'kare',
    'chahiye', 'sakta', 'sakti', 'sakten', 'ho gaya', 'se bahar', 'barah-e-karam',
    'peeche', 'aage', 'dono', 'pehla', 'dusra', 'khul', 'tasweer', 'likhein', 'par'
  ];

  console.log(`=== Matches in ${filename} ===`);
  lines.forEach((line, idx) => {
    const lower = line.toLowerCase();
    for (const w of urduWords) {
      // word boundary check
      const regex = new RegExp(`\\b${w}\\b`, 'i');
      if (regex.test(lower)) {
        console.log(`Line ${idx + 1}: ${line.trim()}`);
        break;
      }
    }
  });
}

checkFile('index.html');
checkFile('app.js');
