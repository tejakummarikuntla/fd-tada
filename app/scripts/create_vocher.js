const FIELDS_TO_VALIDATE = ['subject', 'description', 'discount', 'validity'];

function getFieldValues() {
    return {
      subject: document.getElementById('voucher-subject').value,
      description: document.getElementById('voucher-description').value,
      discount: Number(document.getElementById('voucher-discount').value),
      validity: document.getElementById('voucher-validity').value
    };
  }

function validateFields() {
    document.querySelectorAll('.validation-message').innerHTML = '';
    var voucherData = getFieldValues();
    var isValid = true;
  
    for (var field of FIELDS_TO_VALIDATE) {
      if (!voucherData[field]) {
        document.getElementById(`${field}-error`).innerHTML = 'Please fill this required field';
        isValid = false;
      }
    }
  
    if ((new Date(voucherData.validity) - new Date(Date.now())) / 1000 / 60 < 10) {
      q('#validity-error').innerHTML = 'Please provide viable validity';
      isValid = false;
    }
  
    // if (voucherData['contact'] && !validEmail(scheduleData['contact'])) {
    //   q('#contact-error').innerHTML = 'Please enter a valid email';
    //   isValid = false;
    // }
    return isValid;
}

function addListeners(){
    document.getElementById("vocher-toggle").addEventListener('fwChange', function(){
        displayValue = document.getElementById("toggle-input").style.display
        if (displayValue == 'block'){
        document.getElementById("toggle-input").style.display = "none"
        } else {
            document.getElementById("toggle-input").style.display = "block"
        }
    })

    document.getElementById('create-voucher').addEventListener('click', function(){
        if(validateFields()){
        client.request.invoke('generateVoucher', {}).then(
            function(data) {
              // data is a json object with requestID and response.
              // data.response gives the output sent as the second argument in renderData.
              document.getElementById('voucher-label').value = data.response
              console.log("server method Request ID is: " + data.requestID);
              console.log("server method response is: " + data.response);
            },
            function(err) {
              // err is a json object with requestID, status and message.
              console.log("Request ID: " + err.requestID);
              console.log("error status: " + err.status);
              console.log("error message: " + err.message);
            });
        }
    })
}

document.addEventListener('DOMContentLoaded', function() {
    addListeners();

    app.initialized().then(function(_client) {
        window.client = _client;
    })
});