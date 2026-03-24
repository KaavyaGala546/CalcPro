import { initTheme } from './modules/theme.js';
import { initHistory } from './modules/history.js';
import { initCalculator } from './modules/calculator.js';
import { initConverter } from './modules/converter.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    const historyManager = initHistory();
    initCalculator(historyManager);
    initConverter();
});
