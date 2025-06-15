const copyBtn = document.getElementById('copy-btn');

copyBtn.addEventListener('click', () => {
  const textToCopy = document.getElementById('main-label').textContent;

  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy text';
      }, 1500);
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
    });
});

//==============================================

let jsonData = null;

async function loadJsonData() {
  try {
    const response = await fetch('parts.json');
    jsonData = await response.json();
    
    startApp();
  } catch (err) {
    console.error('Failed to load JSON:', err);
  }
}

function randomElement(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

function getPhraze(){
  return randomElement(jsonData.subject) + " is like " + randomElement(jsonData.metaphor) + ". " + randomElement(jsonData.followUps);

}

function startApp() {
  document.getElementById('generate').addEventListener('click', function() {
    
    let targetString = getPhraze()

    let count = 0;
    const speed = 150;
    let lastTime = null;

    requestAnimationFrame(function loop(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      count += speed * delta;

      document.getElementById('main-label').textContent = targetString.slice(0, Math.floor(count));

      if (count >= targetString.length) {
        document.getElementById('main-label').textContent = targetString;
        return;
      }

      requestAnimationFrame(loop);
    });

  });

}



loadJsonData();

