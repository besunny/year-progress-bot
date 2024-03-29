const TelegramBot = require('node-telegram-bot-api');
const PersianDate = require('persian-date');
const DayPercentage = require('./percentage.js')

// replace the value below with the Telegram token you receive from @BotFather
const token = '860279432:AAGqsuBdxUwrK9JdHA9hC7o5a42KRe3CQtk';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, function (msg, match) {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/start/, function onStart(msg) {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        [{ text: 'Show Today\'s Date' }],
        [{ text: 'Today\'s Percentage!' }]
      ],
      resize_keyboard: true
    })
  };
  bot.sendMessage(msg.chat.id, 'Do you love me?', opts);
});

bot.onText(/Show Today\'s Date/, function (msg, match) {
  console.log("DONE!")
  const chatId = msg.chat.id;
  const showDate = new PersianDate()
  const date = showDate.format();

  bot.sendMessage(chatId, 'This Year:' + date);
}
)

bot.onText(/Today\'s Percentage!/, function (msg) {
  const chatId = msg.chat.id;
  const percentage = DayPercentage.calculate();

  bot.sendMessage(chatId, 'Today\'s Percentage:\n' + generateProgressBar(percentage) + ' ' + Math.round(percentage) + '% ');
}
)

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', function (msg) {
  const chatId = msg.chat.id;
  console.log(msg)
  // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(chatId, 'Received your message');
});



function generateProgressBar(percentage) {
  var x = Math.floor(20 * percentage / 100);
  var y = 20 - x;
  var a = '';
    console.log(x, percentage)
  for (var i = 0; i < x; i++) {
    a += "⣿"
  }

  for (var j = 0; j < y; j++) {
    a += "⣀"
  }

  return a;
}

