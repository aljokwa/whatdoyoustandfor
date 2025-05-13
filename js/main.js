// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('particles').appendChild(renderer.domElement);

// Create particles
const particles = [];
const particleCount = 1000;
const particleGeometry = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    particlePositions[i3] = (Math.random() - 0.5) * 10;
    particlePositions[i3 + 1] = (Math.random() - 0.5) * 10;
    particlePositions[i3 + 2] = (Math.random() - 0.5) * 10;
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
const particleMaterial = new THREE.PointsMaterial({
    color: 0xffd700,
    size: 0.05,
    transparent: true,
    opacity: 0.8
});

const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleSystem);

camera.position.z = 5;

// Background music
const backgroundMusic = new Howl({
    src: ['assets/revolution.mp3'],
    loop: true,
    volume: 0.5
});

// Quiz state
let currentQuestion = 0;
let answers = [];

// Initialize quiz
function initQuiz() {
    const questionsContainer = document.getElementById('questions-container');
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <h2>Question ${index + 1} of ${questions.length}</h2>
            <p>${question.text}</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(index / questions.length) * 100}%"></div>
            </div>
            <div class="options">
                ${question.options.map((option, optionIndex) => `
                    <button onclick="handleAnswer(${optionIndex})">${option}</button>
                `).join('')}
            </div>
        `;
        questionsContainer.appendChild(questionDiv);
    });
    showQuestion(0);
}

// Show question
function showQuestion(index) {
    const questions = document.getElementsByClassName('question');
    for (let i = 0; i < questions.length; i++) {
        questions[i].classList.remove('active');
    }
    questions[index].classList.add('active');
}

// Sound effects
const answerSound = new Howl({
    src: ['assets/answer.mp3'],
    volume: 0.3
});

// Sliding quotes
function createSlidingQuote() {
    const quote = document.createElement('div');
    quote.className = 'sliding-quote';
    quote.textContent = politicalQuotes[Math.floor(Math.random() * politicalQuotes.length)];
    quote.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
    quote.style.left = `${window.innerWidth}px`;
    document.body.appendChild(quote);

    const duration = 15000; // 15 seconds
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        if (progress < 1) {
            const x = window.innerWidth - (window.innerWidth + quote.offsetWidth) * progress;
            quote.style.left = `${x}px`;
            requestAnimationFrame(animate);
        } else {
            quote.remove();
        }
    }

    animate();
}

// Start creating sliding quotes
setInterval(createSlidingQuote, 5000);

// Handle answer
function handleAnswer(answerIndex) {
    answers.push(answerIndex);
    answerSound.play();
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
        updateProgress();
    } else {
        showResult();
    }
}

// Update progress bar
function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
}

// Show result
function showResult() {
    const result = getResult(answers);
    const questionsContainer = document.getElementById('questions-container');
    const resultDiv = document.getElementById('result');
    
    questionsContainer.style.display = 'none';
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h1>Your Revolutionary Ideology</h1>
        <h2>${result.name}</h2>
        <p>${result.description}</p>
        <p class="quote">${result.quote}</p>
        <button onclick="resetQuiz()">Take the Quiz Again</button>
    `;
}

// Reset quiz
function resetQuiz() {
    currentQuestion = 0;
    answers = [];
    const questionsContainer = document.getElementById('questions-container');
    const resultDiv = document.getElementById('result');
    
    questionsContainer.style.display = 'block';
    resultDiv.style.display = 'none';
    showQuestion(0);
    updateProgress();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate particles
    particleSystem.rotation.x += 0.0005;
    particleSystem.rotation.y += 0.0005;
    
    // Move particles
    const positions = particleSystem.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.001;
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start background music
document.addEventListener('click', () => {
    backgroundMusic.play();
}, { once: true });

// Initialize and start
initQuiz();
animate(); 