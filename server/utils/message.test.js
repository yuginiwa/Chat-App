const expect = require('expect');

var {generateMessage} = require('./message');

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
})
