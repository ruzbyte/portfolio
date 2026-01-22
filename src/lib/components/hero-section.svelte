<script>
  import { untrack } from "svelte";

  let terminalLines = $state([]);
  let showCursor = $state(true);
  let currentLineIndex = $state(0);
  let showIntro = $state(false);

  const commands = [
    { prompt: "~", command: "echo $(whoami)", delay: 100 },
    {
      prompt: "~",
      output: "Arthur 'ruzbyte' Aktamirov",
      isOutput: true,
      delay: 20,
    },
    { prompt: "~", command: "groups $(whoami)", delay: 50 },
    {
      prompt: "~",
      output: "fullstack_developer gamer student",
      isOutput: true,
      delay: 20,
    },
    { prompt: "~", command: "./location.sh", delay: 50 },
    {
      prompt: "~",
      output: "📍 Meßstetten, Baden-Württemberg, Germany",
      isOutput: true,
      delay: 20,
    },
  ];

  $effect(() => {
    untrack(() => {
      const typeCommand = async () => {
        for (let i = 0; i < commands.length; i++) {
          const cmd = commands[i];
          if (cmd.isOutput) {
            await new Promise((r) => setTimeout(r, 300));
            terminalLines = [...terminalLines, { ...cmd, typed: cmd.output }];
          } else {
            terminalLines = [...terminalLines, { ...cmd, typed: "" }];
            const lineIndex = terminalLines.length - 1;

            for (let j = 0; j < cmd.command.length; j++) {
              await new Promise((r) => setTimeout(r, cmd.delay));
              terminalLines = terminalLines.map((line, idx) =>
                idx === lineIndex
                  ? { ...line, typed: cmd.command.substring(0, j + 1) }
                  : line,
              );
            }
            await new Promise((r) => setTimeout(r, 500));
          }
          currentLineIndex = i + 1;
        }
        await new Promise((r) => setTimeout(r, 800));
        showIntro = true;
      };

      typeCommand();
    });
  });
</script>

<section
  class="relative min-h-screen flex items-center justify-center overflow-hidden"
