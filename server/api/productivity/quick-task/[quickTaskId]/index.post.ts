import { protect } from "~/server/services/miscellaneous/protection";
import { rollbackQuickTask } from "~/server/services/productivity/quick-tasks";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    await rollbackQuickTask(req)));
