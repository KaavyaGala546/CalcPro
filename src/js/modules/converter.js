import { UI } from './ui.js';

export function initConverter() {
    const converterToggle = document.getElementById('converter-toggle');
    const convertType = document.getElementById('convert-type');
    const convertFromVal = document.getElementById('convert-from-val');
    const convertFromUnit = document.getElementById('convert-from-unit');
    const convertToUnit = document.getElementById('convert-to-unit');
    const convertRes = document.getElementById('convert-res');

    const units = {
        length: { 'm': 1, 'km': 1000, 'cm': 0.01, 'mm': 0.001, 'in': 0.0254, 'ft': 0.3048 },
        weight: { 'kg': 1, 'g': 0.001, 'mg': 0.000001, 'lb': 0.453592, 'oz': 0.0283495 },
        temp: { 'C': 'C', 'F': 'F', 'K': 'K' },
        currency: {}
    };

    let exchangeRates = null;

    async function fetchExchangeRates() {
        try {
            UI.setLoading(convertRes, true);
            const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await res.json();
            exchangeRates = data.rates;
            units.currency = exchangeRates;
            if (convertType.value === 'currency') updateUnitOptions();
        } catch (err) {
            convertRes.textContent = 'Error loading rates';
        }
    }

    const updateUnitOptions = () => {
        const type = convertType.value;
        if (type === 'currency' && !exchangeRates) {
            fetchExchangeRates();
            return;
        }
        const options = Object.keys(units[type]);
        convertFromUnit.innerHTML = options.map(u => `<option value="${u}">${u}</option>`).join('');
        convertToUnit.innerHTML = options.map(u => `<option value="${u}">${u}</option>`).join('');
        performConversion();
    };

    const performConversion = () => {
        const type = convertType.value;
        const val = parseFloat(convertFromVal.value);
        const from = convertFromUnit.value;
        const to = convertToUnit.value;

        if (isNaN(val)) {
            convertRes.textContent = '0';
            return;
        }

        if (type === 'temp') {
            let celsius = from === 'C' ? val : from === 'F' ? (val - 32) * 5/9 : val - 273.15;
            let res = to === 'C' ? celsius : to === 'F' ? (celsius * 9/5) + 32 : celsius + 273.15;
            convertRes.textContent = res.toFixed(2);
        } else if (type === 'currency') {
            if (!exchangeRates) return;
            const res = (val / exchangeRates[from]) * exchangeRates[to];
            convertRes.textContent = res.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        } else {
            const res = (val * units[type][from]) / units[type][to];
            convertRes.textContent = res.toFixed(4);
        }
    };

    converterToggle.onclick = () => {
        UI.togglePanel('.container', 'show-converter');
        if (exchangeRates === null) fetchExchangeRates();
        updateUnitOptions();
    };

    convertType.onchange = updateUnitOptions;
    [convertFromVal, convertFromUnit, convertToUnit].forEach(el => el.oninput = performConversion);

    updateUnitOptions();
}
