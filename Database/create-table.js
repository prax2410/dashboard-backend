const db = require("./db");

const campaignsTable = `CREATE TABLE IF NOT EXISTS "campaigns_table"(
  id SERIAL,
  campaign_name VARCHAR NOT NULL,
  platform VARCHAR NOT NULL,
  product VARCHAR NOT NULL,
  start_date VARCHAR NOT NULL,
  end_date VARCHAR NOT NULL,
  location VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
)`;

const productTable = `CREATE TABLE IF NOT EXISTS "products_table"(
  id SERIAL,
  product_name VARCHAR NOT NULL,
  price INT NOT NULL
)`;

async function createTables() {
  try {
    const tables = await db.many(
      "SELECT table_name FROM information_schema.tables"
    );

    // get all table name
    const data = await Promise.all([
      createCampaignsTable(),
      createProductTable()
    ]);

    async function createCampaignsTable() {
      const checkCampaignsTable = tables.filter(
        (name) => name.table_name === "campaigns_table"
      );

      if (!checkCampaignsTable[0]) {
        await db.none(campaignsTable);
        return "Campaigns table created Successfully";
      } else {
        return "Campaigns table already exist";
      }
    }

    async function createProductTable() {
      const checkProductTable = tables.filter(
        (name) => name.table_name === "products_table"
      );

      if (!checkProductTable[0]) {
        await db.none(productTable);
        return "Products table created Successfully";
      } else {
        return "Products table already exist";
      }
    }
    
    return data;
  } catch (error) {
    return error.message;
  }
};

module.exports = createTables;
