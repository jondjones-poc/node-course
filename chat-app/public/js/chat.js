const socket = io();

const sendLocationText = 'Send Location';

function scrollToBottom(messages) {
    // Selectors
    const newMessage = messages.children('li:last-child');

    // Heights
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');

    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    };
};

socket.on('connect', () => {
    console.log('Connected');

    const params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (error) {
        if (error) {
            alert(error);
            window.location.href = '/';
        } else {
            console.log('Logged In Successfully');
        }
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected');
});

socket.on('updateUserList', (users) => {
    const ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});

socket.on('newMessage', (message) => {
    const formattedTime = moment(message.createdAt);
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
        time: formattedTime.format('hh:mm:ss'),
        from: message.from,
        text: message.text
    });

    const messages = jQuery('#messages');
    messages.append(html);
    scrollToBottom(messages);
});

socket.on('newLocationMessage', (message) => {
    console.log('hi');
    const formattedTime = moment(message.createdAt);
    const template = jQuery('#location-template').html();
    const html = Mustache.render(template, {
        time: formattedTime.format('hh:mm:ss'),
        from: message.from,
        url: message.url
    });

    const messages = jQuery('#messages');
    messages.append(html);
    scrollToBottom(messages);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault(); 

    let messageTextbox = jQuery('[name=message]');

    console.log('Message Subtmitted');
    socket.emit('createMessage', {
        text: messageTextbox.val()
    }, function (data) {
        console.log('Message Trasmitted Successfully.', data);
        messageTextbox.val('');
    });
});

const locationButton = jQuery('#location-button');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        alert('Your browser does not support this');
        return;
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text(sendLocationText);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function (data) {
            console.log('Message Trasmitted Successfully.', data)
        });

    }, function () {
        alert('Unable to find location');
        locationButton.removeAttr('disabled').text(sendLocationText);
        return;
    });
});