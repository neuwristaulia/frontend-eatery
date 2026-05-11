const { PrismaClient } = require('@prisma/client');
try {
  const prisma = new PrismaClient({});
  console.log("Empty object:", "Success");
} catch (e) {
  console.error("Empty object:", e.message);
}
