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

function openListVouchersModal() {
  client.interface.trigger('showModal', {
    title: 'List of vouchers created',
    template: 'list_vouchers.html'
  });
}
function addListeners() {
  document.getElementById('create-voucher').addEventListener('click', function() {
    openCreateVocherModal('Create Vocuher', {
      newVocher: true
    });
  });

  document.getElementById('list-vouchers').addEventListener('click', function() {
    // openListVouchersModal();
    dispVouchers();
  });
}

// document.addEventListener('DOMContentLoaded', function() {
//   addListeners();
// })

function dispVouchers() {
  client.db.get("vouchers").then(function (dbData) {
    let keysArr = Object.keys(dbData).reverse();
    keysArr = keysArr.slice(0, 5);
    let vou = [];
    keysArr.forEach((element) => {
      vou.push(`<div class="lookup">
      <label class="tada-app-label text--xsmall lookup-body">Voucher Subject</label>
      <p class="lookup-body">${dbData[element].subject}</p>
      <label class="tada-app-label text--xsmall lookup-body">Voucher Descriptioon </label>
      <p class="lookup-body">${dbData[element].description}</p>
      <label class="tada-app-label text--xsmall lookup-body">Discount(%)</label>
      <p class="lookup-body">${dbData[element].discount}</p>
      <label class="tada-app-label text--xsmall lookup-body">Vouchere Code</label>
      <fw-label class="lookup-body" value="${dbData[element].voucher}" color="green"></fw-label>
    </div>`);
    });
    document.querySelector("#values").innerHTML = vou.join(
      ""
    );
  }),
    function (error) {
      console.error(error);
    };
}

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
