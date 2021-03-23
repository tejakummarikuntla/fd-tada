
function addListeners(){
    document.getElementById("vocher-toggle").addEventListener('fwChange', function(){
        displayValue = document.getElementById("toggle-input").style.display
        if (displayValue == 'block'){
        document.getElementById("toggle-input").style.display = "none"
        } else {
            document.getElementById("toggle-input").style.display = "block"
        }
    })
}

document.addEventListener('DOMContentLoaded', function() {
    addListeners();

    app.initialized().then(function(_client) {
        window.client = _client;
    })
});