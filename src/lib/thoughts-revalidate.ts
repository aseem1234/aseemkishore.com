import { revalidatePath, revalidateTag } from "next/cache";
import { THOUGHTS_TAG } from "@/lib/thoughts-model";

export function revalidateThoughts(slug: string) {
  revalidateTag(THOUGHTS_TAG, { expire: 0 });
  revalidatePath("/thoughts");
  revalidatePath(`/thoughts/${slug}`);
  revalidatePath("/sitemap.xml");
}
