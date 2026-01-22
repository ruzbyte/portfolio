<script lang="ts">
  import { untrack } from "svelte";

  let visible = $state(false);
  let treeRendered = $state(false);
  let typedCommand = $state("");
  let showCursor = $state(true);

  const command = "tree ~/skills --level-bars";

  let skillsData = [
    {
      category: "Frontend",
      icon: "",
      skills: [
        { name: "Flutter", level: 95, rank: "S+" },
        { name: "React", level: 90, rank: "S" },
        { name: "WPF", level: 88, rank: "S" },
        { name: "Svelte", level: 70, rank: "A" },
      ],
    },
    {
      category: "Backend",
      icon: "",
      skills: [
        { name: "C#", level: 87, rank: "S" },
        { name: "Python", level: 85, rank: "S" },
        { name: "Typescript", level: 80, rank: "S" },
        { name: "Rust", level: 45, rank: "C" },
      ],
    },
    {
      category: "DevOps",
      icon: "",
      skills: [
        { name: "Linux", level: 92, rank: "S+" },
        { name: "Docker", level: 80, rank: "A" },
        { name: "Gitlab CI/CD", level: 70, rank: "A" },
        { name: "Firebase", level: 65, rank: "B" },
      ],
    },
    {
      category: "Database",
      icon: "",
      skills: [
        { name: "Firestore", level: 85, rank: "S" },
        { name: "PostgreSQL", level: 82, rank: "A" },
        { name: "MySQL", level: 80, rank: "A" },
      ],
    },
  ];

  function getRankColor(rank: string) {
    const colors: Record<string, string> = {
      "S+": "text-tokyo-yellow",
      S: "text-tokyo-purple",
      A: "text-tokyo-cyan",
      B: "text-tokyo-green",
      C: "text-tokyo-orange",
    };
    return colors[rank] || "text-tokyo-fg";
  }

  function getRankGlow(rank: string) {
    const glows: Record<string, string> = {
      "S+": "shadow-[0_0_15px_var(--tokyo-yellow)]",
      S: "shadow-[0_0_10px_var(--tokyo-purple)]",
      A: "shadow-[0_0_8px_var(--tokyo-cyan)]",
      B: "",
      C: "",
    };
    return glows[rank] || "";
  }

  $effect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !visible) {
          visible = true;
          untrack(() => {
            typeCommand();
          });
        }
      },
      { threshold: 0.2 },
    );

    const element = document.getElementById("skills");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  });

  async function typeCommand() {
    // Type the command character by character
    for (let i = 0; i < command.length; i++) {
      await new Promise((r) => setTimeout(r, 50));
      typedCommand = command.substring(0, i + 1);
    }
    // Wait a bit then show the output
    await new Promise((r) => setTimeout(r, 400));
    showCursor = false;
    treeRendered = true;
  }
</script>

<section id="skills" class="min-h-screen py-20 px-6">
  <div class="max-w-6xl mx-auto">
    <!-- Terminal header -->
    <div class="tile-window zzz-glow mb-8">
      <div class="tile-header">
        <div class="tile-dot bg-tokyo-red"></div>
        <div class="tile-dot bg-tokyo-yellow"></div>
        <div class="tile-dot bg-tokyo-green"></div>
        <span class="ml-2 text-tokyo-comment text-sm">skills.tree</span>
      </div>

      <div class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-tokyo-cyan">~</span>
          <span class="text-tokyo-purple">{">"}</span>
          <span class="text-tokyo-fg">{typedCommand}</span>
          {#if showCursor}
            <span class="animate-pulse text-tokyo-fg">▋</span>
          {/if}
        </div>

        {#if treeRendered}
          <div class="mt-4 text-tokyo-blue">
            <span>~/skills</span>
          </div>
        {/if}
      </div>
    </div>

    <!-- Skills Tree Grid -->
    {#if treeRendered}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each skillsData as category, catIndex}
          <div
            class="tile-window zzz-glow animate-[fade-in-up_0.5s_ease-out]"
            style="animation-delay: {catIndex *
              150}ms; animation-fill-mode: both;"
          >
            <div class="tile-header">
              <span class="text-tokyo-yellow">{category.icon}</span>
              <span class="text-tokyo-purple font-bold"
                >{category.category}</span
              >
              <span class="ml-auto text-tokyo-comment text-xs"
                >LVL {Math.floor(
                  category.skills.reduce((a, b) => a + b.level, 0) /
                    category.skills.length,
                )}</span
              >
            </div>

            <div class="p-4 space-y-4">
              {#each category.skills as skill, skillIndex}
                <div
                  class="group"
                  style="animation: fade-in-up 0.3s ease-out {catIndex * 150 +
                    skillIndex * 100}ms both;"
                >
                  <div class="flex items-center justify-between mb-1">
                    <div class="flex items-center gap-2">
                      <span class="text-tokyo-comment">├──</span>
                      <span
                        class="text-tokyo-fg group-hover:text-tokyo-cyan transition-colors"
                        >{skill.name}</span
                      >
                    </div>
                    <div class="flex items-center gap-3">
                      <span class="text-tokyo-comment text-xs"
                        >{skill.level}/100</span
                      >
                      <span
                        class={`text-xs font-bold px-2 py-0.5 rounded border ${getRankColor(skill.rank)} ${getRankGlow(skill.rank)}`}
                        style="border-color: currentColor;"
                      >
                        {skill.rank}
                      </span>
                    </div>
                  </div>

                  <!-- XP Bar -->
                  <div class="ml-6 xp-bar h-2">
                    <div
                      class="xp-fill"
                      style="width: {visible
                        ? skill.level
                        : 0}%; transition-delay: {catIndex * 150 +
                        skillIndex * 100}ms;"
                    ></div>
                  </div>
                </div>
              {/each}

              <div class="text-tokyo-comment text-sm mt-2">
                └── <span class="text-tokyo-green"
                  >{category.skills.length} skills loaded</span
                >
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Legend -->
      <div class="mt-8 tile-window p-4 zzz-glow">
        <div class="flex flex-wrap items-center justify-center gap-6 text-sm">
          <span class="text-tokyo-comment">Rank System:</span>
          <span class="text-tokyo-yellow">S+ Elite</span>
          <span class="text-tokyo-purple">S Master</span>
          <span class="text-tokyo-cyan">A Expert</span>
          <span class="text-tokyo-green">B Proficient</span>
          <span class="text-tokyo-orange">C Learning</span>
        </div>
      </div>
    {/if}
  </div>
</section>
