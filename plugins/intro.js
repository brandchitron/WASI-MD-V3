// Fork And Edit AS You Wish //

const { smd, Config,smdBuffer,  prefix } = require('../lib')


var surl = 'https:/github.com/mouricedevs/Gifted-Md' // Source URL
const number = '254728782591'
var name = ' Gifted Tech'
var body = '𝑇𝛩𝑈𝐶𝛨 𝛨𝛯𝑅𝛯'
var image = 'https://telegra.ph/file/a202f454c9532c3f5b7f8.jpg'
let text = `╭═══ ━ ━ ━ ━ • ━ ━ ━ ━ ═══♡᭄
│       「 𝗠𝗬 𝗜𝗡𝗧𝗥𝗢 」
│ Name      : ɢɪғᴛᴇᴅ ᴛᴇᴄʜ
│ Place       : Eldoret, Kenya
│ Gender    :  ᴍᴀʟᴇ
│ Age          : 20
│ Phone     : wa.me/254762016957
│ Youtube   : youtube.com/@giftedtechnexus
│ Status     : Web Dev, App Dev, Software Dev.
╰═══ ━ ━ ━ ━ • ━ ━ ━ ━ ═══♡᭄`



 //---------------------------------------------------------------------------
 smd({
             pattern: "intro",
             desc: "Show intro of user",
             category: "fun",
             filename: __filename,
             use: '<group link.>',
         },
         async(message) => {
    try{
          let media ;try{ media = await smdBuffer(image) }catch{media = log0}
           const q =await message.bot.fakeMessage("contact",{},name) 
           let contextInfo = {...(await message.bot.contextInfo(name,body,media,1,surl, 2) )}
           await message.send(text, {contextInfo : contextInfo },"suhail",  q )
    }catch(e){ await message.error(`${e}\n\ncommand: intro`,e,false)}


 })
