import 'dotenv/config';
import mariadb from 'mariadb';

const adminUrl = process.env.MYSQL_ADMIN_URL;
const databaseUrl = process.env.DATABASE_URL;
if (!adminUrl || !databaseUrl) {
  throw new Error('MYSQL_ADMIN_URL y DATABASE_URL son obligatorias para preparar MySQL local.');
}

const admin = new URL(adminUrl);
const app = new URL(databaseUrl);
if (!['mysql:', 'mariadb:'].includes(admin.protocol) || !['mysql:', 'mariadb:'].includes(app.protocol)) {
  throw new Error('Las URLs deben usar el protocolo mysql:// o mariadb://.');
}
if (!/^[A-Za-z0-9_]+$/.test(app.pathname.slice(1))) {
  throw new Error('El nombre de base de datos solo puede incluir letras, números y guiones bajos.');
}

const connection = await mariadb.createConnection({
  host: admin.hostname,
  port: Number(admin.port || 3306),
  user: decodeURIComponent(admin.username),
  password: decodeURIComponent(admin.password),
  database: admin.pathname.slice(1) || 'mysql',
});

try {
  const database = app.pathname.slice(1);
  const user = decodeURIComponent(app.username);
  const password = decodeURIComponent(app.password);
  if (!user || !password) throw new Error('DATABASE_URL debe incluir usuario y contraseña.');
  if (!/^[A-Za-z0-9_-]+$/.test(user)) throw new Error('El usuario de DATABASE_URL contiene caracteres no admitidos por el inicializador local.');
  const quote = (value: string) => `'${value.replaceAll("'", "''")}'`;
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await connection.query(`CREATE USER IF NOT EXISTS ${quote(user)}@'localhost' IDENTIFIED BY ${quote(password)}`);
  await connection.query(`ALTER USER ${quote(user)}@'localhost' IDENTIFIED BY ${quote(password)}`);
  await connection.query(`GRANT ALL PRIVILEGES ON \`${database}\`.* TO ${quote(user)}@'localhost'`);
  await connection.query('FLUSH PRIVILEGES');
  console.log(`Base local ${database} y usuario ${user}@localhost preparados.`);
} finally {
  await connection.end();
}
