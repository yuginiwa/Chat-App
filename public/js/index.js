var socket = io();

var formattedTime = function (createdAt) {
  return moment(createdAt).format('h:mm a');
}

function scrollBottom () {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', function ()  {
  console.log('connected');
});

socket.on('disconnect', function ()  {
  console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime(message.createdAt)
  });

  jQuery('#messages').append(html);
  scrollBottom();
  // New code for rendering using mustache
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime(message.createdAt)}: ${message.text}`);
  //
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime(message.createdAt)
  });

  jQuery('#messages').append(html);
  scrollBottom();
  // New code for rendering using mustache
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  //
  // li.text(`${message.from} ${formattedTime(message.createdAt)}: `);
  // a.attr('href', message.url);
  // li.append(a);
  //
  // jQuery('#messages').append(li);
});

// Event Acknowledgements
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: "User",
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});
