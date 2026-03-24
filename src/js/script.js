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
        handleInput(item.dataset.button);
    };
});

function handleInput(input) {
    try {
        if (input === 'C') {
            display.value = '';
        } else if (input === 'CE') {
            let string = display.value.toString();
            display.value = string.substr(0, string.length - 1);
        } else if (input === '=') {
            if (display.value !== '') {
                const expr = display.value;
                const result = math.evaluate(expr);
                display.value = result;
                addToHistory(expr, result);
            }
        } else {
            display.value += input;
        }
    } catch (err) {
        console.error(err);
        triggerError();
    }
}

function triggerError() {
    display.value = 'Invalid Entry';
    display.classList.add('shake');
    setTimeout(() => {
        display.value = '';
        display.classList.remove('shake');
    }, 1000);
}

// Keyboard Support
window.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key >= '0' && key <= '9') handleInput(key);
    if (key === '.') handleInput('.');
    if (key === '+') handleInput('+');
    if (key === '-') handleInput('-');
    if (key === '*') handleInput('*');
    if (key === '/') handleInput('/');
    if (key === 'Enter') handleInput('=');
    if (key === 'Backspace') handleInput('CE');
    if (key === 'Escape') handleInput('C');
    if (key === '(') handleInput('(');
    if (key === ')') handleInput(')');
});

// Unit Converter Logic
const converterToggle = document.getElementById('converter-toggle');
const convertType = document.getElementById('convert-type');
const convertFromVal = document.getElementById('convert-from-val');
const convertFromUnit = document.getElementById('convert-from-unit');
const convertToUnit = document.getElementById('convert-to-unit');
const convertRes = document.getElementById('convert-res');

const units = {
    length: { 'm': 1, 'km': 1000, 'cm': 0.01, 'mm': 0.001, 'in': 0.0254, 'ft': 0.3048 },
    weight: { 'kg': 1, 'g': 0.001, 'mg': 0.000001, 'lb': 0.453592, 'oz': 0.0283495 },
    temp: { 'C': 'C', 'F': 'F', 'K': 'K' }
};

converterToggle.onclick = () => {
    document.querySelector('.container').classList.toggle('show-converter');
    updateUnitOptions();
};

function updateUnitOptions() {
    const type = convertType.value;
    const options = Object.keys(units[type]);
    convertFromUnit.innerHTML = options.map(u => `<option value="${u}">${u}</option>`).join('');
    convertToUnit.innerHTML = options.map(u => `<option value="${u}">${u}</option>`).join('');
    performConversion();
}

function performConversion() {
    const type = convertType.value;
    const val = parseFloat(convertFromVal.value);
    const from = convertFromUnit.value;
    const to = convertToUnit.value;

    if (isNaN(val)) {
        convertRes.textContent = '0';
        return;
    }

    if (type === 'temp') {
        let celsius;
        if (from === 'C') celsius = val;
        else if (from === 'F') celsius = (val - 32) * 5 / 9;
        else celsius = val - 273.15;

        let res;
        if (to === 'C') res = celsius;
        else if (to === 'F') res = (celsius * 9 / 5) + 32;
        else res = celsius + 273.15;
        convertRes.textContent = res.toFixed(2);
    } else {
        const res = (val * units[type][from]) / units[type][to];
        convertRes.textContent = res.toFixed(4);
    }
}

[convertType, convertFromVal, convertFromUnit, convertToUnit].forEach(el => {
    el.oninput = performConversion;
});

updateUnitOptions();

