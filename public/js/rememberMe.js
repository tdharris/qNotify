$(document).ready(function () {
    var checkbox = $('#remember-me'),
        uField = $('#username'),
        eField = $('#email'),
        pField = $('#phone'),
        cField = $('#carrier'),
 
    // assign the key name to a variable
        uKey = 'savedUsername',
        eKey = 'savedEmail',
        pKey = 'savedPhone',
        cKey = 'savedCarrier';

    // use jStorage to retrieve stored keys
        console.log("Checking for jStorage key.");
        username = $.jStorage.get(uKey);
        email = $.jStorage.get(eKey);
        phone = $.jStorage.get(pKey);
        carrier = $.jStorage.get(cKey);
        
    // if found, set value, tick checkbox
    if (username || email || phone || carrier) {
        console.log("Key found.");
        uField.val(username);
        eField.val(email);
        pField.val(phone);
        cField.val(carrier);
        checkbox.prop('checked', true);
        // $('#add').focus();
    }

    // if not found, set focus, untick checkbox
    else {
        console.log("No key found.");
        uField.val('').focus();
        checkbox.prop('checked', false);
    }

    // upon submit, if checkbox is checked, store keys
    // otherwise, checkbox is unchecked, remove keys
    $('#add, #remove').on('click', function(e){
      console.log("Add clicked.");
        if (checkbox.prop('checked')) {
          console.log("Remember checked, save key.");
            $.jStorage.set(uKey, uField.val());
            $.jStorage.set(eKey, eField.val());
            $.jStorage.set(pKey, pField.val());
            $.jStorage.set(cKey, cField.val());
        }
        else {
            console.log("Remember unchecked, remove key.");
            $.jStorage.deleteKey(uKey);
            $.jStorage.deleteKey(eKey);
            $.jStorage.deleteKey(pKey);
            $.jStorage.deleteKey(cKey);
        }
    });
});