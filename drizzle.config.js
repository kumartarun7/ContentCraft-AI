/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:xmv7VSbNj2eK@ep-shy-water-a5n9d2dc.us-east-2.aws.neon.tech/AI-Content-Generator?sslmode=require',
    }
  };
  