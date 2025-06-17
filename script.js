const currentInputElement = document.getElementById('currentInput');
const historyElement = document.getElementById('history');
const themeToggle = document.getElementById('themeToggle');
const toggleScientific = document.getElementById('toggleScientific');
const scientificPanel = document.getElementById('scientificPanel');
const equalsBtn = document.getElementById('equalsBtn');

let currentInput = '0';
let calculationHistory = [];
let isScientificShown = false;

// Initialize
updateDisplay();

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '🌞' : '🌓';
});

// Toggle scientific panel
toggleScientific.addEventListener('click', () => {
    isScientificShown = !isScientificShown;
    scientificPanel.classList.toggle('show');
    toggleScientific.textContent = isScientificShown ? 'Basic ▲' : 'Advanced ▼';
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendToInput(e.key);
    } else if (e.key === '.') {
        appendToInput('.');
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendToInput(e.key);
    } else if (e.key === 'Enter') {
        calculate();
    } else if (e.key === 'Escape') {
        clearAll();
    } else if (e.key === 'Backspace') {
        backspace();
    } else if (e.key === '(' || e.key === ')') {
        appendToInput(e.key);
    }
});

function appendToInput(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    updateDisplay();
}

function backspace() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function calculate() {
    try {
        // Replace display symbols with JavaScript equivalents
        let expression = currentInput
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/\^/g, '**')
            .replace(/√\(/g, 'Math.sqrt(')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(');

        // Save to history before calculating
        const historyEntry = currentInput;
        
        // Evaluate the expression
        const result = eval(expression);
        
        // Add to history
        calculationHistory.push(`${historyEntry} = ${result}`);
        if (calculationHistory.length > 5) {
            calculationHistory.shift();
        }
        
        // Update history display
        historyElement.textContent = calculationHistory.join('; ');
        
        // Set the result as current input
        currentInput = result.toString();
        updateDisplay();
        
        // Add animation to equals button
        equalsBtn.classList.add('active');
        setTimeout(() => {
            equalsBtn.classList.remove('active');
        }, 200);
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        setTimeout(() => {
            currentInput = '0';
            updateDisplay();
        }, 1000);
    }
}

function updateDisplay() {
    currentInputElement.textContent = currentInput;
}