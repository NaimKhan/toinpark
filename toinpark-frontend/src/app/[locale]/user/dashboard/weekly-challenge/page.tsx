import { getSeoMeta } from "@/lib/getSeoMeta";
import WeeklyChallenge from "./components";
export const metadata = getSeoMeta({ title: "Weekly Challenge" });

function WeeklyChallengePage() {
  return <WeeklyChallenge />;
}

export default WeeklyChallengePage;
