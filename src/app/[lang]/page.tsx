import { ThemeToggle } from "@/components/theme-toggle";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function Home() {
  const dict = await getDictionary();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-lg text-foreground/70">{dict.hero.greeting}</p>
      <h1 className="text-5xl font-semibold tracking-tight">frajarele</h1>
      <p className="text-xl text-foreground/70">{dict.hero.role}</p>
      <ThemeToggle
        toLightLabel={dict.theme.toLight}
        toDarkLabel={dict.theme.toDark}
      />
    </main>
  );
}
