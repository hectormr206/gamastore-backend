require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3003,
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD || '',
  dbHost: process.env.DB_HOST || 'localhost',
  dbName: process.env.DB_NAME || 'test',
  dbPort: process.env.DB_PORT || 3306,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,

  dbUserRemote: process.env.DB_USER_REMOTE,
  dbPasswordRemote: process.env.DB_PASSWORD_REMOTE,
  dbNameProveedoraRemRemote: process.env.DB_NAME_PROVEEDORA_REM_REMOTE,
  dbNamePinturasRemRemote: process.env.DB_NAME_PINTURAS_REM_REMOTE,
  dbHostRemote: process.env.DB_HOST_REMOTE,
  dbPortRemote: process.env.DB_PORT_REMOTE,
};

module.exports = { config };
