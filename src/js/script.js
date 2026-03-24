import * as math from 'mathjs';

const display = document.querySelector('.value');
const buttons = document.querySelectorAll('.calculator button');
const themeToggle = document.getElementById('theme-toggle');
const scientificToggle = document.getElementById('scientific-toggle');
const historyToggle = document.getElementById('history-toggle');
const historyItems = document.getElementById('history-items');
const clearHistoryBtn = document.getElementById('clear-history');

// Theme Toggle Logic
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
if (currentTheme === 'light') themeToggle.textContent = 'Switch to Dark Mode';

themeToggle.onclick = () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        theme = 'light';
        themeToggle.textContent = 'Switch to Dark Mode';
    } else {
        theme = 'dark';
        themeToggle.textContent = 'Switch to Light Mode';
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

// Mode Toggles
scientificToggle.onclick = () => {
    document.querySelector('.container').classList.toggle('scientific');
    scientificToggle.textContent = document.querySelector('.container').classList.contains('scientific') ? 'Standard Mode' : 'Scientific Mode';
};

historyToggle.onclick = () => {
    document.querySelector('.container').classList.toggle('show-history');
};

// History Logic
let history = JSON.parse(localStorage.getItem('calc-history')) || [];
updateHistoryUI();

function updateHistoryUI() {
    historyItems.innerHTML = '';
    history.slice().reverse().forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.expr}</span> <span class="res">= ${item.result}</span>`;
        li.onclick = (e) => {
            e.stopPropagation();
            display.value = item.result;
        };
        historyItems.appendChild(li);
    });
}

function addToHistory(expr, result) {
    history.push({ expr, result });
    if (history.length > 20) history.shift();
    localStorage.setItem('calc-history', JSON.stringify(history));
    updateHistoryUI();
}

clearHistoryBtn.onclick = (e) => {
    e.stopPropagation();
    history = [];
    localStorage.removeItem('calc-history');
    updateHistoryUI();
};

buttons.forEach((item) => {
    if (item.classList.contains('toggle-btn') || item.id === 'clear-history') return;
    
    item.onclick = () => {
        try {
            if (item.dataset.button === 'C') {
                display.value = '';
            } else if (item.dataset.button === 'CE') {
                let string = display.value.toString();
                display.value = string.substr(0, string.length - 1);
            } else if (item.dataset.button === '=') {
                if (display.value !== '') {
                    const expr = display.value;
                    const result = math.evaluate(expr);
                    display.value = result;
                    addToHistory(expr, result);
                }
            } else {
                display.value += item.dataset.button;
            }
        } catch (err) {
            console.error(err);
            display.value = 'Invalid Entry';
            setTimeout(() => (display.value = ''), 1000);
        }
    };
});

