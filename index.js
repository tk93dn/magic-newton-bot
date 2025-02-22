const puppeteer = require("puppeteer");
const fs = require("fs");
const readline = require("readline");
require('colors');
const { displayHeader } = require('./helpers');

const MAGICNEWTON_URL = "https://www.magicnewton.com/portal/rewards";
const DEFAULT_SLEEP_TIME = 24 * 60 * 60 * 1000; // 24 hours
const RANDOM_EXTRA_DELAY = () => Math.floor(Math.random() * (10 - 5 + 1) + 5) * 60 * 1000; // Random delay between 5-10 minutes

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getCurrentTime() {
  return new Date().toLocaleString("id-ID", { hour12: false });
}

async function runAccount(cookie) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setCookie(cookie);
    await page.goto(MAGICNEWTON_URL, { waitUntil: "networkidle2", timeout: 60000 });

    const userAddress = await page.$eval("p.gGRRlH.WrOCw.AEdnq.hGQgmY.jdmPpC", el => el.innerText).catch(() => "Unknown");
    console.log(`${getCurrentTime()} - 🏠 Your account: ${userAddress}`);

    let userCredits = await page.$eval("#creditBalance", el => el.innerText).catch(() => "Unknown");
    console.log(`${getCurrentTime()} - 💰 Total your points: ${userCredits}`);

    await page.waitForSelector("button", { timeout: 30000 });
    const rollNowClicked = await page.$$eval("button", buttons => {
      const target = buttons.find(btn => btn.innerText && btn.innerText.includes("Roll now"));
      if (target) {
        target.click();
        return true;
      }
      return false;
    });

    if (rollNowClicked) {
      console.log(`${getCurrentTime()} - ✅ Starting daily roll...`);
    }
    await delay(5000);

    const letsRollClicked = await page.$$eval("button", buttons => {
      const target = buttons.find(btn => btn.innerText && btn.innerText.includes("Let's roll"));
      if (target) {
        target.click();
        return true;
      }
      return false;
    });

    if (letsRollClicked) {
      await delay(5000);
      const throwDiceClicked = await page.$$eval("button", buttons => {
        const target = buttons.find(btn => btn.innerText && btn.innerText.includes("Throw Dice"));
        if (target) {
          target.click();
          return true;
        }
        return false;
      });

      if (throwDiceClicked) {
        console.log(`${getCurrentTime()} - ⏳ Waiting for 60 seconds for dice animation...`);
        await delay(60000);

        // Klik tombol "Press" sebanyak 5x dengan delay 5 detik setiap klik
        for (let i = 1; i <= 5; i++) {
    await delay(1000); // Tunggu 1 detik sebelum mencari tombol lagi

    // Cek apakah tombol Press ada sebelum mencoba klik
    const pressExists = await page.$("body > div.dMMuNs.kcKISj > div.fPSBzf.bYPztT.dKLBtz.iRgpoQ.container-page-loaded > div.fPSBzf.container-content > div > div:nth-child(1) > div.fPSBzf.bYPztT.pnxsH.cMGtQw > button.hoEiop.dgDkEX.iFUqYl.bZRhvx.eAZrqn.diIxfU.jTWvec.ThTOq.efvJEH.cGFOJB.fzpbIC.fzpolx.coifUy.eAZrpM.kyvghW.fznPAm.fzoAXm.eePqkU > div > p");
    
    if (!pressExists) {
        console.log(`${getCurrentTime()} - ⚠️ 'Press' button not found.`);
        break;
    }

    // Klik tombol Press
    await page.click("body > div.dMMuNs.kcKISj > div.fPSBzf.bYPztT.dKLBtz.iRgpoQ.container-page-loaded > div.fPSBzf.container-content > div > div:nth-child(1) > div.fPSBzf.bYPztT.pnxsH.cMGtQw > button.hoEiop.dgDkEX.iFUqYl.bZRhvx.eAZrqn.diIxfU.jTWvec.ThTOq.efvJEH.cGFOJB.fzpbIC.fzpolx.coifUy.eAZrpM.kyvghW.fznPAm.fzoAXm.eePqkU > div > p");
    console.log(`${getCurrentTime()} - 🖱️ Press button clicked (${i}/5)`);

    await delay(5000); // Delay 5 detik sebelum klik berikutnya
}

        // Klik tombol "Bank"
        await delay(3000); // Tunggu 3 detik sebelum mencari tombol Bank

const bankButton = await page.$("body > div.dMMuNs.kcKISj > div.fPSBzf.bYPztT.dKLBtz.iRgpoQ.container-page-loaded > div.fPSBzf.container-content > div > div:nth-child(1) > div.fPSBzf.bYPztT.pnxsH.cMGtQw > button:nth-child(3) > div > p");

if (bankButton) {
    await bankButton.click();
    console.log(`${getCurrentTime()} - 🏦 Bank button clicked.`);
} else {
    console.log(`${getCurrentTime()} - ⚠️ 'Bank' button not found.`);
}

        if (bankClicked) {
          console.log(`${getCurrentTime()} - 🏦 Bank clicked.`);
          await delay(3000); // Delay untuk memastikan nilai dice muncul setelah klik Bank

          // Ambil hasil Dice Roll setelah Bank ditekan
          const diceRollResult = await page.$eval("h2.gRUWXt.dnQMzm.ljNVlj.kzjCbV.dqpYKm.RVUSp.fzpbtJ.bYPzoC",
            el => el.innerText).catch(() => "Unknown");

          console.log(`${getCurrentTime()} - 🎲 Dice Roll Result: ${diceRollResult} points`);

          // Ambil saldo terbaru setelah hasil dice roll ditambahkan
          userCredits = await page.$eval("#creditBalance", el => el.innerText).catch(() => "Unknown");
          console.log(`${getCurrentTime()} - 💳 Final Balance after dice roll: ${userCredits}`);
        } else {
          console.log(`${getCurrentTime()} - ⚠️ 'Bank' button not found.`);
        }
      } else {
        console.log(`${getCurrentTime()} - ⚠️ 'Throw Dice' button not found.`);
      }
    } else {
      console.log(`${getCurrentTime()} - ⚠️ Cannot roll at the moment. Please try again later!!!`);
    }
    await browser.close();
  } catch (error) {
    console.error(`${getCurrentTime()} - ❌ An error occurred:`, error);
  }
}

(async () => {
  console.clear();
  displayHeader();
  console.log(`${getCurrentTime()} - 🚀 Starting MagicNewton Bot...`);
  const data = fs.readFileSync("data.txt", "utf8").split("\n").filter(Boolean);

  while (true) {
    try {
      console.log(`${getCurrentTime()} - 🔄 Starting your account...`);
      for (let i = 0; i < data.length; i++) {
        const cookie = {
          name: "__Secure-next-auth.session-token",
          value: data[i],
          domain: ".magicnewton.com",
          path: "/",
          secure: true,
          httpOnly: true,
        };
        await runAccount(cookie);
      }
    } catch (error) {
      console.error(`${getCurrentTime()} - ❌ An error occurred:`, error);
    }
    const extraDelay = RANDOM_EXTRA_DELAY();
    console.log(`${getCurrentTime()} - 🔄 Daily roll completed. Bot will run again in 24 hours + random delay of ${extraDelay / 60000} minutes...`);
    await delay(DEFAULT_SLEEP_TIME + extraDelay);
  }
})();
