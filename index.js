const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
const stack = {
    getCount(name) {
        return stack[name];
    },
    add(name) {
        stack[name] = (stack[name] + 1) || 1;
    },
    giveshit(giver, taker, numShit) {
        stack[giver] = (stack[giver] - numShit) || 0;
        stack[taker] = (stack[taker] + numShit) || numShit;
    }

};

client.on('message', msg => {
    if (msg.content === '똥' || msg.content === '💩') {
        console.log(stack);
        const username = msg.author.username;
        stack.add(username);
        numStack = stack.getCount(username);
        msg.reply(`${msg.author.username}의 똥을 주었습니다. 똥 스택: ${numStack}`);
    }
    if (msg.content === '/창고') {
        for (key in stack) {
            if (typeof stack[key] === 'number') {
                msg.reply(`${key}의 똥:${stack[key]}`);
            }
        }
    }
    if (msg.content.split(' ')[0] === '/전달') {
        const username = msg.author.username;
        shitNum = parseInt(msg.content.split(' ')[1]);
        shitTaker = msg.content.split(' ')[2]
        myShit = stack.getCount(username);
        if (myShit >= shitNum) {
            stack.giveshit(username, shitTaker, shitNum);
            msg.reply(`${username}가 ${shitTaker}에게 ${shitNum}개의 똥을 전달했습니다.`);
        } else {
            msg.reply(`똥의 갯수가 개모자랍니다.`);
        }
        console.log(shitNum, shitTaker);
    }

    if (msg.content === '설사') {
        msg.reply(`${msg.author.username}의 설사를 주었습니다.`);
    }
    if (msg.content === '변비') {
        msg.reply(`${msg.author.username}의 변비를 주었습니다.`);
    }
    if (msg.content === '줍줍') {
        msg.reply(`왜 불러요 닝겐`);
    }
    if (msg.content === '/?') {
        msg.channel.send(`'똥' 이나'💩'을 입력하면 당신의 똥을 줍습니다. 
'/창고'를 입력하면 전체 현황을 볼 수 있습니다.
'/전달 <숫자> <상대방 닉네임>'을 입력하면 똥을 전달합니다.
'/?' : 도움말`);
    }
});

client.login(process.env.TOKEN);