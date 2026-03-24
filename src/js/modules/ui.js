export const UI = {
    triggerError: (element) => {
        const originalValue = element.value;
        element.value = 'Invalid Entry';
        element.classList.add('shake');
        setTimeout(() => {
            element.value = '';
            element.classList.remove('shake');
        }, 1000);
    },

    togglePanel: (containerSelector, classToToggle) => {
        document.querySelector(containerSelector).classList.toggle(classToToggle);
    },

    setLoading: (element, isLoading) => {
        if (isLoading) {
            element.textContent = 'Loading...';
        } else {
            element.textContent = '0';
        }
    }
};
