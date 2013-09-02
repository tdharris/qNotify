$(function() {
  getUsers();
  // Only allow numbers for phone number field
  $('#phone').on('keypress', function(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
  });

  // jQuery form (collection, array-like object) to native form (returns html element)
  var form = $('#addNotify')[0];

  function buildObject() {
    var object = {}
    
    if (form.username.value) { 
        object.username = form.username.value; 

      if (form.email.value) { 
        object.email = form.email.value; 
      }

      if (form.phone.value && form.carrier.value) {
        var carriers = {
          'Verizon': '@vtext.com',
          'Sprint': '@messaging.sprintpcs.com',
          'AT&T': '@txt.att.net',
          'T-Mobile': '@tmomail.net',
          'All Tell': '@message.alltel.com',
          'Boost': '@myboostmobile.com',
          'Cellular South': '@csouth1.com',
          'Centennial Wireless': '@cwemail.com',
          'Cincinnati Bell': '@gocbw.com',
          'Cricket Wireless': '@sms.mycricket.com',
          'Metro PCS': '@mymetropcs.com',
          'Powertel': '@ptel.net',
          'Qwest': '@qwestmp.com',
          'Rogers': '@pcs.rogers.com',
          'Suncom': '@tms.suncom.com',
          'Telus': '@msg.telus.com',
          'U.S. Cellular': '@email.uscc.net',
          'Virgin Mobile USA': '@vmobl.com',
        };
        object.txt = form.phone.value + carriers[form.carrier.value];
      }
    }
    else {
      $('#alert_placeholder').html('<div class="alert alert-error fade in" style="max-width: 220px; margin: 0 auto 0;"><a class="close" data-dismiss="alert">×</a><span>Name required.</span></div>')
    };

    

    return object;
  }

  function alertTimeout(wait){
      setTimeout(function(){
          $('#alert_placeholder').children('.alert:first-child').remove();
      }, wait);
  };

  function addNotify() {
    var object = buildObject();
    var request;
    if (!jQuery.isEmptyObject(object)) {
      object = JSON.stringify(object);
      console.log(object);
      request = $.ajax({
        url: "/addNotify",
        type: "post",
        data: object,
        contentType: "application/json"
      });

      request.done(function (response, textStatus, jqXHR){
        $('#alert_placeholder').html('<div class="alert alert-success fade in" style="max-width: 220px; margin: 0 auto 0;"><a class="close" data-dismiss="alert">×</a><span>Added to Notification List.</span></div>')
        console.log("Request sent to server.");
        getUsers();
        // alertTimeout(2000);
      });

      request.fail(function (jqXHR, textStatus, errorThrown){
        $('#alert_placeholder').html('<div class="alert alert-error pull-right fade in" style="max-width: 220px; margin: 0 auto 0;"><a class="close" data-dismiss="alert">×</a><span>An error has occurred.</span></div>') 
        console.error(
          "The following error occured: "+
          textStatus, errorThrown
        );
      });

    }
  }

  function removeNotify() {
    var object = buildObject();
    var request;
    if (!jQuery.isEmptyObject(object)) {
      object = JSON.stringify(object);
      console.log(object);
      request = $.ajax({
        url: "/removeNotify",
        type: "post",
        data: object,
        contentType: "application/json"
      });

      request.done(function (response, textStatus, jqXHR){
        $('#alert_placeholder').html('<div class="alert fade in" style="max-width: 220px; margin: 0 auto 0;"><a class="close" data-dismiss="alert">×</a><span>Removed from Notification List.</span></div>')
        console.log("Request sent to server.");
        getUsers();
      });

      request.fail(function (jqXHR, textStatus, errorThrown){
        $('#alert_placeholder').html('<div class="alert alert-error pull-right fade in" style="max-width: 220px; margin: 0 auto 0;"><a class="close" data-dismiss="alert">×</a><span>An error has occurred.</span></div>') 
        console.error(
          "The following error occured: "+
          textStatus, errorThrown
        );
      });

    }
  }

  function getUsers() {
    request = $.ajax({
        url: "/getUsers",
        type: "post",
        contentType: "application/json"
      });

      request.done(function (response, textStatus, jqXHR){
        $('#myUsers').html("");
          $('#uList').addClass('in');
          $.each(response, function(index, value) {
          $('#myUsers').append("<li><i class=\"icon-chevron-sign-right\"></i>" + value+ "</li>")
          });
        
        
        console.log("Request sent to server.");
      });

      request.fail(function (jqXHR, textStatus, errorThrown){
        $('#alert_placeholder').html('<div class="alert alert-error pull-right fade in" style="max-width: 220px; margin: 0 auto 0;"><a class="close" data-dismiss="alert">×</a><span>An error has occurred.</span></div>') 
        console.error(
          "The following error occured: "+
          textStatus, errorThrown
        );
      });
  };
  

  $('#add').on('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    addNotify();
    return false;
  });

  $('#remove').on('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    removeNotify();
    return false;
  });

});
// jQuery.post(
    // "?",
    // jQuery.param({
    // dataObject: dataStuff
    // }),
    // function (data) {
    // data = JSON.parse(data);
    // }
    // );
      // $.post('/save-it', data)
      //   .success(function(response) {
      //     console.log('it worked: ', response);
      //   }).fail(function(response) {
      //     alert('oops!');
      //   });

      // jQuery.post(
      // "/sendObject",
      // jQuery.param({
      //   report: "Ajax",
      //   action: "getFilterValues"
      //   }),
      //   function (data) {
      //   data = JSON.parse(object););
      //   }
      // );
