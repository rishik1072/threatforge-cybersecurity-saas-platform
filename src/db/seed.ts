import "dotenv/config";
import { db, pool } from "@/db";
import { activityLogs, assets, incidents, threats, vulnerabilities } from "@/db/schema";
import { mockActivity, mockAssets, mockIncidents, mockThreats, mockVulnerabilities } from "@/db/mock-data";

async function seed() {
  console.log("Seeding ThreatForge database...");

  await db.delete(activityLogs);
  await db.delete(vulnerabilities);
  await db.delete(incidents);
  await db.delete(assets);
  await db.delete(threats);

  await db.insert(threats).values(mockThreats);
  console.log(`  inserted ${mockThreats.length} threats`);

  await db.insert(incidents).values(mockIncidents);
  console.log(`  inserted ${mockIncidents.length} incidents`);

  await db.insert(assets).values(mockAssets);
  console.log(`  inserted ${mockAssets.length} assets`);

  await db.insert(vulnerabilities).values(mockVulnerabilities);
  console.log(`  inserted ${mockVulnerabilities.length} vulnerabilities`);

  await db.insert(activityLogs).values(mockActivity);
  console.log(`  inserted ${mockActivity.length} activity log entries`);

  console.log("Seed complete.");
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
