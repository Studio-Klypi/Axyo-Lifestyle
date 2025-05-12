import { protect } from "~/server/services/miscellaneous/protection";
import { getUserQuickTasks } from "~/server/services/productivity/quick-tasks";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    await getUserQuickTasks(req)));
