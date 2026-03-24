import { UI } from './ui.js';

export function initCalculator(historyManager) {
    const display = document.querySelector('.value');
    const buttons = document.querySelectorAll('.calculator button');
    const scientificToggle = document.getElementById('scientific-toggle');

    scientificToggle.onclick = () => {
        const container = document.querySelector('.container');
        container.classList.toggle('scientific');
        scientificToggle.textContent = container.classList.contains('scientific') ? 'Standard Mode' : 'Scientific Mode';
    };

    buttons.forEach((item) => {
        if (item.classList.contains('toggle-btn') || item.id === 'clear-history') return;
        item.onclick = () => handleInput(item.dataset.button, display, historyManager);
    });

    window.addEventListener('keydown', (e) => {
        const key = e.key;
        const map = {
            'Enter': '=', 'Backspace': 'CE', 'Escape': 'C',
            '*': '*', '/': '/', '+': '+', '-': '-', '.': '.'
        };
        if ((key >= '0' && key <= '9') || map[key] || key === '(' || key === ')') {
            handleInput(map[key] || key, display, historyManager);
        }
    });
}

function handleInput(input, display, historyManager) {
    try {
        if (input === 'C') {
            display.value = '';
        } else if (input === 'CE') {
            display.value = display.value.toString().slice(0, -1);
        } else if (input === '=') {
            if (display.value !== '') {
                const result = math.evaluate(display.value);
                historyManager.add(display.value, result);
                display.value = result;
            }
        } else {
            display.value += input;
        }
    } catch (err) {
        UI.triggerError(display);
    }
}
