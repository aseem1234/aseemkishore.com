import Image from "next/image";

type Variant = "hero" | "page" | "compact";

const frame: Record<Variant, string> = {
  hero: "h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80 rounded-2xl",
  page: "h-36 w-36 sm:h-44 sm:w-44 rounded-2xl",
  compact: "h-16 w-16 rounded-full",
};

const sizes: Record<Variant, string> = {
  hero: "(max-width: 640px) 224px, (max-width: 1024px) 288px, 320px",
  page: "(max-width: 640px) 144px, 176px",
  compact: "64px",
};

export default function Portrait({
  variant = "page",
  priority = false,
}: {
  variant?: Variant;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden bg-zinc-800 ring-1 ring-zinc-700/80 ${frame[variant]}`}
    >
      <Image
        src="/images/aseem-kishore.jpg"
        alt="Aseem Kishore"
        fill
        className="object-cover object-[center_20%]"
        priority={priority}
        sizes={sizes[variant]}
      />
    </div>
  );
}
