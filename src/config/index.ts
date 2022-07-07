import 'dotenv/config';

export default {
  port: process.env.PORT || 5000,
  appName: process.env.APP_NAME || 'P2P-Wallet',
  appEnv: process.env.APP_ENV || 'development',
  appKey: process.env.APP_KEY || 'wsdqaerfjeu',
  appUrl: process.env.APP_URL,
  dbClient: process.env.DB_CLIENT || 'postgres',
  dbHost: process.env.DB_HOST,
  dbPort: Number(process.env.DB_PORT),
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbDatabase: process.env.DB_DATABASE,
  dbDatabaseTest: process.env.DB_DATABASE_TEST,
  dbUrl: process.env.DATABASE_URL,
  paystackSecretKey: process.env.PAYSTACK_SECRET_KEY,
  paystackBaseUrl: process.env.PAYSTACK_BASE_URL || 'api.paystack.co',
};
