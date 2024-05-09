const DB = require("../lib/scraper");
const { Config, smd } = require("../lib");
const simpleGit = require("simple-git");
const git = simpleGit();
try {
  const Heroku = require("heroku-client");
  async function updateHerokuApp() {
    try {
      const heroku = new Heroku({ token: process.env.HEROKU_API_KEY });
      await git.fetch();
      const commits = await git.log(["main..origin/main"]);
      if (commits.total === 0) {
        return `GIFTED-MD IS ON IT'S LATEST VERSION`;
      } else {
        console.log("Update Detected, trying to update your bot!");
        const app = await heroku.get(`/apps/${process.env.HEROKU_APP_NAME}`);
        const gitUrl = app.git_url.replace(
          "https://",
          `https://api:${process.env.HEROKU_API_KEY}@`
        );
        try {
          await git.addRemote("heroku", gitUrl);
        } catch (e) {
          print("Heroku remote adding error", e);
        }
        await git.push("heroku", "main");
        return "Bot updated. Restarting.";
      }
    } catch (e) {
      print(e);
      return "Can't Update, Request Denied!";
    }
  }
  smd(
    {
      pattern: "update",
      desc: "Shows repo's refreshed commits.",
      category: "tools",
      fromMe: true,
      react: "🍂",
      filename: __filename,
      use: process.env.HEROKU_API_KEY ? "[ start ]" : "",
    },
    async (citel, text) => {
      try {
        let commits = await DB.syncgit();
        if (commits.total === 0)
          return await citel.reply(
            `*GIFTED-MD IS RUNNING ON ITS LATEST:*\n1. UPDATES\n2. FIXES\n3. UPGRADES\n4. BUGS\n \nEnjoy!!!\nRegards,\n*Gifted Tech*`
          );
        let update = await DB.sync();
        await citel.bot.sendMessage(
          citel.chat,
          { text: update.replace(/SuhailTechIMd/, "mouricedevs") },
          { quoted: citel }
        );
        if (
          text == "start" &&
          process.env.HEROKU_APP_NAME &&
          process.env.HEROKU_API_KEY
        ) {
          citel.reply("Build started...");
          const update = await updateHerokuApp();
          return await citel.reply(update);
        }
      } catch (e) {
        citel.error(`${e}\n\nCommand: update`, e, "ERROR!");
      }
    }
  );
  smd(
    {
      pattern: "updatenow",
      desc: process.env.HEROKU_API_KEY
        ? "*UPDATE SUCCESS*"
        : "UPDATED YOUR DEPLOYEMENT",
      fromMe: true,
      category: "tools",
      filename: __filename,
    },
    async (citel) => {
      try {
        let commits = await DB.syncgit();
        if (commits.total === 0)
          return await citel.reply(`*Gifted-Md ${Config.VERSION} Is Updated*`);
        let update = await DB.sync();
        let text = ` 
*GIFTED-MD UPDATE RUNNING*
\t${update}*`;
        await citel.bot.sendMessage(citel.jid, { text });
        await require("simple-git")().reset("hard", ["HEAD"]);
        await require("simple-git")().pull();
        await citel.reply(
          process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY
            ? "*`GIFTED-MD UPDATE SUCCESSFUL`*\n \n*RESTART YOUR BOT FOR UPDATE TO TAKE EFFECT*\n \nUse: *.restart*\n \nRegards,\n*Gifted Tech"
            : "```*Successfully updated. Now You Have Latest Version Installed!*"
        );
      } catch (e) {
        citel.error(`${e}\n\nCommand: updatenow`, e, "ERROR!");
      }
    }
  );
  if (process.env.HEROKU_API_KEY) {
    print("HEROKU : checking for auto update!");
    updateHerokuApp();
  }
} catch (e) {}
