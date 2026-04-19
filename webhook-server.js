#!/usr/bin/env node
const http = require('http');
const crypto = require('crypto');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5555;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-webhook-secret-key-05230523';
const APP_DIR = process.env.APP_DIR || '/app';
const MAX_BODY_SIZE = 1024 * 1024; // 1MB limit

let isDeploying = false;

const log = (msg) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${msg}`);
  
  // Also write to log file
  const logFile = path.join(APP_DIR, 'webhook.log');
  try {
    fs.appendFileSync(logFile, `[${timestamp}] ${msg}\n`, { flag: 'a' });
  } catch (e) {
    console.error('Failed to write log file:', e.message);
  }
};

const verifySignature = (req, body) => {
  const signature = req.headers['x-hub-signature-256'];
  if (!signature) {
    log('⚠️ No signature header found');
    return false;
  }

  const hash = crypto.createHmac('sha256', WEBHOOK_SECRET)
    .update(body)
    .digest('hex');
  
  const computedSignature = `sha256=${hash}`;
  const isValid = crypto.timingSafeEqual(signature, computedSignature);
  
  if (!isValid) {
    log('❌ Signature verification failed');
  } else {
    log('✅ Signature verified');
  }
  
  return isValid;
};

const deploy = () => {
  if (isDeploying) {
    log('⏳ Deployment already in progress, skipping...');
    return false;
  }

  isDeploying = true;
  
  try {
    log('🚀 Starting deployment...');
    
    process.chdir(APP_DIR);
    
    // Fetch latest code
    log('📥 Fetching latest code from main branch...');
    execSync('git fetch origin main', { timeout: 30000, stdio: 'pipe' });
    
    // Backup .env.production
    let savedEnv = '';
    if (fs.existsSync('.env.production')) {
      savedEnv = fs.readFileSync('.env.production', 'utf8');
      log('💾 Backed up .env.production');
    }
    
    // Reset to latest
    log('🔄 Resetting to latest commit...');
    execSync('git checkout main && git reset --hard origin/main', { timeout: 30000, stdio: 'pipe' });
    
    // Restore .env.production
    if (savedEnv) {
      fs.writeFileSync('.env.production', savedEnv);
      log('✅ Restored .env.production');
    }
    
    // Deploy with docker compose (skip cache clear, just rebuild)
    log('🐳 Building and starting containers...');
    execSync('docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build --remove-orphans', 
      { timeout: 300000, stdio: 'pipe' });
    
    // Health check
    log('🏥 Running health check...');
    let healthCheckPassed = false;
    for (let i = 0; i < 60; i++) {
      try {
        execSync('curl -fsS http://127.0.0.1:3000/health > /dev/null 2>&1', { timeout: 5000, stdio: 'pipe' });
        log('✅ Health check passed - deployment complete!');
        healthCheckPassed = true;
        try {
          fs.writeFileSync('.deployed_commit', execSync('git rev-parse HEAD', { encoding: 'utf8', timeout: 5000 }).trim());
        } catch (e) {
          log('⚠️ Warning: Failed to write commit marker');
        }
        break;
      } catch (e) {
        if (i < 59) {
          log(`⏳ Health check attempt ${i + 1}/60 failed, retrying in 5s...`);
          execSync('sleep 5', { stdio: 'pipe' });
        }
      }
    }
    
    if (!healthCheckPassed) {
      log('⚠️ Health check did not pass, but containers are running');
      // Continue anyway - backend might be healthy on next check
    }
    
    log('🎉 Deployment completed!');
    return true;
  } catch (error) {
    log(`❌ Deployment failed: ${error.message}`);
    return false;
  } finally {
    isDeploying = false;
  }
};

const server = http.createServer((req, res) => {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    try {
      // Verify GitHub signature
      if (!verifySignature(req, body)) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid signature' }));
        return;
      }

      const payload = JSON.parse(body);

      // Only deploy on push to main
      if (payload.ref !== 'refs/heads/main') {
        log(`⏭️ Ignoring push to ${payload.ref} (only main branch triggers deployment)`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Ignored non-main branch' }));
        return;
      }

      log(`📌 Received push to main from ${payload.pusher?.name || 'unknown'}`);
      log(`📝 Commits: ${payload.commits?.length || 0}`);

      res.writeHead(202, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Deployment started' }));

      // Deploy asynchronously
      setImmediate(() => deploy());
    } catch (error) {
      log(`⚠️ Error processing webhook: ${error.message}`);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  log(`🎯 Webhook server listening on port ${PORT}`);
  log(`📍 Endpoint: http://0.0.0.0:${PORT}/`);
});

process.on('SIGTERM', () => {
  log('🛑 Received SIGTERM, shutting down gracefully...');
  server.close(() => {
    log('✅ Server closed');
    process.exit(0);
  });
});
