document.addEventListener('DOMContentLoaded', init);
let title, notes, clearButton;

function init() {
    title = document.getElementById('title');
    notes = document.getElementById('notes');
    clearButton = document.getElementById('clearButton');

    title.oninput = () => saveToLocalStorage('title', title.value);
    notes.oninput = () => saveToLocalStorage('notes', notes.value);
    clearButton.addEventListener('click', clear);

    title.value = getFromLocalStorage('title');
    notes.value = getFromLocalStorage('notes');
}

function clear() {
    title.value = '';
    notes.value = '';

    localStorage.removeItem('title');
    localStorage.removeItem('notes');
}

//As the user is writing the text (onInput) save the text value to the localStorage.
//If the user comes back to the page, restore the text back in the form, so that the user can resume their information.
function saveToLocalStorage(key, value) {
    if(localStorage) localStorage.setItem(key, value);
}

function getFromLocalStorage(key) {
    let ls;
    if(localStorage) {
        try { ls = localStorage.getItem(key) || ''; }
        catch(e) { console.error(e); }
    }
    return ls;
}
