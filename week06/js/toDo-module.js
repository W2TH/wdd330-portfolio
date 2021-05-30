export function readFromLS(key) {
    return JSON.parse(localStorage.getItem(key))
};

export function writeToLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
};

export function qs(selector) {
    let selected = document.querySelector(selector)
    return (selected.length === 0 ? null : selected)
};

export function onTouch(elementSelector, callback) {
    if (window.matchMedia("(pointer: coarse)").matches) {
        elementSelector.addEventListener('touchend', callback)
        console.log(`touchend listener added to ${elementSelector}`);
    } else {
        elementSelector.addEventListener('click', callback)
    }
};