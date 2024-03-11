export function emptyWindowLocationHash(){
    const currentUrl = window.location.href;
    const newCleanedUrl = currentUrl.replace(/#.*$/, '');
    window.history.replaceState({}, document.title, newCleanedUrl);
}