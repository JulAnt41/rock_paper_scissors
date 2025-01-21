const { Bot, InlineKeyboard } = require('grammy');

const bot = new Bot('7449980150:AAGD6GaayQ75IQ1O6siIeRQh6Ju5RiCV6-k');

bot.command('start', (ctx) => {
    ctx.reply('Привет! Добро пожаловать в игровой бот! Здесь вы можете сыграть в "Камень, Ножницы, Бумага".\n\nВот краткое объяснение правил игры:\n1. Вы можете начать новую игру, используя команду /play.\n2. После начала игры выберите кнопку "Камень", "Ножницы" или "Бумага" для своей ставки.\n3. Бот случайным образом выберет один из трех вариантов.\n4. После определения результата я сообщу вам, выиграли ли вы.\n5. Используйте команду /help для получения информации о правилах игры и доступных командах.\nУдачи! 🍀');
});

bot.command('help', (ctx) => {
    ctx.reply('Правила игры и команды\n\nКоманды, доступные в игре:\n/start: Приветствие пользователя и объяснение правил игры.\n/play: Начало новой игры. Сделайте свою ставку: "Камень", "Ножницы" или "Бумага".\n/help: Получите информацию о правилах игры и командах.\n\nПравила игры:\n1. Сделайте свою ставку: Выберите между "Камень", "Ножницы" и "Бумага".\n2. Бот случайным образом выберет один из трех вариантов.\n3. Получив результат, вы можете выбрать, хотите ли сыграть еще раз.\n\nНадеюсь, это поможет вам насладиться игрой. Удачи! 🎲');
});

bot.command('play', (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('Камень', 'rock')
        .row()
        .text('Ножницы', 'scissors')
        .row()
        .text('Бумага', 'paper');

    ctx.reply('Сделайте ставку:', { reply_markup: keyboard });
});

bot.callbackQuery('rock', async (ctx) => {
    const options = ['камень', 'ножницы', 'бумага'];
    const botChoice = options[Math.floor(Math.random() * options.length)];
    const resultText = determineWinner('камень', botChoice);
    
    await ctx.reply(resultText);
    await askToPlayAgain(ctx);
});

bot.callbackQuery('scissors', async (ctx) => {
    const options = ['камень', 'ножницы', 'бумага'];
    const botChoice = options[Math.floor(Math.random() * options.length)];
    const resultText = determineWinner('ножницы', botChoice);
    
    await ctx.reply(resultText);
    await askToPlayAgain(ctx);
});

bot.callbackQuery('paper', async (ctx) => {
    const options = ['камень', 'ножницы', 'бумага'];
    const botChoice = options[Math.floor(Math.random() * options.length)];
    const resultText = determineWinner('бумага', botChoice);
    
    await ctx.reply(resultText);
    await askToPlayAgain(ctx);
});

function determineWinner(userChoice, botChoice) {
    if (userChoice === botChoice) {
        return `Ничья! Вы оба выбрали ${botChoice}.`;
    } else if (
        (userChoice === 'камень' && botChoice === 'ножницы') ||
        (userChoice === 'ножницы' && botChoice === 'бумага') ||
        (userChoice === 'бумага' && botChoice === 'камень')
    ) {
        return `Вы выбрали ${userChoice}, а бот выбрал ${botChoice}. Вы победили! 🎉`;
    } else {
        return `Вы выбрали ${userChoice}, а бот выбрал ${botChoice}. Вы проиграли. 😢`;
    }
}

async function askToPlayAgain(ctx) {
    const keyboard = new InlineKeyboard()
        .text('Да', 'yes')
        .row()
        .text('Нет', 'no');

    await ctx.reply('Хотите сыграть еще раз?', { reply_markup: keyboard });
}

bot.on('callback_query:data', (ctx) => {
    const data = ctx.callbackQuery.data;

    if (data === 'yes') {
        ctx.reply('Чтобы начать игру, напишите команду /play!');
    } else if (data === 'no') {
        ctx.reply('Спасибо за игру! Если захотите сыграть ещё раз, напишите команду /play.');
    }
});

bot.start();
console.log('Бот запущен.');
