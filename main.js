const Discord    = require("discord.js")
const config     = require("./config.json")
const verwarnungen = require("./verwarnungen.json")
const fs         = require("fs")

var client = new Discord.Client()

client.on("ready", () => {
    console.log(`Logged in as ${client.user.username}`)
})



client.on("message", (msg) => {
    
    var cont   = msg.content,
        author = msg.member,
        chan   = msg.channel,
        guild  = msg.guild
    

        if (author.id != client.user.id && cont.startsWith(config.prefix)) {

        // ::say hello world!
    var invoke = cont.split(" ")[0].substr(config.prefix.length),
            args   = cont.split(" ").slice(1)
        // Ping Befehl
        if (invoke === "ping") {
        msg.channel.send('pong');
        }

        // Verwarnungsbefehl
        if (invoke === "verwarnungen") {
            try {
                msg.reply("Du sp... netter Mensch hast " + verwarnungen[author.id].anzahl + " Verwarnung(en) du vollid... tolle Person")
            }
            catch (err) {
                msg.reply("Du existierst gar nicht, faggot!")
            }      
        }
        ////////////////////////////////// Verwarnungen adden //////////////////////////////////
        if (invoke === "nverwarnung" && author.id === "270654649747374080") {                    
            var faggot = args[0].substring(2,args[0].length-1)
            if(verwarnungen[faggot] != undefined)
            {
                var anzahl = verwarnungen[faggot].anzahl + 1 
                verwarnungen[faggot].anzahl = anzahl   
            }  
     
            else {
                verwarnungen[faggot] = {"anzahl":1,"tag":msg.mentions.members.first().user.tag}
            
            }      
            fs.writeFile("./verwarnungen.json",JSON.stringify(verwarnungen,null,2),(err) => {
                if (err) throw err;
                console.log('Verwarnung added');
                console.log("<--------------->");
            });
            chan.send(args[0] + " " + verwarnungen[faggot].anzahl + "te Verwarnung")
        }

        ////////////////////////////////// Verwarnungen löschen //////////////////////////////////
        if (invoke === "nverwarnungdel" && author.id === "270654649747374080") {                    
            try{
            var faggot = args[0].substring(2,args[0].length-1)
            if(verwarnungen[faggot] != undefined)
            {
                var anzahl = verwarnungen[faggot].anzahl - 1
                verwarnungen[faggot].anzahl = anzahl   
            }  
     
            else {
                verwarnungen[faggot] = {"anzahl":-1,"tag":msg.mentions.members.first().user.tag}
            }      
            fs.writeFile("./verwarnungen.json",JSON.stringify(verwarnungen,null,2),(err) => {
                if (err) throw err;
                console.log('Verwarnung deleted');
                console.log("<--------------->");

            });
            chan.send(args[0] + " " + verwarnungen[faggot].anzahl + " Verwarnung(en) gelöscht")
            }   
            catch (err) {
                msg.reply("Nö danke.")
            }
        }


        console.log(invoke, args)
      //Check ob er was erkennt  msg.channel.send("Check aka Stefan der omegafaggot <:auge:477966045051617310>")

    }
})


client.login(config.token)