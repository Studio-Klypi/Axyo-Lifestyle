import { useScheduler } from "#scheduler";
import * as sessions from "~/server/database/repositories/authentication/sessions";

export default defineNitroPlugin(() => {
  const scheduler = useScheduler();

  scheduler.run(async () => console.log(`🔥  ${await sessions.prune()} session(s) pruned!`)).dailyAt(0, 0);
});
