import { createThoughtsHandlers } from "@/lib/thoughts-api";
import { thoughtsService } from "@/lib/thoughts";
import { revalidateThoughts } from "@/lib/thoughts-revalidate";

export const runtime = "nodejs";
export const { DELETE } = createThoughtsHandlers(
  thoughtsService,
  revalidateThoughts,
);
