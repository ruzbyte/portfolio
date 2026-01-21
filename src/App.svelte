<script>
  import { t, locale } from "svelte-i18n";
  import HeroSection from "./lib/components/hero-section.svelte";
  import SkillsSection from "./lib/components/skills-section.svelte";
  import ProjectsSection from "./lib/components/projects-section.svelte";
  import ContactSection from "./lib/components/contact-section.svelte";
</script>

<svelte:head>
  <title>ruzbyte</title>
  <link rel="icon" href="logo.svg" sizes="any" type="image/svg+xml" />
  <meta
    name="description"
    content="Fullstack developer, Computer Engineering student, building apps for fun in my free time"
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main class="relative min-h-screen overflow-x-hidden">
  <!-- Navigation bar -->
  <nav class="fixed top-0 left-0 right-0 z-50 px-6 py-4">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-tokyo-purple font-bold">~</span>
        <span class="text-tokyo-fg">/ruzbyte</span>
      </div>

      <div class="flex items-center gap-1 text-sm">
        <a
          href="#skills"
          class="px-3 py-1 text-tokyo-comment hover:text-tokyo-purple transition-colors"
          >skills</a
        >
        <span class="text-tokyo-comment/30">|</span>
        <a
          href="#projects"
          class="px-3 py-1 text-tokyo-comment hover:text-tokyo-cyan transition-colors"
          >projects</a
        >
        <span class="text-tokyo-comment/30">|</span>
        <a
          href="#contact"
          class="px-3 py-1 text-tokyo-comment hover:text-tokyo-green transition-colors"
          >contact</a
        >
        <span class="text-tokyo-comment/30">|</span>
        <div class="flex items-center gap-1">
          <svg
            class="w-4 h-4 text-tokyo-comment"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
          <select
            bind:value={$locale}
            placeholder={$locale}
            class="bg-transparent text-tokyo-comment hover:text-tokyo-orange text-sm px-1 py-1 border-none outline-none cursor-pointer appearance-none transition-colors"
          >
            <option value="en" class="bg-tokyo-bg text-tokyo-fg">en</option>
            <option value="de" class="bg-tokyo-bg text-tokyo-fg">de</option>
          </select>
        </div>
      </div>
    </div>
  </nav>

  <!-- Sections -->
  <HeroSection />
  <SkillsSection />
  <ProjectsSection />
  <ContactSection />

  <!-- Footer -->
  <footer class="py-8 px-6 border-t border-tokyo-purple/20">
    <div
      class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-tokyo-comment"
    >
      <div class="flex items-center gap-2">
        <span class="text-tokyo-green">$</span>
        <span>echo "Built with Svelte + Tailwind"</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-tokyo-purple">/* </span>
        <span>2024 - present</span>
        <span class="text-tokyo-purple"> */</span>
      </div>
    </div>
  </footer>

  <!-- Ambient glow effects -->
  <div
    class="fixed top-0 left-0 w-96 h-96 bg-tokyo-purple/5 rounded-full blur-3xl pointer-events-none"
  ></div>
  <div
    class="fixed bottom-0 right-0 w-96 h-96 bg-tokyo-cyan/5 rounded-full blur-3xl pointer-events-none"
  ></div>
</main>

<style>
  main {
    background: linear-gradient(
      135deg,
      var(--tokyo-bg-dark) 0%,
      var(--tokyo-bg) 50%,
      hsl(255 30% 12%) 100%
    );
    color: var(--tokyo-fg);
    font-family: "JetBrains Mono", monospace;
    min-height: 100vh;
  }
</style>
