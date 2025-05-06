import { protect } from "~/server/services/miscellaneous/protection";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    req.context.user));
