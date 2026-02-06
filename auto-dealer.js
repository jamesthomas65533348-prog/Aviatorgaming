/**
 * AVIATOR LIVE ENGINE (auto-dealer.js)
 * Includes Keep-Alive server for 24/7 uptime via Instatus/UptimeRobot
 */

const http = require('http');

// --- 1. KEEP-ALIVE WEB SERVER ---
// This answers the "pinger" so Render stays awake.
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write("Aviator Engine is LIVE and Flying!");
  res.end();
}).listen(process.env.PORT || 3000);

console.log("Keep-alive server active on port " + (process.env.PORT || 3000));

// --- 2. FIREBASE INITIALIZATION ---
const admin = require("firebase-admin");

// CRITICAL: Ensure serviceAccountKey.json is in the same folder!
try {
    const serviceAccount = require("./serviceAccountKey.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://aviatorlife-54828-default-rtdb.firebaseio.com/"
    });
} catch (e) {
    console.error("CRITICAL ERROR: Could not load serviceAccountKey.json. Ensure the file is uploaded to GitHub!");
    process.exit(1);
}

const db = admin.database().ref("live_game");

// --- 3. THE AUTOMATED GAME LOOP ---
async function runGame() {
  console.log("Aviator Engine Started... Broadcasting to Firebase.");

  while (true) {
    // --- PHASE 1: WAITING (5 Second Countdown) ---
    let timer = 5;
    while (timer > 0) {
      await db.set({ 
          status: "WAITING", 
          countdown: timer, 
          multiplier: "1.00" 
      });
      await new Promise(r => setTimeout(r, 1000));
      timer--;
    }

    // --- PHASE 2: FLYING (Live Multiplier) ---
    let currentMult = 1.00;
    
    // Generate a random crash point
    const crashAt = (1.00 + (Math.random() * Math.random() * 15)).toFixed(2);
    console.log(`Round Started! Will crash at: ${crashAt}x`);

    await db.update({ status: "FLYING", countdown: 0 });

    while (currentMult < parseFloat(crashAt)) {
      await db.update({ 
          multiplier: currentMult.toFixed(2) 
      });
      
      // Smooth increment logic
      let step = 0.01;
      if (currentMult > 2.0) step = 0.02;
      if (currentMult > 5.0) step = 0.05;
      
      currentMult += step;
      
      // 150ms delay for smooth updates and database efficiency
      await new Promise(r => setTimeout(r, 150)); 
    }

    // --- PHASE 3: CRASHED (4 Second Pause) ---
    console.log(`CRASHED at ${currentMult.toFixed(2)}x`);
    await db.update({ 
        status: "CRASHED", 
        multiplier: currentMult.toFixed(2) 
    });
    
    await new Promise(r => setTimeout(r, 4000)); 
  }
}

// Start the engine
runGame().catch(err => {
    console.error("Engine Error:", err);
    process.exit(1);
});
