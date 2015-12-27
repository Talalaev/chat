var socket = io();

      function showStatus(status, message) {
        document.querySelector('[data-status]').innerHTML = message || status;
        document.querySelector('[data-status]').setAttribute('data-status', status);
      }

      socket
        .on('error', function(message) {
          console.error(message);
          showStatus('error', message);
        });

      'connect disconnect reconnect reconnecting reconnect_failed'.split(' ').forEach(function(event) {
        socket.on(event, function() {
          showStatus(event);
        })
      });

      socket.on('logout', function(data) {
        socket.disconnect();
        alert("You logged out");
        window.location.reload();
      })
      socket.on('news', function(data) {
        console.log(data);
        socket.emit('my other event', {my: 'data'});
      });
      socket.on('message', function(data) {
        console.log(data);
      });