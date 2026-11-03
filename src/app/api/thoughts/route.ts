import { createThoughtsHandlers } from "@/lib/thoughts-api";
import { thoughtsService } from "@/lib/thoughts";
import { revalidateThoughts } from "@/lib/thoughts-revalidate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const { GET, POST } = createThoughtsHandlers(
  thoughtsService,
  revalidateThoughts,
);
