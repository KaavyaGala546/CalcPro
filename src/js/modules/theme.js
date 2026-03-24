export function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
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
}
