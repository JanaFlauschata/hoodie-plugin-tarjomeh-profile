HoodieAdmin.extend(function(hoodieAdmin) {
  function send( messageData ) {
    var defer = hoodieAdmin.defer();

    hoodieAdmin.task.start('direct-message', messageData)
    .done( function(message) {
      hoodieAdmin.task.on('remove:direct-message:'+message.id, defer.resolve);
      hoodieAdmin.task.on('error:direct-message:'+message.id, defer.reject);
    })
    .fail( defer.reject );

    return defer.promise();
  };

  function on( eventName, callback ) {
    hoodieAdmin.task.on( eventName + ':direct-message', callback);
  };

  hoodieAdmin.directMessages = {
    send: send,
    on: on
  };
});