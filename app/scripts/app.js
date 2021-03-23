document.onreadystatechange = function () {
  addListeners();
  
  if (document.readyState === 'interactive') renderApp();

  function renderApp() {
    var onInit = app.initialized();

    onInit.then(getClient).catch(handleErr);

    function getClient(_client) {
      window.client = _client;
      client.events.on('app.activated', onAppActivate);
    }
  }
};

function openCreateVocherModal(title, modalData) {
  client.interface.trigger('showModal', {
    title: title,
    template: 'create_vocher.html',
    data: modalData || {}
  });
}

function addListeners() {
  document.getElementById('create-vocher').addEventListener('click', function() {
    openCreateVocherModal('Create Vocher', {
      newVocher: true
    });
  });
}

// document.addEventListener('DOMContentLoaded', function() {
//   addListeners();
// })

function onAppActivate() {
  var textElement = document.getElementById('apptext');
  var getContact = client.data.get('contact');
  getContact.then(showContact).catch(handleErr);

  function showContact(payload) {
    textElement.innerHTML = `Ticket created by ${payload.contact.name}`;
  }
}

function handleErr(err) {
  console.error(`Error occured. Details:`, err);
}
