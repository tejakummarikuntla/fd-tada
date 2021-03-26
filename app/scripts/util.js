function sendNotification(type, message) {
    client.instance.send({
      message: {
          type: 'showNotification',
          args: {type: type, message: message}
        }
    });
  }
  
  function generateUuid() {
    return Math.floor(Math.random() * 1000000000);
  }

  function copyToClipboard(text) {
    var input = document.body.appendChild(document.createElement("input"));
    input.value = text;
    input.focus();
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);
}