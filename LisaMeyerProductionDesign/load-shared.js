
async function loadHTML(id, url, isHead = false) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
    const text = await response.text();
    const container = document.getElementById(id);
    if (isHead) {
      // For head, inject HTML as actual DOM nodes
      container.innerHTML = text;
      // Optionally handle scripts or styles here if needed
    } else {
      container.innerHTML = text;
    }
  } catch (e) {
    console.error(e);
  }
}

loadHTML('head-placeholder', 'head.html', true);
loadHTML('header-placeholder', 'header.html');
loadHTML('footer-placeholder', 'footer.html');