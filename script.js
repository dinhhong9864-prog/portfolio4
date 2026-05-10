const loadingScreen = document.getElementById('loadingScreen');
const themeToggle = document.getElementById('themeToggle');
const cursor = document.getElementById('customCursor');
const revealElements = document.querySelectorAll('.reveal');
const typingText = document.querySelector('.typing-text');
const typingPhrases = ['một người đang lớn lên cùng nghệ thuật và công nghệ', 'một tâm hồn sáng tạo luôn tìm kiếm cảm xúc', 'một designer thích màu pastel và câu chuyện nhỏ'];
let typingIndex = 0;
let charIndex = 0;
let currentPhrase = '';
let typingForward = true;

window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 800);
  startTyping();
  revealOnScroll();
});

window.addEventListener('mousemove', event => {
  cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});

const interactiveElements = document.querySelectorAll('a, button');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '40px';
    cursor.style.height = '40px';
    cursor.style.background = 'rgba(255, 158, 189, 0.9)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '18px';
    cursor.style.height = '18px';
    cursor.style.background = 'rgba(139, 98, 255, 0.8)';
  });
});

function startTyping() {
  const phrase = typingPhrases[typingIndex];
  if (typingForward) {
    typingText.textContent = phrase.slice(0, ++charIndex);
    if (charIndex === phrase.length) {
      typingForward = false;
      setTimeout(startTyping, 1800);
      return;
    }
  } else {
    typingText.textContent = phrase.slice(0, --charIndex);
    if (charIndex === 0) {
      typingForward = true;
      typingIndex = (typingIndex + 1) % typingPhrases.length;
    }
  }
  setTimeout(startTyping, typingForward ? 80 : 40);
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
});

function revealOnScroll() {
  const options = {
    threshold: 0.18,
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, options);

  revealElements.forEach(el => observer.observe(el));
}