>
  <!-- Glitchy background overlay -->
  <div class="absolute inset-0 opacity-20">
    <div
      class="absolute inset-0 bg-gradient-to-br from-tokyo-purple/20 via-transparent to-tokyo-cyan/20"
    ></div>
    <div class="absolute inset-0 scanline"></div>
    <!-- Grid pattern -->
    <div
      class="absolute inset-0"
      style="background-image: linear-gradient(var(--tokyo-purple) 1px, transparent 1px), linear-gradient(90deg, var(--tokyo-purple) 1px, transparent 1px); background-size: 50px 50px; opacity: 0.1;"
    ></div>
  </div>

  <!-- Floating glitch elements -->
  <div
    class="absolute top-20 left-10 w-32 h-32 border border-tokyo-purple/30 opacity-30"
    style="--rotate: 12deg; animation: float 6s ease-in-out infinite;"
  ></div>
  <div
    class="absolute bottom-32 right-20 w-24 h-24 border border-tokyo-cyan/30 opacity-20"
    style="--rotate: -6deg; animation: float-reverse 5s ease-in-out infinite 0.5s;"
  ></div>
  <div
    class="absolute top-1/3 right-1/4 w-16 h-16 bg-tokyo-purple/10 rotate-45"
    style="animation: float 7s ease-in-out infinite 1s;"
  ></div>

  <div class="relative z-10 w-full max-w-4xl mx-auto px-6">
    <!-- Terminal Window - Tiling WM style with animated gradient border -->
    <div
      class="gradient-border"
      style="animation: fade-in-scale 0.8s ease-out, gradient-rotate 4s linear infinite;"
    >
      <div class="gradient-border-inner">
        <!-- Clean header bar like a tiling WM -->
        <div
          class="flex items-center justify-between px-4 py-2 bg-tokyo-bg-dark border-b border-tokyo-purple/20"
        >
          <span class="text-tokyo-comment text-xs">kitty ~ fish</span>
          <div class="flex items-center gap-3 text-xs text-tokyo-comment">
            <img
              src="./logo.svg"
              alt="Terminal Icon"
              class="w-4 h-4 fill-tokyo-bg"
            />
            <span>ruzbyte@ruzbyte-Cachy</span>
          </div>
        </div>

        <div class="p-6 min-h-[200px]">
          {#each terminalLines as line, i}
            <div class="flex items-center gap-2 mb-2">
              {#if !line.isOutput}
                <span class="text-tokyo-cyan sm:text-md">{line.prompt}</span>
                <span class="text-tokyo-purple sm:text-md">{">"}</span>
                <span class="text-tokyo-fg sm:text-sm">{line.typed}</span>
                {#if i === terminalLines.length - 1 && !line.isOutput && line.typed !== line.command}
                  <span class="text-tokyo-cyan animate-pulse">_</span>
                {/if}
              {:else}
                <span
                  class="text-tokyo-green text-2xl animate-[fade-in-up_0.6s_ease-out] font-bold tracking-wider glitch-skew"
                  >{line.typed}</span
                >
              {/if}
            </div>
          {/each}

          {#if currentLineIndex >= commands.length}
            <div class="flex items-center gap-2 mt-4">
              <span class="text-tokyo-cyan">~</span>
              <span class="text-tokyo-purple">{">"}</span>
              <span class="text-tokyo-cyan animate-pulse">_</span>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Intro text area -->
    {#if showIntro}
      <div class="mt-8 space-y-4 animate-[fade-in-up_0.6s_ease-out]">
        <div
          class="bg-tokyo-bg-dark/90 border border-tokyo-cyan/20 rounded-sm p-6 backdrop-blur-sm"
        >
          <div class="flex items-center gap-2 text-tokyo-comment text-sm mb-4">
            <span class="text-tokyo-yellow">/* About Me */</span>
          </div>
          <p class="text-tokyo-fg/80 leading-relaxed">
            <span class="text-tokyo-purple">const</span>
            <span class="text-tokyo-blue">bio</span>
            =
            <span class="text-tokyo-green"
              >"I'm a german vocationally trained software developer currently
              studying computer engineering, learning and building software
              every single day."</span
            >;
          </p>
          <p class="text-tokyo-comment mt-2 text-sm">
            // Starting my passion from gaming as a kid, I quickly grew into
            building software I need, and also others use daily to make life
            easier. While trained as an RPGLE/.NET backend developer I used my
            free time to explore other technologies and domains, leading me to
            become a versatile fullstack developer and im continuously expanding
            my skillset, soon graduaing with a BSc in Computer Engineering.
          </p>
        </div>

        <!-- Quick navigation hints -->
        <div class="flex flex-wrap gap-3 justify-center mt-8">
          <a
            href="#skills"
            class="px-4 py-2 text-sm border border-tokyo-purple/50 text-tokyo-purple hover:bg-tokyo-purple/10 hover:scale-105 transition-all duration-300 rounded"
            style="animation: fade-in-up 0.5s ease-out 0.1s both;"
          >
            tree ~/skills
          </a>
          <a
            href="#projects"
            class="px-4 py-2 text-sm border border-tokyo-cyan/50 text-tokyo-cyan hover:bg-tokyo-cyan/10 hover:scale-105 transition-all duration-300 rounded"
            style="animation: fade-in-up 0.5s ease-out 0.2s both;"
          >
            ls -lah ~/projects
          </a>
          <a
            href="#contact"
            class="px-4 py-2 text-sm border border-tokyo-green/50 text-tokyo-green hover:bg-tokyo-green/10 hover:scale-105 transition-all duration-300 rounded"
            style="animation: fade-in-up 0.5s ease-out 0.3s both;"
          >
            ./contact.sh
          </a>
        </div>
      </div>
    {/if}
  </div>

  <!-- Scroll indicator -->
  <div
    class="absolute bottom-8 left-1/2 -translate-x-1/2 text-tokyo-comment text-sm flex flex-col items-center gap-2"
    style="animation: fade-in-up 1s ease-out 1.5s both;"
  >
    <span
      class="text-xs"
      style="animation: scroll-bounce 2s ease-in-out infinite;"
      >scroll down</span
    >
    <div class="w-px h-8 bg-linear-to-b from-tokyo-purple to-transparent"></div>
  </div>
</section>
