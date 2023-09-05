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

    const windowWidth = window.innerWidth;
    console.log(`[${TITLE}#updateRootStyles] windowWidth`, windowWidth);

    const windowHeight = window.innerHeight;
    console.log(`[${TITLE}#updateRootStyles] windowHeight`, windowHeight);

    let windowOrientation = 'none';
    if (windowHeight == windowWidth) windowOrientation = 'square';
    else if (windowHeight > windowWidth) windowOrientation = 'portrait';
    else windowOrientation = 'landscape';
    console.log(`[${TITLE}#updateRootStyles] windowOrientation`, windowOrientation);

    const responsiveUnit = Math.max(windowWidth, windowHeight) % Math.min(windowWidth, windowHeight);
    console.log(`[${this.title}#updateRootStyles] responsiveUnit`, responsiveUnit, {
      ratio: `${Math.max(windowWidth, windowHeight)} / ${Math.min(windowWidth, windowHeight)} = ${Math.max(windowWidth, windowHeight) % Math.min(windowWidth, windowHeight)}`,
    });

    root.style.setProperty('--windowOrientation', windowOrientation);
    root.style.setProperty('--windowWidth', `${windowWidth}px`);
    root.style.setProperty('--windowHeight', `${windowHeight}px`);
    root.style.setProperty('--responsiveUnit', `${responsiveUnit}px`);

    const debugElement = document.getElementById('CSS-debug');
    console.log(`[${TITLE}#updateRootStyles] debugElement`, debugElement);

    if (!debugElement) return;

    const computedStyle = window.getComputedStyle(debugElement);
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

    debugElement.innerHTML = `[${elementWindowWidth}, ${elementWindowHeight}] -${elementOrientation} (${elementResponsiveUnit}) <b>${elementFontSize}</b>`;
}