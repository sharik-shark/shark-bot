const qrcode = require("qrcode-terminal");
const moment = require("moment");
const cheerio = require("cheerio");
const imageToBase64 = require('image-to-base64');
const get = require('got');
const fs = require("fs");
const dl = require("./lib/downloadImage.js");
const fetch = require('node-fetch');
const urlencode = require("urlencode");
const axios = require("axios");
const speed = require('performance-now');

//Setting

const apivhtear = 'apikey';
const apibarbar = 'apikey';
const tobzkey = 'BotWeA';
const BotName = 'SHARK BOT';
const wa = 'https://chat.whatsapp.com/KPsKI8FyFKu6xdGyRbIBjI';
const eror = 'Info features Error';
const ow = 'CYBER SHARK';
const nomorowner = '+919446806258';
const ovo = '7510457855';
const pulsa = '9895627648';
const dana = '082223014661';
const instagram = 'https://www.instagram.com/sharik_means_real/';
const aktif = '08:00 - 22:00';
const vcard = 'BEGIN:VCARD\n'
  + 'VERSION:3.0\n'
  + 'FN:SHARIK\n' // Nama kamu
  + 'ORG:SHARK BOT;\n' // Nama bot
  + 'TEL;type=CELL;type=VOICE;waid=+919446806258:+919446806258\n' //Nomor whatsapp kamu
  + 'END:VCARD'
//
const
  {
    WAConnection,
    MessageType,
    Presence,
    MessageOptions,
    Mimetype,
    WALocationMessage,
    WA_MESSAGE_STUB_TYPES,
    ReconnectMode,
    ProxyAgent,
    waChatKey,
    GroupSettingChange,
    mentionedJid,
    processTime,
  } = require("@adiwajshing/baileys");
var jam = moment().format("HH:mm");
// OCR Library

const readTextInImage = require('./lib/ocr'
)
function foreach(arr, func) {
  for (var i in arr) {
    func(i, arr[i]);
  }
}
const conn = new WAConnection()
conn.on('qr', qr => {
  qrcode.generate(qr,
    {
      small: true
    });
  console.log(`[ ${moment().format("HH:mm:ss")} ] Arelbot Ready scan now!`);
});

conn.on('credentials-updated', () => {
  // save credentials whenever updated
  console.log(`credentials updated$`)
  const authInfo = conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
  fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t')) // save this info to a file
})
fs.existsSync('./session.json') && conn.loadAuthInfo('./session.json')
// uncomment the following line to proxy the connection; some random proxy I got off of: https://proxyscrape.com/free-proxy-list
//conn.connectOptions.agent = ProxyAgent ('http://1.0.180.120:8080')
conn.connect();


conn.on('message-status-update', json => {
  const participant = json.participant ? ' (' + json.participant + ')' : '' // participant exists when the message is from a group
})
setInterval(function () {
  for (i = 0; i < 3; i++) {
    console.log(`[ ${moment().format("HH:mm:ss")} ] => HI! I'm SHARK :)`)
  }
}, 15000)

//function

