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