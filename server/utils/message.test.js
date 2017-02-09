const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var res = {
      from: "Example",
      text: "Sample"
    };

    var message = generateMessage(res.from, res.text);

    expect(message.from).toBe(res.from);
    expect(message.text).toBe(res.text);
    expect(message.createdAt).toBeA("number");
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Admin';
    var latitude = 123;
    var longitude = 456;

    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.url).toBe('https://www.google.com/maps?q=123,456');
    expect(message.from).toBe(from);
  });
});
