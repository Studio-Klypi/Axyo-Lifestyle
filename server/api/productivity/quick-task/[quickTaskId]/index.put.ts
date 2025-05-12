import { protect } from "~/server/services/miscellaneous/protection";
import { updateQuickTask } from "~/server/services/productivity/quick-tasks";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    await updateQuickTask(req)));
