/**
 * Curated homepage highlights, sourced from real GitHub repos.
 * Kept separate from `allProjects` so the /project pages (which index local
 * screenshot galleries) stay untouched — these link out to GitHub / live sites.
 */

export type Accent = 'fuchsia' | 'gold' | 'cyan' | 'lime';

export type FlagshipPipelineStage = {
  label: string;
  detail: string;
};

export const getFlagship = () => ({
  title: 'AI Trader',
  repo: 'trade-with-me',
  tagline:
    'An agentic system for crypto perpetual futures. Eight narrow analyzers, a learning layer, and Claude in the loop — it screens the Binance Futures universe and generates signals. By design it never pulls the trigger: every trade is paper-traded until the system proves an edge.',
  pipeline: [
    { label: 'Ingest', detail: 'Streams the Binance Futures universe into TimescaleDB.' },
    { label: 'Process', detail: 'Cleans, resamples, and engineers features per symbol.' },
    { label: 'Orchestrate', detail: 'Routes each candidate through the analyzer fleet.' },
    { label: '8 Analyzers', detail: 'Narrow specialists score the setup from every angle.' },
    { label: 'Decision Gate', detail: 'Go/no-go: only proven edges advance to a signal.' },
    { label: 'Signal', detail: 'Emits a paper-traded signal — never a live order.' },
    { label: 'Reflect', detail: 'Learning layer scores outcomes and tunes the next pass.' },
  ] as FlagshipPipelineStage[],
  stack: [
    'Python 3.12',
    'PostgreSQL + TimescaleDB',
    'Claude (Haiku/Sonnet/Opus)',
    'Typer',
    'Docker',
    'FastAPI',
    'Redis',
    'MCP',
  ],
  stats: [
    { v: '8', l: 'narrow analyzers' },
    { v: '100%', l: 'paper-traded' },
    { v: '3', l: 'Claude tiers' },
  ],
  github: 'https://github.com/ChrisJulLimantoro/trade-with-me',
});

export const getNovelgit = () => ({
  title: 'NovelGit',
  tagline:
    'A self-hosted writing studio where manuscripts live as Markdown in GitHub — and an AI layer reads them back to you.',
  intro:
    'I’m Julius — I build AI agents and automation that quietly do the heavy lifting. NovelGit is the clearest example: it turns a folder of chapters into a context-aware co-writer, with retrieval, distillation, and embeddings wired into a real product.',
  pullQuote:
    'Give the model the right context automatically, and the writer never has to.',
  capabilities: [
    'Dual-RAG chat over lore, manuscript excerpts, and an auto-generated “Global Bible”.',
    'Automated chapter distillation keeps the story summary current as you write.',
    'Pluggable embedding providers (Voyage, OpenRouter) with graceful degradation.',
    'HyDE-style query expansion for sharper manuscript search.',
  ],
  stack: [
    'Next.js 16',
    'React 19',
    'TipTap',
    'Groq',
    'Gemini',
    'Voyage',
    'Octokit',
  ],
  live: 'https://novelgit.vercel.app',
  github: 'https://github.com/ChrisJulLimantoro/novelgit',
});

/**
 * Contents — the "in this issue" index. The three features live on this page
 * (anchor links jump to their deep-dive sections); my-skills is the capstone
 * toolbox repo and links out. Order = reading order, so numbering is honest.
 */
export type ContentsEntry = {
  no: string;
  title: string;
  dek: string;
  meta: string;
  accent: Accent;
  href: string;
  external?: boolean;
};

export const getContents = (): ContentsEntry[] => [
  {
    no: '01',
    title: 'AI Trader',
    dek: 'An agent that screens the crypto-futures universe, scores every setup eight ways, and knows when not to trade.',
    meta: 'Agentic trading',
    accent: 'fuchsia',
    href: '#ai-trader',
  },
  {
    no: '02',
    title: 'NovelGit',
    dek: 'A writing studio that reads your manuscript back to you — dual-RAG, auto-distilled, published and live.',
    meta: 'AI writing studio',
    accent: 'gold',
    href: '#novelgit',
  },
  {
    no: '03',
    title: 'Chinese Learner',
    dek: 'The spaced-repetition app I built to learn Mandarin — an LLM writes every card and grades my answers by meaning.',
    meta: 'SRS, self-built',
    accent: 'cyan',
    href: '#chinese-learner',
  },
];

/** The capstone: the repository behind all the skills and tools. */
export const getToolbox = () => ({
  title: 'my-skills',
  dek: 'Every skill and tool I reuse, in one repository — edited once, symlink-synced across Claude Code, Codex, Cursor, OpenCode and Hermes.',
  meta: 'The toolbox',
  count: '14 skills',
  accent: 'lime' as Accent,
  href: 'https://github.com/ChrisJulLimantoro/my-skills',
});
