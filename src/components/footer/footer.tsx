import { site } from "@/config/site";
import { getDictionary } from "@/i18n/get-dictionary";

export async function Footer() {
  const { footer } = await getDictionary();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-6 font-mono text-xs text-muted">
        <p>
          © {site.year} {site.name}
        </p>
        <p>{footer.built}</p>
      </div>
    </footer>
  );
}