// # Major US Carriers
//     # AT&T – @txt.att.net
//     # Sprint – @messaging.sprintpcs.com
//     # T-Mobile – @tmomail.net
//     # Verizon – @vtext.com

//   # Other Carriers
//     # All Tell – @message.alltel.com
//     # Boost – @myboostmobile.com
//     # Cellular South – @csouth1.com
//     # Centennial Wireless – @cwemail.com
//     # Cincinnati Bell – @gocbw.com
//     # Cricket Wireless – @sms.mycricket.com
//     # Metro PCS – @mymetropcs.com
//     # Powertel – @ptel.net
//     # Qwest – @qwestmp.com
//     # Rogers – @pcs.rogers.com
//     # Suncom – @tms.suncom.com
//     # Telus – @msg.telus.com
//     # U.S. Cellular – @email.uscc.net
//     # Virgin Mobile USA – @vmobl.com


      // $.ajax({
      //   url: '/addNotify', 
      //   type: "POST",
      //   dataType: "json",
      //   data: object
      //   contentType: "application/json"
      // })
      //   .success(function(response) {
      //     console.log('Server response: ', response);
      //     $('#alert_placeholder').html('<div class="alert alert-info fade in" style="max-width: 220px; margin: 0 auto 0;"><a class="close" data-dismiss="alert">×</a><span>Added to Notification List.</span></div>')
      //   }).fail(function(response) {
      //     $('#alert_placeholder').html('<div class="alert alert-error pull-right fade in" style="max-width: 220px; margin: 0 auto 0;"><a class="close" data-dismiss="alert">×</a><span>An error has occurred.</span></div>')
      //     console.log('Server response: ', response);
      //   });

      // $.ajax({
      //   url: "/addNotify",
      //   type: "POST",
      //   dataType: "json",
      //   data: object,
      //   contentType: "application/json",
      //   cache: false,
      //   timeout: 5000,
      //   complete: function(data) {
      //     // server notified
      //     console.log('Request sent to server.');
      //   },

      //   success: function(data) {
      //     // server's response
      //     $('#alert_placeholder').html('<div class="alert alert-info pull-right fade in"><a class="close" data-dismiss="alert">×</a><span>'+'Added successfully.'+'</span></div>')
      //     console.log(data);
      //     console.log('Server successfully updated.');
      //  },

      //   error: function(data) {
      //     $('#alert_placeholder').html('<div class="alert alert-error pull-right fade in"><a class="close" data-dismiss="alert">×</a><span>'+'An error has occurred.'+'</span></div>')
      //     console.log('An error has occurred.');
      //   },
      // });