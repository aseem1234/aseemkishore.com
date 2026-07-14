import type { Metadata } from "next";
import TweetScoreTool from "./TweetScoreTool";

export const metadata: Metadata = {
  title: "Tweet Flops-o-Meter",
  description:
    "Paste a draft tweet and get a score, roast, fixes, and a shareable card.",
  openGraph: {
    title: "Tweet Flops-o-Meter",
    description:
      "Paste a draft tweet and get scored — then share your card on X.",
    url: "https://aseemkishore.com/tools/tweet-score",
  },
};

export default function TweetScorePage() {
  return <TweetScoreTool />;
}
