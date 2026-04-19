const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const db = new sqlite3.Database('./apps/backend/data/database.sqlite');
const newPassword = process.argv[2] || 'admin123';

console.log('Setting new password to:', newPassword);

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(newPassword, salt);

db.run("UPDATE users SET password = ? WHERE role = 'admin' AND username = 'admin'", [hash], function(err) {
  if (err) {
    return console.error('Error updating password:', err.message);
  }
  console.log(Password updated successfully for admin user. Changed rows: );
  db.close();
});
