document.getElementById('randomBtn').addEventListener('click', async () => {
    try {
      const response = await fetch(chrome.runtime.getURL('/public/holy-grail.csv'));
      const text = await response.text();
      
      const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  
      if (lines.length === 0) {
        alert('No questions found!');
        return;
      }
  
      const randomLine = lines[Math.floor(Math.random() * lines.length)];
  
      // Extract question title
      // Example line: "1. Two Sum 54.5% Easy"
      const match = randomLine.match(/^\d+\.\s+(.+?)\s+\d+(\.\d+)?%/);
      let questionSlug;
      if (match && match[1]) {
        // Convert title to URL-friendly slug
        questionSlug = match[1].toLowerCase().replace(/\s+/g, '-');
      } else {
        alert('Failed to parse question title!');
        return;
      }
  
      const url = `https://leetcode.com/problems/${questionSlug}/`;
      chrome.tabs.create({ url });
  
    } catch (err) {
      console.error(err);
      alert('Failed to load questions.');
    }
  });
  