"use client";

import { useEffect, useId, useRef, useState } from "react";

type Tone = "accent" | "accent2" | "comment" | "muted";

export type TerminalLine = { text: string; tone?: string };

export type TerminalCommand = {
  name: string;
  description: string;
  output: TerminalLine[];
};

export type TerminalProps = {
  /** Window title, e.g. `fjr@portfolio ~ zsh`. */
  title: string;
  ariaLabel: string;
  inputLabel: string;
  placeholder: string;
  tryLabel: string;
  /** Command executed on first render. */
  initialCommand: string;
  hint: { before: string; command: string; after: string };
  /** `{command}` is replaced with what the user typed. */
  notFound: string;
  helpTitle: string;
  builtins: { name: string; description: string }[];
  /** The "database" of the terminal: add or edit entries in the dictionaries. */
  commands: TerminalCommand[];
};

type Entry =
  | { kind: "input"; text: string }
  | { kind: "line"; text: string; tone?: string }
  | { kind: "hint" }
  | { kind: "blank" };

const toneClass: Record<Tone, string> = {
  accent: "text-accent",
  accent2: "text-accent-2",
  comment: "text-syntax-comment",
  muted: "text-muted",
};

const lineClass = "terminal-line whitespace-pre-wrap break-words";

export function Terminal(props: TerminalProps) {
  const { commands, builtins } = props;
  const clear = builtins.find((b) => b.name === "clear");
  const inputId = useId();
  const logRef = useRef<HTMLDivElement>(null);
  const history = useRef<string[]>([]);
  const cursor = useRef(0);
  const [value, setValue] = useState("");

  const [entries, setEntries] = useState<Entry[]>(() => {
    const first = props.commands.find((c) => c.name === props.initialCommand);
    return [
      { kind: "input", text: props.initialCommand },
      ...(first?.output ?? []).map<Entry>((l) => ({ kind: "line", ...l })),
      { kind: "hint" },
      { kind: "blank" },
    ];
  });

  // Keep the newest output in view (scrolls the terminal only, never the page).
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [entries]);

  function run(raw: string) {
    const input = raw.trim();
    if (!input) return;

    history.current.push(input);
    cursor.current = history.current.length;

    const name = input.toLowerCase();
    if (name === "clear") {
      setEntries([]);
      return;
    }

    let output: Entry[];
    if (name === "help") {
      const rows = [...builtins, ...commands];
      const pad = Math.max(...rows.map((r) => r.name.length)) + 2;
      output = [
        { kind: "line", text: props.helpTitle, tone: "accent" },
        ...rows.map<Entry>((r) => ({
          kind: "line",
          text: `${r.name.padEnd(pad)}${r.description}`,
        })),
      ];
    } else {
      const found = commands.find((c) => c.name === name);
      output = found
        ? found.output.map<Entry>((l) => ({ kind: "line", ...l }))
        : [
            {
              kind: "line",
              text: props.notFound.replace("{command}", input),
              tone: "muted",
            },
          ];
    }

    setEntries((prev) => [
      ...prev,
      { kind: "input", text: input },
      ...output,
      { kind: "blank" },
    ]);
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    run(value);
    setValue("");
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const past = history.current;
    if (event.key === "ArrowUp" && past.length) {
      event.preventDefault();
      cursor.current = Math.max(0, cursor.current - 1);
      setValue(past[cursor.current] ?? "");
    } else if (event.key === "ArrowDown" && past.length) {
      event.preventDefault();
      cursor.current = Math.min(past.length, cursor.current + 1);
      setValue(past[cursor.current] ?? "");
    }
  }

  return (
    <section
      aria-label={props.ariaLabel}
      className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl shadow-accent/15 ring-1 ring-accent/10"
    >
      <header className="flex items-center gap-2 border-b border-line bg-panel-2 px-3.5 py-3">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-line" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-line" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-line" />
        <span className="ml-2.5 font-mono text-xs text-muted">{props.title}</span>
        {clear && (
          <button
            type="button"
            onClick={() => run(clear.name)}
            title={clear.description}
            aria-label={clear.description}
            className="ml-auto cursor-pointer rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
          >
            {clear.name}
          </button>
        )}
      </header>

      <div
        ref={logRef}
        aria-live="polite"
        className="h-56 overflow-y-auto px-6 pt-5 pb-2 font-mono text-sm leading-relaxed sm:h-72"
      >
        {entries.map((entry, i) => {
          switch (entry.kind) {
            case "input":
              return (
                <div key={i} className={lineClass}>
                  <span className="text-accent">❯ </span>
                  <span className="font-semibold">{entry.text}</span>
                </div>
              );
            case "hint":
              return (
                <div key={i} className={lineClass}>
                  <span className="text-accent-2">{props.hint.before}</span>
                  <span className="text-accent">{props.hint.command}</span>
                  <span className="text-accent-2">{props.hint.after}</span>
                </div>
              );
            case "blank":
              return <div key={i} className={lineClass}>{" "}</div>;
            default:
              return (
                <div key={i} className={lineClass}>
                  <span
                    className={
                      entry.tone ? toneClass[entry.tone as Tone] : undefined
                    }
                  >
                    {entry.text}
                  </span>
                </div>
              );
          }
        })}
      </div>

      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 px-6 pt-2 pb-4 font-mono text-sm focus-within:bg-accent/5"
      >
        <span aria-hidden="true" className="text-accent">
          ❯
        </span>
        <label htmlFor={inputId} className="sr-only">
          {props.inputLabel}
        </label>
        <input
          id={inputId}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder={props.placeholder}
          className="min-w-0 flex-1 bg-transparent text-fg caret-accent outline-none placeholder:text-muted"
        />
      </form>

      <div className="flex flex-wrap items-center gap-2 border-t border-line px-6 pt-3.5 pb-4.5">
        <span className="mr-1 font-mono text-xs text-muted">{props.tryLabel}</span>
        {commands.map((command) => (
          <button
            key={command.name}
            type="button"
            onClick={() => run(command.name)}
            className="cursor-pointer rounded-lg border border-line bg-ink px-2.5 py-1 font-mono text-xs transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
          >
            {command.name}
          </button>
        ))}
      </div>
    </section>
  );
}
