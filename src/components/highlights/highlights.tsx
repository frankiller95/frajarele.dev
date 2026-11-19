import { getDictionary } from "@/i18n/get-dictionary";

export async function Highlights() {
  const { highlights } = await getDictionary();

  return (
    <section
      aria-label={highlights.ariaLabel}
      className="border-b border-line"
    >
      <dl className="mx-auto grid max-w-page grid-cols-2 px-4 lg:grid-cols-4">
        {highlights.items.map((item) => (
          <div
            key={item.label}
            // Vertical dividers; the first cell of each row sits flush with the container.
            className="flex flex-col-reverse justify-end border-l border-line py-7 pl-4 first:border-l-0 first:pl-0 max-lg:odd:border-l-0 max-lg:odd:pl-0"
          >
            {/* DOM order is term -> value (valid <dl>); flex-col-reverse shows the value on top. */}
            <dt className="mt-1 text-sm text-muted">{item.label}</dt>
            <dd className="font-display text-3xl font-bold tracking-tight">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
