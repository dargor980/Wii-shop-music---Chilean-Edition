// Save settings
document.querySelector('#music-picker').addEventListener('change', function () {
    chrome.storage.local.set({
        music: document.querySelector('#music-picker').value
    })
})

// Get stored settings
chrome.storage.local.get({
    music: 'wii-shop-theme',
    musicEnabled: 'true'
}, function (data) {
    document.querySelector('#music-picker').value = data.music
    if (data.musicEnabled) {
        document.getElementById('music-toggle').innerText = 'Apagar música de fondo'
    } else {
        document.getElementById('music-toggle').innerText = 'Encender música de fondo'
    }
})

// Music on/off button
document.getElementById('music-toggle').addEventListener('click', function() {
    chrome.storage.local.get({
        musicEnabled: true
    }, function (data) {
        console.log(data)
        if (data.musicEnabled) {
            // Turn off music
            document.getElementById('music-toggle').innerText = 'Encender música de fondo'
            chrome.storage.local.set({
                musicEnabled: false
            })
        } else {
            // Turn on music
            document.getElementById('music-toggle').innerText = 'Apagar música de fondo'
            chrome.storage.local.set({
                musicEnabled: true
            })
        }
    })
})

// Button link functionality
document.querySelectorAll('button[data-link]').forEach(function (el) {
    el.addEventListener('click', function () {
        chrome.tabs.create({ url: el.getAttribute('data-link') })
    })
})

// Pause music when page closes
// This only works on the popup opened from the notification, not the browserAction button
window.addEventListener("beforeunload", function (e) {
    chrome.runtime.sendMessage('pause')
}, false)