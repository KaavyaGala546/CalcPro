export function initHistory() {
    const historyToggle = document.getElementById('history-toggle');
    const historyItems = document.getElementById('history-items');
    const clearHistoryBtn = document.getElementById('clear-history');

    historyToggle.onclick = () => {
        document.querySelector('.container').classList.toggle('show-history');
    };

    let history = JSON.parse(localStorage.getItem('calc-history')) || [];
    updateHistoryUI(history, historyItems);

    clearHistoryBtn.onclick = (e) => {
        e.stopPropagation();
        history = [];
        localStorage.removeItem('calc-history');
        updateHistoryUI(history, historyItems);
    };

    return {
        add: (expr, result) => {
            history.push({ expr, result });
            if (history.length > 20) history.shift();
            localStorage.setItem('calc-history', JSON.stringify(history));
            updateHistoryUI(history, historyItems);
        }
    };
}

function updateHistoryUI(history, container) {
    container.innerHTML = '';
    const display = document.querySelector('.value');
    history.slice().reverse().forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.expr}</span> <span class="res">= ${item.result}</span>`;
        li.onclick = (e) => {
            e.stopPropagation();
            display.value = item.result;
        };
        container.appendChild(li);
    });
}
