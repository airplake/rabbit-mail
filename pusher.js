/* eslint no-console: 0 */

'use strict';

// This script pushes randomly generated messages to RabbitMQ for sending
// Run it to fill outgoing queue with pending messages for the sender.js to handle

var amqp = require('amqp');

var queueHost = 'amqp://guest:guest@localhost';
var queueName = 'mail';

var totalMessages = 1; //消息总数

// Create connection to RabbitMQ
var queueConnection = amqp.createConnection({
    url: queueHost
});

queueConnection.on('ready', function () {
    for (var i = 0; i < totalMessages; i++) {
        var message = {
            to: 'XXX@xx.com', //收件人
            subject: 'Test message #' + i, //标题
            text: 'Current date: ' + Date() //内容
        };

        queueConnection.publish(queueName, message, {
            contentType: 'application/json'
        });
    }

    console.log('Pushed %s messages to queue', totalMessages);
});
