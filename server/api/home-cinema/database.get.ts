import { protect } from "~/server/services/miscellaneous/protection";
import { getDatabase } from "~/server/services/home-cinema";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    await getDatabase(req)));
