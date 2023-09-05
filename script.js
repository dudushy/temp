const TITLE = "temp";

console.log(`[${TITLE}] init`);

updateRootStyles();

window.addEventListener('resize', () => {
    console.log(`[${TITLE}] window.resize`);

    updateRootStyles();
});			

function updateRootStyles() {
    const root = document.documentElement;
    console.log(`[${TITLE}#updateRootStyles] root`, root);
    console.log(`[${TITLE}#updateRootStyles] root.style`, root.style);

    const windowWidth = root.clientWidth;
    console.log(`[${TITLE}#updateRootStyles] windowWidth`, windowWidth);

    const windowHeight = root.clientHeight;
    console.log(`[${TITLE}#updateRootStyles] windowHeight`, windowHeight);

    root.style.setProperty('--windowWidth', `${windowWidth}px`);
    root.style.setProperty('--windowHeight', `${windowHeight}px`);

    const responsiveElement = document.getElementById('CSS-responsive');
    console.log(`[${TITLE}#updateRootStyles] responsiveElement`, responsiveElement);

    if (!responsiveElement) return;

    const computedStyle = window.getComputedStyle(responsiveElement);
    console.log(`[${TITLE}#updateRootStyles] computedStyle`, computedStyle);

    const elementFontSize = computedStyle.getPropertyValue('font-size');
    console.log(`[${TITLE}#updateRootStyles] elementFontSize`, elementFontSize);

    const elementOrientation = computedStyle.getPropertyValue('--windowOrientation');
    console.log(`[${TITLE}#updateRootStyles] elementOrientation`, elementOrientation);

    const elementWindowWidth = computedStyle.getPropertyValue('--windowWidth');
    console.log(`[${TITLE}#updateRootStyles] elementWindowWidth`, elementWindowWidth);

    const elementWindowHeight = computedStyle.getPropertyValue('--windowHeight');
    console.log(`[${TITLE}#updateRootStyles] elementWindowHeight`, elementWindowHeight);

    const elementResponsiveUnit = computedStyle.getPropertyValue('--responsiveUnit');
    console.log(`[${TITLE}#updateRootStyles] elementResponsiveUnit`, elementResponsiveUnit);

    const debugElement = document.getElementById('CSS-debug');
    console.log(`[${TITLE}#updateRootStyles] debugElement`, debugElement);

    if (!debugElement) return;

    debugElement.innerHTML = `[${elementWindowWidth}, ${elementWindowHeight}] - ${elementOrientation} (${elementResponsiveUnit}) <b>${elementFontSize}</b>`;
}