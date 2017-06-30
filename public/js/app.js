if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
        .then(swReg =>console.log('Service Worker is registered', swReg))
        .catch(error => console.error('Service Worker Error', error));
    })
} else {
    console.warn('serviceWorker is not supported by your browser');
}