conn.on('message-new', async (m) => {
  const messageContent = m.message
  const text = m.message.conversation
  let id = m.key.remoteJid
  const isGroup = id.endsWith('@g.us')
  const totalchat = await conn.chats.all()
  const sender = isGroup ? m.participant : m.key.remoteJid
  const groupMetadata = isGroup ? await conn.groupMetadata(id) : ''
  const groupName = isGroup ? groupMetadata.subject : ''
  const desk = isGroup ? groupMetadata.desc : ''
  const groupId = isGroup ? groupMetadata.jid : ''
  const groupMembers = isGroup ? groupMetadata.participants : ''
  const messageType = Object.keys(messageContent)[0] // message will always contain one key signifying what kind of message
  let imageMessage = m.message.imageMessage;
  console.log(`[ ${moment().format("HH:mm:ss")} ] => Nomor: [ ${id.split("@s.whatsapp.net")[0]} ] => ${text}`);


  //Fitur

  // Groups
  if (text.includes(".buatgrup")) {
    var nama = text.split(".buatgrup")[1].split("-nomor")[0];
    var nom = text.split("-nomor")[1];
    var numArray = nom.split(",");
    for (var i = 0; i < numArray.length; i++) {
      numArray[i] = numArray[i] + "@s.whatsapp.net";
    }
    var str = numArray.join("");
    console.log(str)
    const group = await conn.groupCreate(nama, str)
    console.log("created group with id: " + group.gid)
    conn.sendMessage(group.gid, "hello everyone", MessageType.extendedText) // say hello to everyone on the group

  }

  //Mengambil deskripsi grup
  if (text.includes(".rules")) {
    let idgrup = `*${groupName}*\n*Rules* : \n${desk}`;
    conn.sendMessage(id, idgrup, MessageType.text, { quoted: m });
  }

  //Mengambil link grup
  if (text.includes(".linkgc")) {
    const linkgc = await conn.groupInviteCode(id)
    const hasil = `Grup : ${groupName}\n*Link* : https://chat.whatsapp.com/${linkgc}`;
    conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
  }

  //Cek nomor
  if (text.includes(".cek")) {
    var num = text.replace(/.cek/, "")
    var idn = num.replace("0", "+62");

    console.log(id);
    const gg = idn + '@s.whatsapp.net'

    const exists = await conn.isOnWhatsApp(gg)
    console.log(exists);
    conn.sendMessage(id, `${gg} ${exists ? " exists " : " does not exist"} on WhatsApp`, MessageType.text)
  }

  //Seberapa bucin
  if (text.includes('.Seberapabucin')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes(".seberapabucin")) {
    const teks = text.replace(/.seberapabucin /, "")
    axios.get(`https://arugaz.herokuapp.com/api/howbucins`).then((res) => {
      let hasil = `*Bucin Detected*\n*Persentase* : ${res.data.persen}% \n_${res.data.desc}_ `;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }

  //Bug report
  if (text.includes('.bug')) {
    const teks = text.replace(/.bug /, "")
    var nomor = m.participant
    const options = {
      text: `*>Report* : ${nomor.split("@s.whatsapp.net")[0]} | ${id}\n*>Reason* : ${teks}`,
      contextInfo: { mentionedJid: [nomor] }
    }
    let hasil1 = `Info Bug *${teks}* Successfully sent to the Owner`;
    conn.sendMessage(id, hasil1, MessageType.text, { quoted: m })
    conn.sendMessage(`${nomorowner}@s.whatsapp.net`, options, MessageType.text)
  }

  //Owner to report
  if (text.includes('.fixbug')) {
    var porn = text.split(".fixbug ")[1];
    var text1 = porn.split("/")[0];
    var text2 = porn.split("/")[1];
    let hasil = `*Owner* : *Mrf.zvx*\n*>Pesan* : ${text2}`;
    conn.sendMessage(`${text1}@s.whatsapp.net`, hasil, MessageType.text);

  }

  //kerang ajaib
  if (text.includes('.Apakah')) {
    conn.sendMessage(id, 'Please repeat the command with Small letters kecil\n_contoh : .apakah aku cantik_', MessageType.text, { quoted: m });
  }
  if (text.includes('.Bolehkah')) {
    conn.sendMessage(id, 'Please repeat the command with Small letters kecil\n_contoh : .bolehkah aku mencintai dia_', MessageType.text, { quoted: m });
  }
  if (text.includes('.Kapan')) {
    conn.sendMessage(id, 'Please repeat the command with Small letters kecil\n_contoh : .kapan aku kaya_', MessageType.text, { quoted: m });
  }
  if (text.includes('.apakah')) {
    const teks = text.replace(/./, '')
    const truth = [
      'Yes',
      'Not',
      'Can be',
      'Try asking again',
      'Maybe',
      '🤐']
    const ttrth = truth[Math.floor(Math.random() * truth.length)]
    conn.sendMessage(id, 'Question : *' + teks + '*\n\nJawaban : ' + ttrth, MessageType.text, { quoted: m })
  }

  if (text.includes('.bolehkah')) {
    const teks = text.replace(/./, '')
    const truth = [
      'May',
      'Should not',
      'Strongly recommended',
      'Try asking again',
      'Not',
      'Maybe',
      'Do not',
      '🤐']
    const ttrth = truth[Math.floor(Math.random() * truth.length)]
    conn.sendMessage(id, 'Question : *' + teks + '*\n\nJawaban : ' + ttrth, MessageType.text, { quoted: m })
  }


  if (text.includes('.kapan')) {
    const teks = text.replace(/./, '')
    const truth = [
      '1 more day',
      '2 more days',
      '3 more days',
      '4 more days',
      '5 more days',
      '6 more days',
      '1 more week',
      '2 weeks more',
      '3 weeks to go',
      '1 month longer',
      '2 more months',
      '3 more days',
      '4 months to go',
      '5 months to go',
      '6 more days',
      '7 months to go',
      '8 months to go',
      '9 more days',
      '10 months to go ',
      '11 months to go ',
      '1 more year',
      '2 more years',
      '3 more years',
      '4 more years',
      'Will not',
      'Are you sure it will happen?',
      'I doubt it',
      'The day after tomorrow',
      'End of next month',
      'Early next month',
      'Next year',
      'Next month',
      'Soon',
      '🤐']
    const ttrth = truth[Math.floor(Math.random() * truth.length)]
    conn.sendMessage(id, 'Question : *' + teks + '*\n\nJawaban : ' + ttrth, MessageType.text, { quoted: m })
  }


  //Zodiak
  if (text.includes('.Zodiak')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .zodiak libra_', MessageType.text, { quoted: m });
  }
  if (text.includes(".zodiak")) {
    const teks = text.replace(/.zodiak /, "")
    axios.get(`https://api.vhtear.com/zodiak?query=${teks}&apikey=${apivhtear}`).then((res) => {
      let hasil = `*Zodiak* : ${res.data.result.zodiak}\n*Ramalan hari ini* :\n${res.data.result.ramalan}\n\n_${res.data.result.inspirasi}_`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }

  //Tebakgambar
  if (text.includes('.Tebakgambar')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes(".tebakgambar")) {
    axios.get(`https://api.vhtear.com/tebakgambar&apikey=${apivhtear}`).then((res) => {
      imageToBase64(res.data.result.soalImg)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Writing ⏳ please wait ', MessageType.text, { quoted: m })
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m })
          })
    })
  }

  //Familly100
  if (text.includes('.Family100')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes(".family100")) {
    axios.get(`https://api.vhtear.com/family100&apikey=${apivhtear}`).then((res) => {
      let hasil = `*Pertinyiinnyi* : ${res.data.result.soal}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }

  //Artimimpi
  if (text.includes('.Mimpi')) {
    conn.sendMessage(id, 'Please repeat the command with letters kecil\n_contoh : .mimpi ular_', MessageType.text, { quoted: m });
  }
  if (text.includes(".mimpi")) {
    const teks = text.replace(/.mimpi /, "")
    axios.get(`https://api.vhtear.com/artimimpi?query=${teks}&apikey=${apivhtear}`).then((res) => {
      let hasil = `${res.data.result.hasil}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }

  //Brainly 
  if (text.includes('.Brainly')) {
    conn.sendMessage(id, 'Please repeat the command with letters kecil\ncontoh : .brainly what is a living thing', MessageType.text, { quoted: m });
  }
  if (text.includes('.brainly')) {
    const teks = text.replace(/.brainly /, "")
    axios.get(`https://api.vhtear.com/branly?query=${teks}&apikey=${apivhtear}`).then((res) => {
      let hasil = ` ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏ ${res.data.result.data}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }
  //How gay
  if (text.includes('.Seberapagay')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes(".seberapagay")) {
    const teks = text.replace(/.seberapagay /, "")
    axios.get(`https://arugaz.herokuapp.com/api/howgay`).then((res) => {
      let hasil = `*Gay Detected*\n*Persentase* : ${res.data.persen}%\n${res.data.desc}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }

  //Info owner
  if (text.includes('.Owner')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes('.owner')) {
    conn.sendMessage(id, { displayname: "Jeff", vcard: vcard }, MessageType.contact, { quoted: m })
  }

  //Ganti nama grup
  if (text.includes('.Setname')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase, only valid if the bot becomes admin', MessageType.text, { quoted: m });
  }
  if (text.includes(".setname")) {
    const teks = text.replace(/.setname /, "")
    let nama = `${teks}`;
    let idgrup = `${id.split("@s.whatsapp.net")[0]}`;
    conn.groupUpdateSubject(idgrup, nama);
    conn.sendMessage(id, 'Mengganti Nama Group', MessageType.text, { quoted: m });

  }

  //Ganti deskripsi grup
  if (text.includes('.Setdesc')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase, only valid if the bot becomes admin', MessageType.text, { quoted: m });
  }
  if (text.includes(".setdesc")) {
    const teks = text.replace(/.setdesc /, "")
    let desk = `${teks}`;
    let idgrup = `${id.split("@s.whatsapp.net")[0]}`;
    conn.groupUpdateDescription(idgrup, desk)
    conn.sendMessage(id, 'Change the group description', MessageType.text, { quoted: m });

  }

  //buka gc
  if (text.includes('.Opengc')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase, only applies if the bot becomes admin', MessageType.text, { quoted: m });
  }
  else if (text == '.opengc') {
    let hasil = `${id.split("@s.whatsapp.net")[0]}`;
    conn.groupSettingChange(hasil, GroupSettingChange.messageSend, false);
    conn.sendMessage(id, MessageType.text);
  }

  //tutup gc
  if (text.includes('.Closegc')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase, only valid if the bot becomes admin', MessageType.text, { quoted: m });

  }
  else if (text == '.closegc') {
    let hasil = `${id.split("@s.whatsapp.net")[0]}`;
    conn.groupSettingChange(hasil, GroupSettingChange.messageSend, true);
    conn.sendMessage(id, MessageType.text);
  }


  //Map
  if (text.includes('.Map')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase,\n_contoh : .map jakarta_', MessageType.text, { quoted: m });
  }
  if (text.includes('.map')) {
    var teks = text.replace(/.map /, '')
    axios.get('https://mnazria.herokuapp.com/api/maps?search=' + teks)
      .then((res) => {
        imageToBase64(res.data.gambar)
          .then(
            (ress) => {
              conn.sendMessage(id, '[WAIT] Searching please wait ', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }


  //Donasi
  if (text.includes('.donasi')) {
    conn.sendMessage(id, `Help donate to keep the bot running.

 Beware of the fire, even if you have a date, so whoever does not find a word

_“stay away from the fire of hell, even if only by giving alms a date palm (a little). If you don't have it, 

*Pulsa :* _${pulsa}_
*Dana :* _${dana}_
*OVO :* _${ovo}_`, MessageType.text, { quoted: m });
  }

  //Informasi
  if (text.includes('.info')) {
    conn.sendMessage(id, "Bot problem? report error feature to owner, type.owner\nAtau use features *.Bug*\n_Contoh : .bug short story feature can't_", MessageType.text, { quoted: m });
  }

  //install
  if (text.includes('.install')) {
    var url = "https://user-images.githubusercontent.com/72728486/104588271-b4034e80-569a-11eb-8402-44bb2f2bd63b.jpg";
    axios.get(url).then((res) => {

      imageToBase64(url)

        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            let hasil = `How to install whatsapp bot on android\n\n*Tutorial* : https://github.com/CYBER SHARKYt/Kcgbot\n\n*Tutorial youtube* : https://youtu.be/VqSer_W1y`;
            conn.sendMessage(id, buf, MessageType.image, { caption: hasil, quoted: m });
          })
    })
  }

  //intro grup
  if (text.includes('intro')) {
    conn.sendMessage(id, `
      ────────────────
    Hai
    Welcome to
    ${groupName}
    Don't forget to read rules
    Type .Rules
      ────────────────

╔════════════════════
║──────〘  *Intro* 〙───────
╠════════════════════
╠≽️ * Name *
╠≽️ * Age *
╠≽️ * Origin City *
╠≽️ * Gender *
╠════════════════════
║──────── *SHARK-BOT*──────
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║──────── *SHARK-BOT*──────
╠════════════════════
https://github.com/-BOT/ck-wp-bot
╠════════════════════` , MessageType.text);
  }

  //Tag
  if (text.includes('.Tagme')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes('.tagme')) {
    var nomor = m.participant
    const options = {
      text: `@${nomor.split("@s.whatsapp.net")[0]} Hai sis 🤗`,
      contextInfo: { mentionedJid: [nomor] }
    }
    conn.sendMessage(id, options, MessageType.text)
  }


  //notifikasi
  if (text.includes('!notif')) {
    const value = text.replace(/!notif /, '')
    var nomor = m.participant
    const group = await conn.groupMetadata(id)
    const member = group['participants']
    const ids = []
    member.map(async adm => {
      ids.push(adm.id.replace('c.us', 's.whatsapp.net'))
    })
    const options = {
      text: `Notif dari @${nomor.split("@s.whatsapp.net")[0]}\n*Pesan : ${value}*`,
      contextInfo: { mentionedJid: ids },
      quoted: m
    }
    conn.sendMessage(id, options, MessageType.text)
  }

  //Get ping
  if (text.includes('.Ping')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  else if (text == '.ping') {
    const timestamp = speed();
    const latensi = speed() - timestamp
    conn.sendMessage(id, `PONG!!\n_Speed : ${latensi.toFixed(4)} Second_`, MessageType.text, { quoted: m })
  }

  //Nulis dibuku
  if (text.includes('.Nulis')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_example : .nulis SHARK BOT', MessageType.text, { quoted: m });
  }
  //Pengucapan ulang
  if (text.includes('.Say')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_Example : .say SHARK BOT', MessageType.text, { quoted: m });
  }
  if (text.includes(".say")) {
    const teks = text.replace(/.say /, "")
    conn.sendMessage(id, teks, MessageType.text)
  }
  //Youtube download 
  if (text.includes('.Ytmp4')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .ytmp4 http://youtube..._', MessageType.text, { quoted: m });
  }
  if (text.includes('.ytmp4')) {
    const teks = text.replace(/.ytmp4 /, "")
    axios.get(`https://kocakz.herokuapp.com/api/media/ytvideo?url=${teks}`).then((res) => {
      imageToBase64(res.data.result.thumb)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, '[ WAIT ] Downloading ... ⏳ please Wait', MessageType.text, { quoted: m })
            let hasil = `*Judul* : ${res.data.result.title}\n*Ukuran* : ${res.data.result.filesizeF}\n*Format* : MP4\n*Link* : ${res.data.result.dl_link}`;
            conn.sendMessage(id, buf, MessageType.image, { caption: hasil, quoted: m });
          })
    })
  }

  if (text.includes('.yts')) {
    const teks = text.replace(/.yts /, "")
    axios.get(`https://docs-jojo.herokuapp.com/api/yt-play?q=${teks}`).then((res) => {
      imageToBase64(res.data.thumb)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, '[ WAIT ] Downloading ... ⏳ please wait', MessageType.text, { quoted: m })
            let hasil = `*Channel* : ${res.data.channel}\n*Judul* : ${res.data.title}\n*Durasi* : ${res.data.duration}\n*Ukuran* : ${res.data.filesize}\n*View* : ${res.data.total_view}\n*Format* : MP4\n*Link* : ${res.data.link}`;
            conn.sendMessage(id, buf, MessageType.image, { caption: hasil, quoted: m });
          })
    })
  }

  if (text.includes('.Ytmp3')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .ytmp3 http://www.youtube..._', MessageType.text, { quoted: m });
  }
  if (text.includes('.ytmp3')) {
    const teks = text.replace(/.ytmp3 /, "")
    axios.get(`https://kocakz.herokuapp.com/api/media/ytaudio?url=${teks}`).then((res) => {
      imageToBase64(res.data.result.thumb)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, '[ WAIT ] Downloading ... ⏳ please wait', MessageType.text, { quoted: m })
            let hasil = `*Judul* : ${res.data.result.title}\n*Ukuran* : ${res.data.result.filesizeF}\n*Format* : MP3\n*Link* : ${res.data.result.dl_link}`;
            conn.sendMessage(id, buf, MessageType.image, { caption: hasil, quoted: m });
          })
    })
  }

  //Instagram download
  if (text.includes('.Ig')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .ig http://www.instagram..._', MessageType.text, { quoted: m });
  }
  if (text.includes('.ig')) {
    const teks = text.replace(/.ig /, "")
    axios.get(`https://mhankbarbar.tech/api/ig?url=${teks}&apiKey=${apibarbar}`).then((res) => {
      conn.sendMessage(id, '[ WAIT ] Downloading ... ⏳ please wait ', MessageType.text, { quoted: m })
      let hasil = `Klik link dan download hasilnya!\n*Link* : ${res.data.result}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }


  //Tiktok download
  if (text.includes('.Tik')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example: .Tik https://www.tiktok..._', MessageType.text, { quoted: m });
  }
  if (text.includes('.tik')) {
    const teks = text.replace(/.tik /, "")
    axios.get(`https://kocakz.herokuapp.com/api/media/tiktok?url=${teks}`).then((res) => {
      conn.sendMessage(id, '[ WAIT ] Downloading ... ⏳ please wait ', MessageType.text, { quoted: m })
      let hasil = `*Name* : ${res.data.nameInfo}\n*Caption* : ${res.data.textInfo}\n*Waktu* : ${res.data.timeInfo}\n*Link* : ${res.data.mp4direct}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }

  //Facebook downloader
  if (text.includes('.Fb')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \ Please repeat the command in lowercase \n_example : .fb https://www.facebook..._', MessageType.text, { quoted: m });
  }
  if (text.includes('.fb')) {
    const teks = text.replace(/.fb /, "")
    axios.get(`https://kocakz.herokuapp.com/api/media/facebook?url=${teks}`).then((res) => {

      conn.sendMessage(id, '[ WAIT ] downloading...⏳ sPlease Wait', MessageType.text, { quoted: m })
      let hasil = `*Link* : ${res.data.linkHD}`;
      conn.sendMessage(id, buf, MessageType.text, { caption: hasil, quoted: m });
    })
  }

  //Text thunder
  if (text.includes('.Thunder')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .thunder Keralacyberguardins_', MessageType.text, { quoted: m });
  }
  if (text.includes('.thunder')) {
    const teks = text.replace(/.thunder /, "")
    axios.get(`https://arugaz.my.id/api/textpro/thundertext?text=${teks}`)
      .then((res) => {
        imageToBase64(`https://arugaz.my.id/api/textpro/thundertext?text=${teks}`)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Create texts⏳ Please Wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Sand1')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .sand1 shark_', MessageType.text, { quoted: m });
  }
  if (text.includes('.sand1')) {
    const teks = text.replace(/.sand1 /, "")
    axios.get(`https://arugaz.my.id/api/textpro/sandsummer?text=${teks}`)
      .then((res) => {
        imageToBase64(`https://arugaz.my.id/api/textpro/sandsummer?text=${teks}`)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text Please Wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Neon3d')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .neon3d Kcg_', MessageType.text, { quoted: m });
  }
  if (text.includes('.neon3d')) {
    const teks = text.replace(/.neon3d /, "")
    axios.get(`https://arugaz.my.id/api/textpro/text3d?text=${teks}`)
      .then((res) => {
        imageToBase64(`https://arugaz.my.id/api/textpro/text3d?text=${teks}`)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text⏳ Please Wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Blackpink')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .Blackpink Kcg_', MessageType.text, { quoted: m });
  }
  if (text.includes('.blackpink')) {
    const teks = text.replace(/.blackpink /, "")
    axios.get(`https://arugaz.my.id/api/textpro/blackpink?text=${teks}`)
      .then((res) => {
        imageToBase64(`https://arugaz.my.id/api/textpro/blackpink?text=${teks}`)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text⏳ Please Wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }


  if (text.includes('.Cloud')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .cloud CYBER SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.cloud')) {
    const teks = text.replace(/.cloud /, "")
    axios.get(`https://arugaz.my.id/api/textpro/realcloud?text=${teks}`)
      .then((res) => {
        imageToBase64(`https://arugaz.my.id/api/textpro/realcloud?text=${teks}`)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text⏳ sPlease Wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Sky')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .sky Kannappi_', MessageType.text, { quoted: m });
  }
  if (text.includes('.sky')) {
    const teks = text.replace(/.sky /, "")
    axios.get(`https://arugaz.my.id/api/textpro/cloudsky?text=${teks}`)
      .then((res) => {
        imageToBase64(`https://arugaz.my.id/api/textpro/cloudsky?text=${teks}`)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text⏳ Wait Aaak MOone', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Sand2')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .sand2 shark_', MessageType.text, { quoted: m });
  }
  if (text.includes('.sand2')) {
    const teks = text.replace(/.sand2 /, "")
    axios.get(`https://arugaz.my.id/api/textpro/sandwrite?text=${teks}`)
      .then((res) => {
        imageToBase64(`https://arugaz.my.id/api/textpro/sandwrite?text=${teks}`)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text⏳ Please Wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Sand3')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .sand3 CYBER SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.sand3')) {
    const teks = text.replace(/.sand3 /, "")
    axios.get(`https://arugaz.my.id/api/textpro/sandsummery?text=${teks}`)
      .then((res) => {
        imageToBase64(`https://arugaz.my.id/api/textpro/sandsummery?text=${teks}`)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text⏳ Wait Karoo Myre, MessageType.text', { quoted: m });
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Sand4')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .sand4 Kcg_', MessageType.text, { quoted: m });
  }
  if (text.includes('.sand4')) {
    const teks = text.replace(/.sand4 /, "")
    axios.get(`https://arugaz.my.id/api/textpro/sandengraved?text=${teks}`)
      .then((res) => {
        imageToBase64(`https://arugaz.my.id/api/textpro/sandengraved?text=${teks}`)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creatig Text⏳ Wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Balon')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .balon Myr_', MessageType.text, { quoted: m });
  }
  if (text.includes('.balon')) {
    const teks = text.replace(/.balon /, "")
    axios.get(`https://arugaz.my.id/api/textpro/foilballoon?text=${teks}`)
      .then((res) => {
        imageToBase64(`https://arugaz.my.id/api/textpro/foilballoon?text=${teks}`)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Undaaki Kond Irikuva⏳ Wait Aak', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Metal')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .metal shark_', MessageType.text, { quoted: m });
  }
  if (text.includes('.metal')) {
    const teks = text.replace(/.metal /, "")
    axios.get(`https://arugaz.my.id/api/textpro/metaldark?text=${teks}`)
      .then((res) => {
        imageToBase64(`https://arugaz.my.id/api/textpro/metaldark?text=${teks}`)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text⏳ Please Wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Old')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .old CYBER SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.old')) {
    const teks = text.replace(/.old /, "")
    axios.get(`https://arugaz.my.id/api/textpro/old1917?text=${teks}`)
      .then((res) => {
        imageToBase64(`https://arugaz.my.id/api/textpro/old1917?text=${teks}`)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text⏳ ', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Holo')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .holo ck_', MessageType.text, { quoted: m });
  }
  if (text.includes('.holo')) {
    const teks = text.replace(/.holo /, "")
    axios.get(`https://arugaz.my.id/api/textpro/holographic?text=${teks}`)
      .then((res) => {
        imageToBase64(`https://arugaz.my.id/api/textpro/holographic?text=${teks}`)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text⏳ Wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }



  if (text.includes('.Coding')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .coding _', MessageType.text, { quoted: m });
  }
  if (text.includes('.coding')) {
    const teks = text.replace(/.coding /, "")
    axios.get(`https://arugaz.my.id/api/textpro/matrixtext?text=${teks}`)
      .then((res) => {
        imageToBase64(`https://arugaz.my.id/api/textpro/matrixtext?text=${teks}`)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text⏳ Please Wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.tahta')) {
    var teks = text.replace(/.tahta /, "")
    axios.get(`https://api.vhtear.com/hartatahta?text=${teks}&apikey=${apivhtear}`)
      .then((res) => {
        imageToBase64(`https://api.vhtear.com/hartatahta?text=${teks}&apikey=${apivhtear}`)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text⏳ Please Wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.luxy')) {
    var teks = text.replace(/.luxy /, "")
    var url = "https://arugaz.my.id/api/textpro/luxury?text=" + teks;

    axios.get(url)
      .then((res) => {
        imageToBase64(url)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text⏳ Please Wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }


  if (text.includes('.Neon4')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .neon4 shark_', MessageType.text, { quoted: m });
  }
  if (text.includes('.neon4')) {
    const teks = text.replace(/.neon4 /, "")
    axios.get(`https://arugaz.my.id/api/textpro/bokehtext?text=${teks}`)
      .then((res) => {
        imageToBase64(res.data.url)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text⏳ Take Time', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Neon5')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .neon5 SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.neon5')) {
    const teks = text.replace(/.neon5 /, "")
    axios.get(`https://arugaz.my.id/api/textpro/greenneon?text=${teks}`)
      .then((res) => {
        imageToBase64(`https://arugaz.my.id/api/textpro/greenneon?text=${teks}`)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text⏳ Please Wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }


  else if (text == '.kodebahasa') {
    conn.sendMessage(id, `Afrikaans = af
Albanian = sq
Amharic = am
Arabic = ar
Armenian = hy
Azerbaijani = az
Basque = eu
Belarusian = be
Bengali = bn
Bosnian = bs
Bulgarian = bg
Catalan = ca
Cebuano = ceb
Chinese (Simplified) = zh-CN
Chinese (Traditional) = zh-TW
Corsican = co
Croatian = hr
Czech = cs
Danish = da
Dutch = nl
English = en
Esperanto = eo
Estonian = et
Finnish = fi
French = fr
Frisian = fy
Galician = gl
Georgian = ka
German = de
Greek = el
Gujarati = gu
Haitian Creole = ht
Hausa = ha
Hawaiian = haw
Hebrew = he or iw
Hindi = hi
Hmong = hmn
Hungarian = hu
Icelandic = is
Igbo = ig
Indonesian = id
Irish = ga
Italian = it
Japanese = ja
Javanese = jv
Kannada = kn
Kazakh = kk
Khmer = km
Kinyarwanda = rw
Korean = ko
Kurdish = ku
Kyrgyz = ky
Lao = lo
Latin = la
Latvian = lv
Lithuanian = lt
Luxembourgish = lb
Macedonian = mk
Malagasy = mg
Malay = ms
Malayalam = ml
Maltese = mt
Maori = mi
Marathi = mr
Mongolian = mn
Myanmar (Burmese) = my
Nepali = ne
Norwegian = no
Nyanja (Chichewa) = ny
Odia (Oriya) = or
Pashto = ps
Persian = fa
Polish = pl
Portuguese (Portugal, Brazil) = pt
Punjabi = pa
Romanian = ro
Russian = ru
Samoan = sm
Scots Gaelic = gd
Serbian = sr
Sesotho = st
Shona = sn
Sindhi = sd
Sinhala (Sinhalese) = si
Slovak = sk
Slovenian = sl
Somali = so
Spanish = es
Sundanese = su
Swahili = sw
Swedish = sv
Tagalog (Filipino) = tl
Tajik = tg
Tamil = ta
Tatar = tt
Telugu = te
Thai = th
Turkish = tr
Turkmen = tk
Ukrainian = uk
Urdu = ur
Uyghur = ug
Uzbek = uz
Vietnamese = vi
Welsh = cy
Xhosa = xh
Yiddish = yi
Yoruba = yo
Zulu = zu` , MessageType.text, { quoted: m });

  }

  //joox download
  if (text.includes('.Joox')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example :: .joox akad - payung teduh_', MessageType.text, { quoted: m });
  }
  if (text.includes('.joox')) {
    const teks = text.replace(/.joox /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/joox?q=${teks}&apikey=${tobzkey}`).then((res) => {
      imageToBase64(res.data.result.thumb)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            var lagu = `{url: ${res.data.result.mp3} ,}`;
            conn.sendMessage(id, '[ WAIT ] downloading...⏳ Please  Wait', MessageType.text, { quoted: m })
            let hasil = `Click the link and download the results!\n*Judul* : ${res.data.result.album} - ${res.data.result.judul}\n*Link* : ${res.data.result.mp3}`;
            conn.sendMessage(id, buf, MessageType.image, { quoted: m, caption: hasil })
            conn.sendMessage(id, lagu, MessageType.audio, { mimetype: 'audio/mp4', filename: `${data.result.judul}.mp3`, quoted: m })
          })
    })
  }
  //Twitter download
  if (text.includes('.Twt')) {
    conn.sendMessage(id, 'Click the link and download the results\n_contoh : .twt http://www.twitter..._', MessageType.text, { quoted: m });
  }
  if (text.includes('.twt')) {
    const teks = text.replace(/.twt /, "")
    axios.get(`https://mhankbarbar.tech/api/twit?url=${teks}&apiKey=${apibarbar}`).then((res) => {
      conn.sendMessage(id, '[ WAIT ] downloading⏳ Please Wait', MessageType.text, { quoted: m })
      let hasil = `Click the link and download the results!\n*Link* : ${res.data.result}\n*Judul* : ${res.data.title}\n${res.data.quote}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });

    })
  }


  //traslate enggris
  if (text.includes('.Tl')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .tl apa kabar_', MessageType.text, { quoted: m });
  }
  if (text.includes('.tl')) {
    const gh = text.split(".tl ")[1];
    const text1 = gh.split("/")[0];
    const text2 = gh.split("/")[1];
    axios.get(`https://api-translate.azharimm.tk/translate?engine=google&text=${text1}&to=${text2}`)
      .then((res) => {
        let hasil = `*Translate* : ${res.data.data.result}`;
        conn.sendMessage(id, hasil, MessageType.text, { quoted: m })
      })
  }

  if (text.includes('.Rate')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .rate seberapa ganteng SHARK_', MessageType.text, { quoted: m });

  }
  if (text.includes('.rate')) {
    const teks = text.replace(/./, '')
    const truth = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
      '32',
      '33',
      '34',
      '35',
      '36',
      '37',
      '38',
      '39',
      '40',
      '41',
      '42',
      '43',
      '44',
      '45',
      '46',
      '47',
      '48',
      '49',
      '50',
      '51',
      '52',
      '53',
      '54',
      '55',
      '56',
      '57',
      '58',
      '59',
      '60',
      '61',
      '62',
      '63',
      '64',
      '65',
      '66',
      '67',
      '68',
      '69',
      '70',
      '71',
      '72',
      '73',
      '74',
      '75',
      '76',
      '77',
      '78',
      '79',
      '80',
      '81',
      '82',
      '83',
      '84',
      '85',
      '86',
      '87',
      '88',
      '89',
      '90',
      '91',
      '92',
      '93',
      '94',
      '95',
      '96',
      '97',
      '99',
      '99',
      '100']
    const ttrth = truth[Math.floor(Math.random() * truth.length)]
    conn.sendMessage(id, 'Question : *' + teks + '*\n\nRating : ' + ttrth + '%', MessageType.text, { quoted: m })
  }

  if (text.includes('.Paper1')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .paper1 CYBER SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.paper1')) {
    const teks = text.replace(/.paper1 /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=burn_paper&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text⏳ Please Wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Block')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .block Kcg_', MessageType.text, { quoted: m });
  }
  if (text.includes('.block')) {
    const teks = text.replace(/.block /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=wood_block&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text⏳ Please Wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Heart')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .heart shark_', MessageType.text, { quoted: m });
  }
  if (text.includes('.heart')) {
    const teks = text.replace(/.heart /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=quote_on_wood_heart&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] CreatiNg Text⏳ ', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Grass')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .grass _', MessageType.text, { quoted: m });
  }
  if (text.includes('.grass')) {
    const teks = text.replace(/.grass /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=message_under_the_grass&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text⏳ please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Ocean')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .ocean SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.ocean')) {
    const teks = text.replace(/.ocean /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=underwater_ocean&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text⏳ please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Board')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .board SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.board')) {
    const teks = text.replace(/.board /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=wooden_boards&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text, please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Mwolf')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .mwolf SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.mwolf')) {
    const teks = text.replace(/.mwolf /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=wolf_metal&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text, please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Mglow')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .mglow SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.mglow')) {
    const teks = text.replace(/.mglow /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=metalic_text_glow&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text, please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Bit8')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .bit8 SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.bit8')) {
    const gh = text.split(".but8 ")[1];
    const text1 = gh.split("/")[0];
    const text2 = gh.split("/")[1];
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=bit8&text1=${text1}&text2=${text2}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text, please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Hpotter')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .Hpotter SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.hpotter')) {
    const teks = text.replace(/.hpotter /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=harry_potter&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text, please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Pubg')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .pubg shark_', MessageType.text, { quoted: m });
  }
  if (text.includes('.pubg')) {
    const gh = text.split(".pubg ")[1];
    const text1 = gh.split("/")[0];
    const text2 = gh.split("/")[1];
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=pubg&text1=${text1}&text2=${text2}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Text⏳ ', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Cfire')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .Cfire SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.cfire')) {
    const teks = text.replace(/.cfire /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=crossfire&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text, please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Wface1')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .Wface1 SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.wface1')) {
    const teks = text.replace(/.wface1 /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=warface&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text, please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Wface2')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .Wface2 SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.wface2')) {
    const teks = text.replace(/.wface2 /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=warface2&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text, please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Battlef')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .Battlef Lexa_', MessageType.text, { quoted: m });
  }
  if (text.includes('.batllef')) {
    const gh = text.split(".battlef ")[1];
    const text1 = gh.split("/")[0];
    const text2 = gh.split("/")[1];
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=battlefield4&text1=${text1}&text2=${text2}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text, please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Lol')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .lol SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.lol')) {
    const teks = text.replace(/.lol /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=league_of_legends&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text, please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Csgo')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .csgo SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.csgo')) {
    const teks = text.replace(/.csgo /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=csgo&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text, please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Owatch')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .Owatch SHARK_', MessageType.text, { quoted: m });

  }
  if (text.includes('.owatch')) {
    const teks = text.replace(/.owatch /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=overwatch&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text, please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Waifu')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes(".waifu")) {
    axios.get(`https://docs-jojo.herokuapp.com/api/waifu`).then((res) => {
      imageToBase64(res.data.image)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, '[ WAIT ] Searching ⏳ please wait', MessageType.text, { quoted: m })
            let hasil = `*Nama* : ${res.data.name}\n*Desk* : ${res.data.desc}`;
            conn.sendMessage(id, buf, MessageType.image, { caption: hasil, quoted: m });
          })
    })
  }

  if (text.includes('.Paper2')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .paper2 SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.paper2')) {
    const teks = text.replace(/.paper2 /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=love_paper&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text, please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Coffee')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .coffee SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.coffee')) {
    const teks = text.replace(/.coffee /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=coffee&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text, please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.nulis')) {
    const teks = text.replace(/.nulis /, '')
    axios.get(`https://mhankbarbar.tech/nulis?text=${teks}&apiKey=${apibarbar}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[WAIT] Menulis, please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { caption: "Just write like this, you're lazy ", quoted: m })
            })
      })
  }

  if (text.includes('.Shadow')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .shadow SHARK_', MessageType.text, { quoted: m });

  }
  if (text.includes('.shadow')) {
    const teks = text.replace(/.shadow /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=shadow&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating Tect⏳ please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }


  //Generator font
  if (text.includes('.Fontgen')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .fontgen SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes(".fontgen")) {
    const teks = text.replace(/.fontgen /, "")
    axios.get(`https://kocakz.herokuapp.com/api/random/text/fancytext?text=${teks}`).then((res) => {
      conn.sendMessage(id, '[ WAIT ] Proses ⏳ please wait', MessageType.text, { quoted: m })
      let hasil = `*Hasil* :\n${res.data.result}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }

  //Random motivasi
  if (text.includes('.Motivasi')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes(".motivasi")) {
    const teks = text.replace(/.motivasi /, "")
    axios.get(`https://kocakz.herokuapp.com/api/random/text/katabijak`).then((res) => {
      let hasil = `${res.data.result}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }
  //Pencarian wiki
  if (text.includes('.Wiki')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .wiki ir. Mohanlal_', MessageType.text, { quoted: m });
  }
  if (text.includes(".wiki")) {

    const teks = text.replace(/.wiki /, "")
    axios.get(`https://alfians-api.herokuapp.com/api/wiki?q=${teks}`).then((res) => {
      conn.sendMessage(id, '[ WAIT ] Searching...⏳ Please wait', MessageType.text, { quoted: m })
      let hasil = `Menurut Wikipedia:\n\n${res.data.result}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }

  //Jadwan sholat daerah
  if (text.includes('.Sholat')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .sholat semarang_', MessageType.text, { quoted: m });
  }
  if (text.includes(".sholat")) {
    const teks = text.replace(/.sholat /, "")
    axios.get(`https://mhankbarbar.tech/api/jadwalshalat?daerah=${teks}&apiKey=${apibarbar}`).then((res) => {
      conn.sendMessage(id, '[ WAIT ] Display prayer times⏳ Please Wait', MessageType.text, { quoted: m })
      let hasil = `Jadwal sholat di ${teks} hari ini adalah\n\n*Imsak* : ${res.data.Imsyak} WIB\n*Subuh* : ${res.data.Subuh} WIB\n*Dzuhur* : ${res.data.Dzuhur} WIB\n*Ashar* : ${res.data.Ashar} WIB\n*Maghrib* : ${res.data.Maghrib} WIB\n*Isya* : ${res.data.Isya} WIB`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }


  // Optical Character Recognition
  if (text.includes('.Ocr')) {
    conn.sendMessage(id, 'Silakan ulangi dengan mengirim foto dengan caption .ocr', MessageType.text, { quoted: m });
  }
  if (messageType == 'imageMessage') {
    let caption = imageMessage.caption.toLocaleLowerCase()
    if (caption == '.ocr') {
      const img = await conn.downloadAndSaveMediaMessage(m)
      readTextInImage(img)
        .then(data => {
          console.log(data)
          conn.sendMessage(id, `${data}`, MessageType.text, { quoted: m });
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  //Pict to sticker
  if (text.includes('.Stiker')) {
    conn.sendMessage(id, 'Please repeat by sending a photo with a caption .stiker', MessageType.text, { quoted: m });
  }
  if (messageType == 'imageMessage') {
    let caption = imageMessage.caption.toLocaleLowerCase()
    const buffer = await conn.downloadMediaMessage(m) // to decrypt & use as a buffer
    if (caption == '.stiker') {
      const stiker = await conn.downloadAndSaveMediaMessage(m) // to decrypt & save to file

      const
        {
          exec
        } = require("child_process");
      exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) => {
        let stik = fs.readFileSync('temp/' + jam + '.webp')
        conn.sendMessage(id, stik, MessageType.sticker, { quoted: m })
      });
    }
    if (caption == '.sticker') {
      const stiker = await conn.downloadAndSaveMediaMessage(m) // to decrypt & save to file
      const
        {
          exec
        } = require("child_process");
      exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) => {
        let stik = fs.readFileSync('temp/' + jam + '.webp')
        conn.sendMessage(id, stik, MessageType.sticker, { quoted: m })
      });
    }
  }

  //Pantun
  if (messageType === MessageType.text) {
    let is = m.message.conversation.toLocaleLowerCase()

    if (is == '.pantun') {
      fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-pantun-pakboy.txt')
        .then(res => res.text())
        .then(body => {
          let tod = body.split("\n");
          let pjr = tod[Math.floor(Math.random() * tod.length)];
          let pantun = pjr.replace(/pjrx-line/g, "\n");
          conn.sendMessage(id, pantun, MessageType.text, { quoted: m })
        });
    }
  };

  //Info convid
  if (text.includes('.Covid')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes(".covid")) {
    const get = require('got')
    const body = await get.post('https://api.kawalcorona.com/indonesia', {
    }).json();
    var positif = (body[0]['positif']);
    var sembuh = (body[0]['sembuh']);
    var meninggal = (body[0]['meninggal']);
    var dirawat = (body[0]['dirawat']);
    console.log(body[0]['name'])
    conn.sendMessage(id, `📌INDIA'S LATEST COVID-19 DISTRICT DATA\n\n*Positif* = ${positif} \n*Healed* = ${sembuh} \n*Died* = ${meninggal}\n*Dirawat* = ${dirawat}\n\n*Stay safe and always use a mask when traveling*`, MessageType.text, { quoted: m });
  }

  //Random foto cewe
  if (text.includes('.Cecan')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes(".cecan")) {
    var items = ["ullzang girl", "cewe cantik", "cewe hijab", "remaja cantik", "cewek jepang"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;

    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek = b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
          .then(
            (response) => {
              conn.sendMessage(id, '[ WAIT ] Searching cecan⏳  Wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(id, buf, MessageType.image, { caption: `nih gan`, quoted: m })

            }
          )
          .catch(
            (error) => {
              console.log(error); // Logs an error if there was one
            }
          )

      });
  }

  //Random foto cowo
  if (text.includes('.Cogan')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes(".cogan")) {
    var items = ["cowo ganteng", "cogan", "cowok indonesia ganteng", "cowo keren"];
    var cowo = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cowo;

    axios.get(url)
      .then((result) => {
        var z = JSON.parse(JSON.stringify(result.data));
        var cowok = z[Math.floor(Math.random() * z.length)];
        imageToBase64(cowok)
          .then(
            (response) => {
              conn.sendMessage(id, '[ WAIT ] Searching cogan⏳ please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(response, 'base64');
              conn.sendMessage(id, buf, MessageType.image, { caption: `nih sist`, quoted: m })
            }
          )
          .catch(
            (error) => {
              console.log(error);
            }
          )

      });
  }

  //Random anime
  if (text.includes('.Anime')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes(".anime")) {
    var items = ["anime tumblr", "anime loli", "anime aesthetic", "anime hd"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;

    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek = n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek)
          .then(
            (response) => {
              conn.sendMessage(id, '[ WAIT ] Searching anime⏳ please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(response, 'base64');
              conn.sendMessage(id, buf, MessageType.image, { caption: `wibu lu`, quoted: m })
            }
          )
          .catch(
            (error) => {
              console.log(error);
            }
          )

      });
  }

  //Pencarian lirik
  if (text.includes('.Lirik')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .lirik anji - dia_', MessageType.text, { quoted: m });
  }
  if (text.includes(".lirik")) {
    const teks = text.split(".lirik")[1]
    axios.get(`http://scrap.terhambar.com/lirik?word=${teks}`).then((res) => {
      conn.sendMessage(id, '[ WAIT ] Searching lirik⏳ please wait', MessageType.text, { quoted: m })
      let hasil = `lirik ${teks} \n\n\n ${res.data.result.lirik}`
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m })
    })
  }
  //Font bapack
  if (text.includes('.Alay')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .alay SHARK sayang udan_', MessageType.text, { quoted: m });
  }
  if (text.includes(".alay")) {
    const alay = text.split(".alay")[1]
    axios.get(`https://api.terhambar.com/bpk?kata=${alay}`).then((res) => {
      let hasil = `${res.data.text}`
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m })
    })
  }

  //Random memme
  if (text.includes('.Meme')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes(".meme")) {
    var items = ["meme indonesia", "meme indo", "foto lucu", "meme spongebob"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;

    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek = n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek)
          .then(
            (response) => {
              conn.sendMessage(id, '[ WAIT ] Searching meme⏳ please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(response, 'base64');
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            }
          )
          .catch(
            (error) => {
              console.log(error);
            }
          )
      });
  }

  //Random wallpaper
  if (text.includes('.Wp')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes(".wp")) {
    var items = ["wallpaper aesthetic", "wallpaper tumblr"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;

    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek = n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek)
          .then(
            (response) => {
              conn.sendMessage(id, '[ WAIT ] Searching wallpaper⏳ please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(response, 'base64');
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            }
          )
          .catch(
            (error) => {
              console.log(error);
            }
          )
      });
  }

  //Random twit
  if (text.includes('.Twit')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes(".twit")) {
    var items = ["twitter bucin", "twitter harian", "twitter receh indonesia"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;

    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek = n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek)
          .then(
            (response) => {
              conn.sendMessage(id, '[ WAIT ] Searching twitter⏳ please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(response, 'base64');
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            }
          )
          .catch(
            (error) => {
              console.log(error);
            }
          )

      });
  }

  //Random quotes
  if (text.includes(".loli")) {
    var items = ["anime loli"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;

    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek = n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek)
          .then(
            (response) => {
              conn.sendMessage(id, '[ WAIT ] Searching ⏳ please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(response, 'base64');
              conn.sendMessage(id, buf, MessageType.image, { caption: `👉👈`, quoted: m })
            }
          )
          .catch(
            (error) => {
              console.log(error);
            }
          )
      });
  }

  //Neko
  if (text.includes(".neko")) {
    var items = ["anime neko"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;

    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek = n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek)
          .then(
            (response) => {
              conn.sendMessage(id, '[ WAIT ] Searching ⏳ please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(response, 'base64');
              conn.sendMessage(id, buf, MessageType.image, { caption: `👉👈`, quoted: m })
            }
          )
          .catch(
            (error) => {
              console.log(error);
            }
          )
      });
  }

  //quotes
  if (text.includes('.Quotes')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes(".quotes")) {
    var items = ["sajak rindu", "Kata kata bucin", "kata kata motivasi", "kata kata romantis", "quotes bucin"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;

    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek = n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek)
          .then(
            (response) => {
              conn.sendMessage(id, '[ WAIT ] Searching ⏳ please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(response, 'base64');
              conn.sendMessage(id, buf, MessageType.image, { caption: `Nih gan`, quoted: m })
            }
          )
          .catch(
            (error) => {
              console.log(error);
            }
          )
      });
  }

  //Pencarian image
  if (text.includes('.Img')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .img iqbal_', MessageType.text, { quoted: m });
  }
  if (text.includes(".img")) {
    var teks = text.replace(/.img /, "");
    var items = [`${teks}`];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;

    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek = n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek)
          .then(
            (response) => {
              conn.sendMessage(id, '[ WAIT ] Searching⏳ please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(response, 'base64');
              conn.sendMessage(id, buf, MessageType.image, { caption: `Berhasil mengambil gambar *${teks}*`, quoted: m })
            }
          )
          .catch(
            (error) => {
              console.log(error);
            }
          )
      });
  }

  //Stalker instagram
  if (text.includes('.Stalk')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .stalk @SHARKdan_', MessageType.text, { quoted: m });
  }
  if (text.includes(".stalk")) {
    const sons = text.replace(/.stalk /, "")

    axios.get(`https://docs-jojo.herokuapp.com/api/stalk?username=${sons}`).then((res) => {
      imageToBase64(res.data.graphql.user.profile_pic_url_hd)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, '[ WAIT ] Stalking⏳ please wait', MessageType.text, { quoted: m })
            let hasil = `*>Username* : ${res.data.graphql.user.username}\n*>Nama* : ${res.data.graphql.user.full_name}\n*>Follower* : ${res.data.graphql.user.edge_followed_by.count}\n*>Kategori* : ${res.data.graphql.user.category_name}\n*>Following* : ${res.data.graphql.user.edge_follow.count}\n*>Jumlah Post* : ${res.data.graphql.user.edge_owner_to_timeline_media.count}\n*>Sorotan* : ${res.data.graphql.user.highlight_reel_count}\n*>Bio* : ${res.data.graphql.user.biography}\n*>External url* = ${res.data.graphql.user.external_url}\n\n*Follow* : ${instagram}`;
            conn.sendMessage(id, buf, MessageType.image, { caption: hasil, quoted: m });
          })
    })
  }

  //Pencarian chord gitar
  if (text.includes('.Chord')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .chord anji - dia_', MessageType.text, { quoted: m });
  }
  if (text.includes(".chord")) {
    const teks = text.replace(/.chord /, "")
    axios.get(`https://arugaz.herokuapp.com/api/chord?q=${teks}`).then((res) => {
      conn.sendMessage(id, '[ WAIT ] Searching chord lagu⏳ please wait', MessageType.text, { quoted: m })
      let hasil = `*Judul* : ${teks}\n*chord* : ${res.data.result}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }

  //Informasi anime
  if (text.includes('.Nime')) {
    conn.sendMessage(id, 'Silakan ulangi command degan huruf kecil\n_contoh hun_contoh : .nime naruto_', MessageType.text, { quoted: m });
  }
  if (text.includes(".nime")) {
    const sons = text.replace(/.nime /, "")
    axios.get(`https://arugaz.herokuapp.com/api/kuso?q=${sons}`).then((res) => {
      conn.sendMessage(id, '[ WAIT ] Searching info anime⏳ please wait', MessageType.text, { quoted: m })
      let hasil = `*Judul* : ${res.data.title}\n*Info* : ${res.data.info}\n*Link* : ${res.data.link_dl}\n*Sinopsis* : ${res.data.sinopsis}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }

  //Random fakta
  if (messageType === MessageType.text) {
    let is = m.message.conversation.toLocaleLowerCase()
    if (is == '.fakta') {
      fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/faktaunix.txt')
        .then(res => res.text())
        .then(body => {
          let tod = body.split("\n");
          let pjr = tod[Math.floor(Math.random() * tod.length)];
          let pantun = pjr.replace(/pjrx-line/g, "\n");
          conn.sendMessage(id, pantun, MessageType.text, { quoted: m })
        });
    }

  };

  //Nama ninja
  if (text.includes('.Namae')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .namae SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes(".namae")) {
    const teks = text.replace(/.namae /, "")
    axios.get(`https://api.terhambar.com/ninja?nama=${teks}`).then((res) => {
      conn.sendMessage(id, '[ WAIT ] Menggubah namamu⏳ please wait', MessageType.text, { quoted: m })
      let hasil = `Nama Ninja kamu:\n\n*${res.data.result.ninja}*`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }
  //Random informasi gempa
  if (text.includes('.Gempa')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes(".gempa")) {

    axios.get(`https://arugaz.herokuapp.com/api/infogempa`).then((res) => {

      conn.sendMessage(id, '[ WAIT ] Menampilkan info gempa⏳ please wait', MessageType.text, { quoted: m })
      let hasil = ` *INFO GEMPA*\n*Lokasi* : _${res.data.lokasi}_\n *Kedalaman* : _${res.data.kedalaman}_\n*Koordinat* : _${res.data.koordinat}_\n*Magnitude* : _${res.data.magnitude}_\n*Waktu* : _${res.data.waktu}_\n${res.data.potensi}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }

  //Informasi cuaca daerah
  if (text.includes('.Cuaca')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .cuaca bandung_', MessageType.text, { quoted: m });
  }
  if (text.includes(".cuaca")) {
    const cuaca = text.replace(/.cuaca /, "")
    axios.get(`https://mhankbarbar.tech/api/cuaca?q=${cuaca}&apiKey=${apibarbar}`).then((res) => {
      conn.sendMessage(id, '[ WAIT ] Menampilkan cuaca⏳ please wait', MessageType.text, { quoted: m })
      let hasil = `*Tempat* : ${cuaca}\n*Angin* : ${res.data.result.angin}\n*Cuaca* : ${res.data.result.cuaca}\n*Deskripsi* : ${res.data.result.desk}\n*Kelembaban* : ${res.data.result.kelembapan}\n*Suhu* : ${res.data.result.suhu}\n*Udara* : ${res.data.result.udara}`
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m })
    })
  }

  //Random puisi
  if (text.includes('.Puisi')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes(".puisi1")) {
    axios.get(`https://arugaz.herokuapp.com/api/puisi1`).then((res) => {
      conn.sendMessage(id, '[ WAIT ] Searching puisi⏳ please wait', MessageType.text, { quoted: m })
      let hasil = `${res.data.result}`
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m })
    })
  }

  if (text.includes(".puisi2")) {
    axios.get(`https://arugaz.herokuapp.com/api/puisi2`).then((res) => {
      conn.sendMessage(id, '[ WAIT ] Searching puisi⏳ please wait', MessageType.text, { quoted: m })
      let hasil = `${res.data.result}`
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m })
    })
  }

  if (text.includes(".puisi3")) {
    axios.get(`https://arugaz.herokuapp.com/api/puisi3`).then((res) => {
      conn.sendMessage(id, '[ WAIT ] Searching puisi⏳ please wait', MessageType.text, { quoted: m })
      let hasil = `${res.data.result}`
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m })
    })
  }

  //Random cerpen
  if (text.includes('.Cerpen')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes(".cerpen")) {
    axios.get(`https://arugaz.herokuapp.com/api/cerpen`).then((res) => {
      conn.sendMessage(id, '[ WAIT ] Searching cerpen⏳ please wait', MessageType.text, { quoted: m })
      let hasil = `${res.data.result}`
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m })
    })
  }

  //Pemendek link
  if (text.includes('.Shortlink')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .shortlink http://www.facebook..._', MessageType.text, { quoted: m });
  }
  if (text.includes(".shortlink")) {
    const teks = text.replace(/.shortlink /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/shorturl?url=${teks}`).then((res) => {
      let hasil = `${res.data.result}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }

  //Text to pict
  if (text.includes('.Logopornhub')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .logopornhub SHARK/nime_', MessageType.text, { quoted: m });
  }
  if (text.includes('.logopornhub')) {
    var porn = text.split(".logopornhub ")[1];
    var text1 = porn.split("/")[0];
    var text2 = porn.split("/")[1];
    axios.get(`https://mhankbarbar.tech/api/textpro?theme=pornhub&text1=${text1}&text2=${text2}`).then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, '[ WAIT ] In progress⏳ Please Wait ', MessageType.text, { quoted: m })
            conn.sendMessage(id, buf, MessageType.image, { quoted: m });
          })
    })
  }

  if (text.includes('.Ninja')) {

    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .ninja SHARK/nime_', MessageType.text, { quoted: m });

  }
  if (text.includes('.ninja')) {
    var porn = text.split(".ninja ")[1];
    var text1 = porn.split("/")[0];
    var text2 = porn.split("/")[1];
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=ninjalogo&text1=${text1}&text2=${text2}&apikey=${tobzkey}`).then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, '[ WAIT ] In progress⏳ please wait a moment', MessageType.text, { quoted: m })
            conn.sendMessage(id, buf, MessageType.image, { quoted: m });
          })
    })
  }

  if (text.includes('.Wolf')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .wolf SHARK/nime_', MessageType.text, { quoted: m });

  }
  if (text.includes('.wolf')) {
    var porn = text.split(".wolf ")[1];
    var text1 = porn.split("/")[0];
    var text2 = porn.split("/")[1];
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=wolflogo2&text1=${text1}&text2=${text2}&apikey=${tobzkey}`).then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, '[ WAIT ] In progress⏳ please wait a moment', MessageType.text, { quoted: m })
            conn.sendMessage(id, buf, MessageType.image, { quoted: m });
          })
    })
  }

  if (text.includes('.Lion')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .lion SHARK/nime_', MessageType.text, { quoted: m });
  }
  if (text.includes('.lion')) {
    var porn = text.split(".lion ")[1];
    var text1 = porn.split("/")[0];
    var text2 = porn.split("/")[1];
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=lionlogo&text1=${text1}&text2=${text2}&apikey=${tobzkey}`).then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, '[ WAIT ] In progress⏳ please wait a moment', MessageType.text, { quoted: m })
            conn.sendMessage(id, buf, MessageType.image, { quoted: m });
          })
    })
  }

  if (text.includes('.Glitch')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .glitch SHARK/nime_', MessageType.text, { quoted: m });
  }
  if (text.includes('.glitch')) {
    var porn = text.split(".glitch ")[1];
    var text1 = porn.split("/")[0];
    var text2 = porn.split("/")[1];
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=glitch&text1=${text1}&text2=${text2}&apikey=${tobzkey}`).then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, '[ WAIT ] In progress⏳ please wait a moment', MessageType.text, { quoted: m })
            conn.sendMessage(id, buf, MessageType.image, { quoted: m });
          })
    })
  }

  if (text.includes('.Joker')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .joker SHARK_', MessageType.text, { quoted: m });

  }
  if (text.includes('.joker')) {
    const teks = text.replace(/.joker /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=jokerlogo&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text⏳ please wait ', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Blood')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .blood SHARK_', MessageType.text, { quoted: m });

  }
  if (text.includes('.blood')) {
    const teks = text.replace(/.blood /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=blood&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text⏳ please wait ', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Water')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .water SHARK_', MessageType.text, { quoted: m });

  }
  if (text.includes('.water')) {
    const teks = text.replace(/.water /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=dropwater&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text⏳ please wait ', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.neon2')) {
    const teks = text.replace(/.neon2 /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=neon_light&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text⏳ please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Neon')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .neon2 SHARK_', MessageType.text, { quoted: m });

  }
  if (text.includes('.neon1')) {
    const teks = text.replace(/.neon1 /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=neon_technology&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text, please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  if (text.includes('.Snow')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .Snow SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.snow')) {
    const teks = text.replace(/.snow /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=snow&text=${teks}&apikey=${tobzkey}`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating text, please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  //Quotes maker
  if (text.includes('.Kata')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .kata matamu indah bagai pelangi/SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes('.kata')) {
    const gh = text.split(".kata ")[1];
    const kata = gh.split("/")[0];
    const author = gh.split("/")[1];
    axios.get(`https://terhambar.com/aw/qts/?kata=${kata}&author=${author}&tipe=rain`)
      .then((res) => {
        imageToBase64(res.data.result)
          .then(
            (ress) => {
              conn.sendMessage(id, '[ WAIT ] Creating quotes⏳ please wait', MessageType.text, { quoted: m })
              var buf = Buffer.from(ress, 'base64')
              conn.sendMessage(id, buf, MessageType.image, { quoted: m })
            })
      })
  }

  //jadwal tv nasional
  if (text.includes('.Jadwaltv')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .jadwaltv rcti_', MessageType.text, { quoted: m });
  }
  if (text.includes(".jadwaltv")) {
    const teks = text.replace(/.jadwaltv /, "")
    axios.get(`https://mhankbarbar.tech/api/jdtv?ch=${teks}&apiKey=${apibarbar}`).then((res) => {
      conn.sendMessage(id, '[ WAIT ] Menampilkan jadwal tv⏳ please wait', MessageType.text, { quoted: m })
      let hasil = `${res.data.result}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }

  //Informasi BMKG
  if (text.includes('.Bmkg')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  if (text.includes(".bmkg")) {
    axios.get(`https://mnazria.herokuapp.com/api/bmkg-gempa`).then((res) => {
      conn.sendMessage(id, '[ WAIT ] Searching info BMKG⏳ please wait', MessageType.text, { quoted: m })
      let hasil = `${res.data.result}\n*Saran* : ${res.data.saran}`
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m })
    })
  }

  //Kamus besar bahasa indonesia
  if (text.includes('.Kbbi')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : kbbi manusia_', MessageType.text, { quoted: m });
  }
  if (text.includes(".kbbi")) {
    const teks = text.replace(/.kbbi /, "")
    axios.get(`https://mhankbarbar.tech/api/kbbi?query=${teks}&apiKey=${apibarbar}`).then((res) => {
      let hasil = `*Hasil* :\n${res.data.result}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }

  //Hari nasional
  if (text.includes('.Tglnas')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .tglnas 17 agustus_', MessageType.text, { quoted: m });
  }
  if (text.includes(".tglnas")) {
    const teks = text.replace(/.tglnas /, "")
    axios.get(`https://api.haipbis.xyz/harinasional?tanggal=${teks}`).then((res) => {
      let hasil = `*Tanggal* : ${res.data.tanggal}\n*Keterangan* : ${res.data.keterangan}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }

  //Get zodiak
  if (text.includes('.Getzodiak')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .getzodiak SHARK & 09-09-2009_', MessageType.text, { quoted: m });
  }
  if (text.includes('.getzodiak')) {
    const gh = text.split(".getzodiak ")[1];
    const nama = gh.split("&")[0];
    const tgl = gh.split("&")[1];
    axios.get(`https://arugaz.herokuapp.com/api/getzodiak?nama=${nama}&tgl-bln-thn=${tgl}`)
      .then((res) => {
        conn.sendMessage(id, '[ WAIT ] Get zodiak⏳ please wait', MessageType.text, { quoted: m })
        let hasil = `*Nama* : ${res.data.nama}\n*Tanggal lahir* : ${res.data.lahir}\n*Ultah* : ${res.data.ultah}\n*Usia* : ${res.data.usia}\n*Zodiak* : ${res.data.zodiak}`;
        conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
      })
  }

  //Random Al-Qur'an
  if (text.includes('.Ngaji')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }
  else if (text == '.ngaji') {
    axios.get('https://api.banghasan.com/quran/format/json/acak').then((res) => {
      const sr = /{(.*?)}/gi;
      const hs = res.data.acak.id.ayat;
      const ket = `${hs}`.replace(sr, '');
      let hasil = `[${ket}]   ${res.data.acak.ar.teks}\n\n${res.data.acak.id.teks}(QS.${res.data.surat.nama}, Ayat ${ket})`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }

  //Random loli
  if (text.includes('.Loli')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }

  //Random neko
  if (text.includes('.Neko')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase', MessageType.text, { quoted: m });
  }

  //Primbon kecocokan berdasarkan nama
  if (text.includes('.Couple')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \n_example : .couple SHARK & udan_', MessageType.text, { quoted: m });
  }
  if (text.includes('.couple')) {
    const gh = text.split(".couple ")[1];
    const lu = gh.split("&")[0];
    const doi = gh.split("& ")[1];
    axios.get(`https://arugaz.herokuapp.com/api/jodohku?nama=${lu}&pasangan=${doi}`)
      .then((res) => {
        let hasil = `*Kecocokan berdasarkan nama*\n\n   *Nama* : ${res.data.nama}\n   *Pasangan* : ${res.data.pasangan}\n\n*Positif* : ${res.data.positif}\n*Negatif* : ${res.data.negatif}`;
        conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
      })
  }
  //Primbon arti nama
  if (text.includes('.Arti')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .arti SHARK_', MessageType.text, { quoted: m });
  }
  if (text.includes(".arti")) {
    const teks = text.replace(/.arti /, "")
    axios.get(`https://arugaz.herokuapp.com/api/artinama?nama=${teks}`).then((res) => {
      let hasil = `*Arti dari namamu adalah*\n\n    *${teks}* ${res.data.result}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }
  //simsimi
  if (text.includes('.Bot')) {
    conn.sendMessage(id, 'Please repeat the command with lowercase \ n_example : .bot apa kabar_', MessageType.text, { quoted: m });
  }
  if (text.includes(".bot")) {
    const teks = text.replace(/.bot /, "")
    axios.get(`https://st4rz.herokuapp.com/api/simsimi?kata=${teks}`).then((res) => {
      let hasil = `${res.data.result}\n\n*Simsimi chat*`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }

  //Menu
  if (text.includes('.menu')) {
    var nomor = m.participant
    const options = {
      text: `*നമസ്കാരം @${nomor.split("@s.whatsapp.net")[0]} I'm ${BotName}*

_Use period (.) & Lowercase to run command_
_Ex means example_͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏

         ────────────────
➸ മൊതലാളീ: *${ow}*
➸ Prefix「 . 」*
➸ Status: *Online*
➸ Group:  *${groupName}*
➸ Fitur Error : *${eror}*
➸ Bot Aktif : *${aktif} WIB*
➸ Official group 
  _${wa}_
➸ Follow IG:
  _${instagram}_
         ────────────────
╔════════════════════
║───────〘 ${BotName}〙───────
╠════════════════════
╠≽️ *.Bot (Teks)*
╠ നേരം പോക്ക് ചാറ്റ്
╠≽️ *.Info*
╠ ബോട്ടിന് പിശക് ഉണ്ടെങ്കിൽ 
╠≽️ *.Owner*
╠ _ബോട്ട് ഉടമ വിവരം_ 
╠≽️ *.Install*
╠ _ ബോട്ട് എങ്ങനെ ഇൻസ്റ്റാൾ ചെയ്യാം 
╠≽️ *.Donasi*
╠ _ദാന വിവരം_ 
╠≽️ *.Bug (Teks)*
╠ _ ഉടമയ്ക്ക് ബഗ് വിവരം നൽകുക_
╠════════════════════
║─────〘  *List menu* 〙─────
╠════════════════════
╠≽️️ *.Fun*
╠≽️ *.Game*
╠≽️ *.Grup*
╠≽️ *.Primbon*
╠≽️️ *.Tools*
╠≽️ *.Picture*
╠≽️ *.Text1*
╠≽️ *.Text2*
╠≽️ *.Edukasi*
╠≽️️ *.Weather*
╠≽️ *.Other*
╠≽️ *.Download*
╠════════════════════
║──────── *${BotName}* ──────── 
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║──────── *${BotName}* ────────
  https://chat.whatsapp.com/KPsKI8FyFKu6xdGyRbIBjI 
╠════════════════════
╠════════════════════
║────✪ CYBER SHARK────
╚════════════════════`,
      contextInfo: { mentionedJid: [nomor] }
    }
    conn.sendMessage(id, options, MessageType.text, { quoted: m })
  }

  else if (text == '.download') {

    conn.sendMessage(id, `
        ────────────────
Use lowercase and no brackets () commands
        ────────────────
╔════════════════════
║─────〘  *Download* 〙─────
╠════════════════════
╠≽️ *.Ytmp3/.Ytmp4 (link)*
╠ _Ex = .Ytmp3 http:/www.yout..._ 
╠≽️ *.Twt (link)*
╠ _Ex = .Twt http:/www.twt..._ 
╠≽️ *.Ig (link)*
╠ _Ex = .Ig http:/www.inst.._
╠≽️ *.Fb (link)*
╠ _Ex = .Fb http:/www.facebo.._
╠≽ *.Tik (link)*
╠ _Ex = .Tik http:/www.tiktok.._ 
╠≽ *.Joox (Judul lagu)*
╠ _Ex = .Joox akad - payung teduh_ 
╠≽ *.Yts (Judul lagu)*
╠ _Ex = .Yts akad - payung teduh_ 
╠════════════════════
║──────── *${BotName}* ──────── 
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║──────── *${BotName}* ────────
╠════════════════════
╠════════════════════
| https://github.com/-BOT/ck-wp-bot
║────✪ ���CYBER SHARK ✪────
╚════════════════════`, MessageType.text, { quoted: m });
  }

  else if (text == '.other') {
    conn.sendMessage(id, `
        ────────────────
Use lowercase and no brackets () commands
        ────────────────
╔════════════════════
║──────〘  *Other* 〙──────
╠════════════════════
╠≽️ *.Sholat (Regio Namen h)*
╠ _Ex = .Sholat Idukki_ 
╠≽️ *.Jadwaltv (channel name)*
╠ _Ex = .Jadwaltv Rcti_ 
╠≽️ *.Lirik*
╠ _Ex = .Lirik Anji - Dia_ 
╠≽️ *.Chord*
╠ _Ex = .Chord Anji - Dia_ 
╠≽️ *.Map (nama daerah)*
╠ _Mini map_ 
╠════════════════════
║──────── *${BotName} ──────── 
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║──────── *${BotName}* ────────
╠════════════════════
╠════════════════════
║────✪ CYBER SHARK ✪────
╚════════════════════`, MessageType.text, { quoted: m });
  }

  else if (text == '.weather') {
    conn.sendMessage(id, `
        ────────────────
Use commands in lowercase and without parentheses ()
        ────────────────
╔════════════════════
║─────〘  *Weather* 〙──────
╠════════════════════
╠≽️ *.Bmkg*
╠ _Random info from BMKG_
╠≽️ *.Gempa*
╠ _Random info gempa_ 
╠≽️ *.Cuaca (area name) *
╠ _Ex = .Cuaca Kozhikode_
╠════════════════════
║──────── *${BotName}* ──────── 
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║──────── *${BotName}* ────────
╠════════════════════
╠════════════════════
║────✪ CYBER SHARK ✪────
╚════════════════════`, MessageType.text, { quoted: m });
  }

  else if (text == '.edukasi') {
    conn.sendMessage(id, `
        ────────────────
Use commands in lowercase and without parentheses ()
        ────────────────
╔════════════════════
║──────〘 *Education* 〙─────
╠════════════════════
╠≽️ *.Brainly (Question)*
╠ _Take Brainly answer_ 
╠≽️ *.Tl (Language text / code)*
╠ _Ex : .Tl how are you/id_
╠≽️ *.Kodebahasa*
╠ _Shows language code_ 
╠≽️ *.Ngaji*
╠ _Random verse of the Quran_ 
╠≽️ *.Alquran (paragraph number)*
╠ _Ex : .Alquran 1_ 
╠≽️ *.Wiki*
╠ _Ex = .Wiki Kerala History_ 
╠≽️ *.Covid*
╠ _Latest information on covid indo_ 
╠≽️ *.Fakta*
╠ _Random facts_ 
╠≽️ *.Kbbi( Texts)*
╠ _Ex = .Kbbi Humen_ 
╠≽️ *.Tgl (Date searched)*
╠ _Info about national dates_
╠════════════════════
║──────── *${BotName}* ──────── 
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║──────── *${BotName}* ────────
╠════════════════════
╠════════════════════
║────✪ CYBER SHARK ✪────
╚════════════════════`, MessageType.text, { quoted: m });
  }

  else if (text == '.text1') {
    conn.sendMessage(id, `
        ────────────────
Use lowercase and no brackets () commands
        ────────────────
╔════════════════════
║───────〘  *Text* 〙──────
╠════════════════════
╠≽ *.Kata (quotes/author)*
╠ _Ex = .Said I love him / shark_ 
╠≽ *.Logopornhub (text1/text2)*
╠ _Ex : .Logopornhub SHARK/nime_
╠≽ *.Lion (text1/text2)*
╠ _Ex : .Lion SHARK/nime_
╠≽ *.Ninja (text1/text2)*
╠ _Ex : .Ninja SHARK/nime_
╠≽ *.Joker (text1/text2)*
╠ _Ex : .Joker SHARK/nime_
╠≽ *.Glitch (teks1/teks2)*
╠ _Ex : .Glich SHARK/nime_
╠≽ *.Wolf (teks1/teks2)*
╠ _Ex : .Wolf SHARK/nime_
╠≽ *.Snow (teks)*
╠ _Ex : .Snow SHARK_
╠≽ *.Neon1 (teks)*
╠ _Ex : .Neon1 SHARK_
╠≽ *.Neon2 (teks)*
╠ _Ex : .Neon2 SHARK_
╠≽ *.Neon3d (teks)*
╠ _Ex : .Neon3d SHARK_
╠≽ *.Neon4 (teks)*
╠ _Ex : .neon4 SHARK_
╠≽ *.Neon5 (teks)*
╠ _Ex : .neon5 SHARK_
╠≽ *.Snow (teks)*
╠ _Ex : .Snow SHARK_
╠≽ *.Coding (teks)*
╠ _Ex : .Coding SHARK_
╠≽ *.Thunder (teks)*
╠ _Ex : .Thunder SHARK_
╠≽ *.Holo (teks)*
╠ _Ex : .Holo SHARK_
╠≽ *.Blood (teks)*
╠ _Ex : .Blood SHARK_
╠≽ *.Water (teks)*
╠ _Ex : .Water SHARK_
╠≽ *.Old (teks)*
╠ _Ex : .Old SHARK_
╠≽ *.Balon (teks)*
╠ _Ex : .Balon SHARK_
╠≽ *.Metal (teks)*
╠ _Ex : .Metal SHARK_
╠≽ *.Sand1 (teks)*
╠ _Ex : .Sand1 SHARK_
╠≽ *.Sand2 (teks)*
╠ _Ex : .Sand2 SHARK_
╠≽ *.Sand3 (teks)*
╠ _Ex : .Sand3 SHARK_
╠≽ *.Sand4 (teks)*
╠ _Ex : .Sand4 SHARK_
╠≽ *.Sky (teks)*
╠ _Ex : .Sky SHARK_
╠≽ *.Cloud (teks)*
╠ _Ex : .Cloud SHARK_
╠≽ *.Blackpink (teks)*
╠ _Ex : .Blackpink SHARK_
╠≽ *.Fontgen (teks)*
╠ _Ex : .Fontgen SHARK_
╠════════════════════
║──────── *${BotName}* ──────── 
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║──────── *${BotName}* ────────
╠════════════════════
 https://github.com/-BOT/ck-wp-bot
╠════════════════════
║────CYBER SHARK��� ✪────
╚════════════════════`, MessageType.text, { quoted: m });
  }

  else if (text == '.text2') {
    conn.sendMessage(id, `
        ────────────────
Use lowercase and no brackets () commands
        ────────────────
╔════════════════════
║───────〘  *Text* 〙──────
╠════════════════════
╠≽ Bit8 (text / text) *
╠ _Ex = .Bit8 SHARK / nime_
╠≽ * .Pubg (text1 / text2) *
╠ _Ex: .Pubg SHARK / nime_
╠≽ * .Batllef (text1 / text2) *
╠ _Ex: .Battlef SHARK / nime_
╠≽ * .Shadow (text) *
╠ _Ex: SHARK Shadow.
╠≽ * .Paper1 (text) *
╠ _Ex: .Paper SHARK_
╠≽ * .Paper2 (text) *
╠ _Ex: .Paper SHARK_
╠≽ * .Coffee (text) *
╠ _Ex: .coffee SHARK_
╠≽ * .Block (text) *
╠ _Ex: .Block SHARK_
╠≽ * .Heart (text) *
╠ _Ex: .Heart SHARK_
╠≽ * .Grass (text) *
╠ _Ex: .Grass SHARK_
╠≽ * .Ocean (text) *
╠ _Ex: .Ocean SHARK_
╠≽ * .Board (text) *
╠ _Ex: .Board SHARK_
╠≽ * .Mwolf (text) *
╠ _Ex: .Mwolf SHARK_
╠≽ * .Mglow (text) *
╠ _Ex: .Mglow SHARK_
╠≽ * .Hpotter (text) *
╠ _Ex: .Hpotter SHARK_
╠≽ * .Cfire (text) *
╠ _Ex: .Cfire SHARK_
╠≽ * .Wface1 (text) *
╠ _Ex: .Wface1 SHARK_
╠≽ * .Wface2 (text) *
╠ _Ex: .Wface2 SHARK_
╠≽ * .Battlef (text) *
╠ _Ex: .Battlef SHARK_
╠≽ * .Lol (text) *
╠ _Ex: .Lol SHARK_
╠≽ * .Csgo (text) *
╠ _Ex: .Csgo SHARK_
╠≽ *. Throne (text) *
╠ _Ex:. Throne of SHARK_
╠≽ * .Owatch (text) *
╠ _Ex: .Owatch SHARK_
╠════════════════════
║──────── *${BotName}* ──────── 
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║──────── *${BotName}* ────────
╠════════════════════
╠════════════════════
║────✪ CYBER SHARK��� ✪────
╚════════════════════`, MessageType.text, { quoted: m });
  }

  else if (text == '.picture') {
    conn.sendMessage(id, `
        ────────────────
Use lowercase and no brackets () commands
        ────────────────
╔════════════════════
║──────〘  *Picture* 〙──────
╠════════════════════
╠≽️ *.Cecan/.Cogan*
╠ _Random girl / boy photo_ 
╠≽️ *.Anime*
╠ _Random anime photo_ 
╠≽️ *.Loli*
╠ _Random foto anime loli_ 
╠≽️ *.Neko*
╠ _Random foto anime neko_ 
╠≽️ *.Quotes*
╠ _Random foto quotes_ 
╠≽️ *.Twit*
╠ _Random twit_
╠≽️ *.Wp*
╠ _Random wallpaper_
╠≽️ *.Img Texts)*
╠ _Ex = .Img iqbal_ 
╠≽️ *.Meme*
╠ _Random foto lucu_ 
╠════════════════════
║──────── *${BotName}* ──────── 
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║──────── *${BotName}* ────────
╠════════════════════
╠════════════════════
║────✪ ���Cyberkllan ✪────
╚════════════════════`, MessageType.text, { quoted: m });
  }

  else if (text == '.tools') {
    conn.sendMessage(id, `
        ────────────────
Use lowercase and no brackets () commands
        ────────────────
╔════════════════════
║──────〘  *Tools* 〙───────
╠════════════════════
╠≽️ *.Stiker*
╠ _ Send photo type. Sticker_ 
╠≽️ *.Nulis*
╠ _Ex = .Nulis I love shark_ 
╠≽️ *.Ocr*
╠ _Copy sentences in the image_ 
╠≽️ *.Stalk (username Ig)*
╠ _Ex = .Stalk @Kcg_ 
╠≽️ *.Shortlink (link)*
╠ _Link shortener_ 
╠≽️ *.ssweb (link)*
╠ _Screenshoot Web_
╠════════════════════
║──────── *${BotName}* ──────── 
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║──────── *${BotName}* ────────
╠════════════════════
╠════════════════════
ⓐ https://github.com/SHARK-BOT/ck-wp-bot
╚════════════════════`, MessageType.text, { quoted: m });
  }

  else if (text == '.primbon') {
    conn.sendMessage(id, `
        ────────────────
Use lowercase and no brackets () commands
        ────────────────
╔════════════════════
║─────〘  *Horoscope* 〙──────
╠════════════════════
╠≽️ *.Arti (Your name)*
╠ _Ex = .Arti shark_ 
╠≽️ *.Couple (Your name &lover Namei)*
╠ _Ex = .Couple shark & bot_ 
╠≽️ *.Getzodiak (Name &OfOf Birthdayl)
╠ _Ex : .Getzodiak shark & 09-09-2002_ 
╠≽️ *.Zodiak Namea zodiak)*
╠ _Ex : .Zodiak libra_ 
╠≽️ *.Mimpi (teks)*
╠ _Ex : .Mimpi ular_
╠════════════════════
║──────── *${BotName}* ──────── 
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║──────── *${BotName}* ────────
╠════════════════════
╠════════════════════
║────✪ CYBER SHARK ✪────
╚════════════════════ `, MessageType.text, { quoted: m });
  }

  else if (text == '.fun') {
    conn.sendMessage(id, `
        ────────────────
Use lowercase and no brackets () commands
        ────────────────
╔════════════════════
║───────〘  *Fun* 〙───────
╠════════════════════
╠≽️ *.Pantun*
╠ _Random rhymes_ 
╠≽️ *.Receh*
╠ _Random jokes receh_ 
╠≽️ *.Statpack*
╠ _Random bapack status_ 
╠≽️ *.Gombal*
╠ _Random word crap_ 
╠≽️ *Motivasi*
╠ _Random motivation_
╠≽️ *.Say (texts)*
╠ _Ex : .Say hai CYBER SHARK_ 
╠≽️ *Nime (Namea anime)*
╠ _Ex : .Nime naruto_ 
╠≽️ *.Namae (Teks)*
╠ _Ex : .Namae Kcg_ 
╠≽️ *.Puisi1*
╠ _Random Poetry_ 
╠≽️ *.Puisi2*
╠ _Random Poetry_ 
╠≽️ *.Puisi3*
╠ _Random Poetry_ 
╠≽️ *.Cerpen*
╠ _Random short stories_ 
╠≽️ *.Tagme*
╠ _Auto tag_ 
╠≽️ *.Seberapagay*
╠ Percentage of gays 
╠≽️ *.Seberapabucin*
╠ _Percentage of bucin_
╠≽️ *.Ping*
╠ _Know the speed of response_ 
╠≽️ *.Chatprank (tXts1/teks2)*
╠ _Ex : .Chatprank Hai bang/sat_ 
╠≽️ *.Alay (teks)*
╠ _Ex : .Alay hai SHARK_ 
╠════════════════════
║──────── *${BotName}* ──────── 
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║──────── *${BotName}* ────────
╠════════════════════
╠════════════════════
║────✪ CYBER SHARK ✪────
╚════════════════════`, MessageType.text, { quoted: m });
  }

  else if (text == '.game') {
    conn.sendMessage(id, `
        ────────────────
Use lowercase and no brackets () commands
        ────────────────
╔════════════════════
║───────〘  *Game* 〙──────
╠════════════════════
╠≽️ *.Tebakgambar*
╠ _Random guess image_
╠≽️ *.Family100*
╠ _Random quiz Family100_ 
╠≽️ *.Tod*
╠ _.Truth_ 
╠ _.Dare_ 
╠≽️ *Kerang ajaib*
╠ _.Apakah (Text)_ 
╠ _.Bolehkah (Text)_ 
╠ _.Kapan (Text)_ 
╠════════════════════
║──────── *${BotName}* ──────── 
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║──────── *${BotName}* ────────
 https://chat.whatsapp.com/KPsKI8FyFKu6xdGyRbIBjI
╠════════════════════
╠════════════════════
║────✪ CYBER SHARK ✪────
╚════════════════════ `, MessageType.text, { quoted: m });
  }

  else if (text == '.grup') {
    conn.sendMessage(id, `
        ────────────────
Use lowercase and no brackets () commands
        ────────────────
╔════════════════════
║───────〘  *Group*〙──────
╠════════════════════
╠≽️ *.Intro*
╠ _Intro new member_ 
╠≽ .Setname e( Text)
╠ _Rename group_ 
╠≽️ *.Setdesc (Texts)*
╠ _Change description_ 
╠≽️ *.Opengc*
╠ _Open the group_ 
╠≽️ *.Closegc*
╠ _Close the group_ 
╠≽️ *.Linkgc*
╠ _Fetching the group link_ 
╠≽️ *.Rules*
╠ _Fetch group description_ 
╠≽️ *!Notif (Teks)*
╠ _ Give notification kemember_ 
╠════════════════════
║──────── *${BotName}* ──────── 
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║  ▌│█║▌║▌║║▌║▌║█│▌▌│█║
║──────── *${BotName}* ────────
╠════════════════════
╠════════════════════
║────CYBER SHARK��� ✪────
╚════════════════════`, MessageType.text, { quoted: m });
  }


  //Pesan kosong
  if (text.includes('.chatprank')) {
    const gh = text.split(".chatprank ")[1];
    const nama = gh.split("/")[0];
    const tgl = gh.split("/")[1];
    let hasil = `${nama}͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏${tgl}`;
    conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
  }
  //Al-Qur'an
  if (text.includes('.Alquran')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase\n_contoh : .alquran 1_', MessageType.text, { quoted: m });
  }
  if (text.includes(".alquran")) {
    const teks = text.replace(/.alquran /, "")
    axios.get(`https://api.vhtear.com/quran?no=${teks}&apikey=${apivhtear}`).then((res) => {
      let hasil = `*Surah* : ${res.data.result.surah}\n${res.data.result.quran}`;
      conn.sendMessage(id, hasil, MessageType.text, { quoted: m });
    })
  }

  //Gombalan
  if (messageType === MessageType.text) {
    let is = m.message.conversation.toLocaleLowerCase()
    if (is == '.gombal') {
      fetch('https://raw.githubusercontent.com/CYBER SHARKyt/chunni-bot/main/random-scraper/main/random/Globel.txt')
        .then(res => res.text())
        .then(body => {
          let tod = body.split("\n");
          let pjr = tod[Math.floor(Math.random() * tod.length)];
          let pantun = pjr.replace(/pjrx-line/g, "\n");
          conn.sendMessage(id, pantun, MessageType.text, { quoted: m })
        });
    }

  };

  //Receh
  if (messageType === MessageType.text) {
    let is = m.message.conversation.toLocaleLowerCase()
    if (is == '.receh') {
      fetch('https://raw.githubusercontent.com/CYBER SHARKyt/chunni-bot/main/random-scraper/main/random/Receh.txt')
        .then(res => res.text())
        .then(body => {
          let tod = body.split("\n");
          let pjr = tod[Math.floor(Math.random() * tod.length)];
          let pantun = pjr.replace(/pjrx-line/g, "\n");
          conn.sendMessage(id, pantun, MessageType.text, { quoted: m })
        });
    }
  };

  //truth
  if (messageType === MessageType.text) {
    let is = m.message.conversation.toLocaleLowerCase()
    if (is == '.truth') {
      fetch('https://raw.githubusercontent.com/CYBER SHARKyt/chunni-bot/main/random-scraper/main/random/Truth.txt')
        .then(res => res.text())
        .then(body => {
          let tod = body.split("\n");
          let pjr = tod[Math.floor(Math.random() * tod.length)];
          let pantun = pjr.replace(/pjrx-line/g, "\n");
          conn.sendMessage(id, pantun, MessageType.text, { quoted: m })
        });
    }
  };

  //dare
  if (messageType === MessageType.text) {
    let is = m.message.conversation.toLocaleLowerCase()
    if (is == '.dare') {
      fetch('https://raw.githubusercontent.com/CYBER SHARKyt/chunni-bot/main/random-scraper/main/random/dare.txt')
        .then(res => res.text())
        .then(body => {
          let tod = body.split("\n");
          let pjr = tod[Math.floor(Math.random() * tod.length)];
          let pantun = pjr.replace(/pjrx-line/g, "\n");
          conn.sendMessage(id, pantun, MessageType.text, { quoted: m })
        });
    }
  };

  //status bapack
  if (messageType === MessageType.text) {
    let is = m.message.conversation.toLocaleLowerCase()
    if (is == '.statpack') {
      fetch('https://raw.githubusercontent.com/CYBER SHARKyt/chunni-bot/main/random-scraper/main/random/Status.txt')
        .then(res => res.text())
        .then(body => {
          let tod = body.split("\n");
          let pjr = tod[Math.floor(Math.random() * tod.length)];
          let pantun = pjr.replace(/pjrx-line/g, "\n");
          conn.sendMessage(id, pantun, MessageType.text, { quoted: m })
        });
    }

  };

  //tod
  if (text.includes('.Tod')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase ', MessageType.text, { quoted: m });
  }
  if (text.includes('.tod')) {
    var url = "https://raw.githubusercontent.com/CYBER SHARKyt/chunni-bot/main/Scrap/Img/tod/todscarp.png";
    axios.get(url).then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            let hasil = `
        ────────────────
Promise to carry out whatever orders are given.
        ────────────────
Please select:

*.Truth*
*.Dare*

*Complete the command to perform the next TOD * ⚠️`;
            conn.sendMessage(id, buf, MessageType.image, { caption: hasil, quoted: m })
          })
    })
  }

  //kerang
  if (text.includes('.Kerang')) {
    conn.sendMessage(id, 'Please repeat the command in lowercase ', MessageType.text, { quoted: m });
  }
  if (text.includes('.kerang')) {
    var url = "https://user-images.githubusercontent.com/72728486/104582636-b661aa80-5692-11eb-9344-e808eed8e0df.jpg";
    axios.get(url).then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            let hasil = `
        ────────────────
List of questions that can be answered :
        ────────────────
* Is (Text) *
* May (Text) *
* When (Text) *
* Rate (Text) * `;
            conn.sendMessage(id, buf, MessageType.image, { caption: hasil, quoted: m })
          })
    })
  }
  else if (text.startsWith('.ssweb')) {
    let linknyo = text.replace('.ssweb ', "");
    let client = conn;
    if (linknyo.includes('.')) {
      axios.get(`https://api-mwmaulana310.herokuapp.com/ssweb?src=${linknyo}`)
        .then(res => {
          let resData = res.data.resultNosplit;
          let buffer = Buffer.from(resData, 'base64')
          client.sendMessage(id, buffer, MessageType.image, { quoted: m, caption: `nih gan...` })
        })
        .catch(err => client.sendMessage(id, 'Sorry for the error, try to make sure the link is correct! ', MessageType.text, { quoted: m }));
    } else {
      conn.sendMessage(id, "Sorry what you entered was not a link! ", MessageType.text, { quoted: m });
    }
  }
    


})

  
