<script>
  let visible = $state(false);
  let typedCommand = $state("");
  let showProjects = $state(false);
  const fullCommand = "ls -lah ~/projects";

  const projects = [
    {
      name: "valstore",
      type: "drwxr-xr-x",
      size: "42.2K",
      date: "June 2022",
      description: "Access your valorant shop on your phone",
      tags: ["Flutter", "Firebase", "REST API"],
      status: "archived",
      link: "https://github.com/ruzbyte/valstore-mobile",
    },
    {
      name: "dotfiles",
      type: "drwxr-xr-x",
      size: "2.1K",
      date: "Nov 28 2025",
      description: "Personal configuration files for development",
      tags: ["Shell", "Lua", "CSS"],
      status: "active",
      link: "https://github.com/ruzbyte/dotfiles",
    },
    {
      name: "qube",
      type: "drwxr-xr-x",
      size: "18.7K",
      date: "Jan 8",
      description: "Deploy game servers in seconds using Docker",
      tags: ["Docker", "TypeScript", "Next.js"],
      status: "active",
      link: "https://github.com/ruzbyte/qube",
    },
    {
      name: "linux-wallpaper-engine-ui",
      type: "drwxr-xr-x",
      size: "12.3K",
      date: "Dec 20",
      description: "A wallpaper engine client for Linux desktops",
      tags: ["Flutter", "Linux"],
      status: "active",
      link: "https://github.com/ruzbyte/linux-wallpaper-engine-ui",
    },
    {
      name: "kafka",
      type: "drwxr-xr-x",
      size: "8.5K",
      date: "Feb 15",
      description: "All In One student platform",
      tags: ["Next.js", "Rest API", "TypeScript", "Firebase"],
      status: "maintained",
      link: "https://github.com/ruzbyte/kafka",
    },
    {
      name: "MC68000-Emulator",
      type: "drwxr-xr-x",
      size: "5.4K",
      date: "March 10",
      description: "A Motorola 68000 CPU emulator concept written in Rust",
      tags: ["Rust", "Emulator"],
      status: "maintained",
      link: "https://github.com/ruzbyte/MC68000-Emulator",
    },
  ];

  function getStatusColor(status) {
    const colors = {
      active: "bg-tokyo-green/20 text-tokyo-green border-tokyo-green/50",
      maintained: "bg-tokyo-cyan/20 text-tokyo-cyan border-tokyo-cyan/50",
      archived:
        "bg-tokyo-comment/20 text-tokyo-comment border-tokyo-comment/50",
    };
    return colors[status] || "";
  }

  $effect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !visible) {
          visible = true;
          typeCommand();
        }
      },
      { threshold: 0.2 },
    );

    const element = document.getElementById("projects");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  });

  async function typeCommand() {
    for (let i = 0; i <= fullCommand.length; i++) {
      await new Promise((r) => setTimeout(r, 50));
      typedCommand = fullCommand.substring(0, i);
    }
    await new Promise((r) => setTimeout(r, 600));
    showProjects = true;
  }
</script>

<section id="projects" class="min-h-screen py-20 px-6">
  <div class="max-w-6xl mx-auto">
    <!-- Terminal window -->
    <div class="tile-window zzz-glow mb-8">
      <div class="tile-header">
        <div class="tile-dot bg-tokyo-red"></div>
        <div class="tile-dot bg-tokyo-yellow"></div>
        <div class="tile-dot bg-tokyo-green"></div>
        <span class="ml-2 text-tokyo-comment text-sm">projects ~ zsh</span>
      </div>

      <div class="p-4">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-tokyo-cyan">~</span>
          <span class="text-tokyo-purple">{">"}</span>
          <span class="text-tokyo-fg">{typedCommand}</span>
          {#if typedCommand !== fullCommand}
            <span class="text-tokyo-cyan animate-pulse">_</span>
          {/if}
        </div>

        {#if showProjects}
          <!-- ls output header -->
          <div class="text-tokyo-comment text-sm mb-2 font-mono">
            total {projects.length}
          </div>

          <!-- ls output listing -->
          <div class="space-y-1 text-sm overflow-x-auto">
            {#each projects as project, i}
              <div
                class="flex items-center gap-4 hover:bg-tokyo-bg-highlight/50 px-2 py-1 rounded transition-colors cursor-pointer group animate-[fade-in-up_0.4s_ease-out]"
                style="animation-delay: {i * 100}ms; animation-fill-mode: both;"
              >
                <span class="text-tokyo-comment w-24 shrink-0"
                  >{project.type}</span
                >
                <span class="text-tokyo-comment w-12 shrink-0 text-right"
                  >{project.size}</span
                >
                <span class="text-tokyo-comment w-20 shrink-0"
                  >{project.date}</span
                >
                <span
                  class="text-tokyo-blue group-hover:text-tokyo-cyan transition-colors"
                  >{project.name}/</span
                >
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>

    <!-- Project Cards -->
    {#if showProjects}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each projects as project, i}
          <a
            href={project.link}
            class="tile-window group hover:scale-[1.02] transition-all duration-300 zzz-glow animate-[fade-in-up_0.5s_ease-out]"
            style="animation-delay: {300 +
              i * 150}ms; animation-fill-mode: both;"
          >
            <div class="tile-header">
              <span
                class="text-tokyo-blue group-hover:text-tokyo-cyan transition-colors"
                >./{project.name}</span
              >
              <span
                class={`ml-auto text-xs px-2 py-0.5 rounded border ${getStatusColor(project.status)}`}
              >
                {project.status}
              </span>
            </div>

            <div class="p-4">
              <p class="text-tokyo-fg/80 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              <div class="flex flex-wrap gap-2">
                {#each project.tags as tag}
                  <span
                    class="text-xs px-2 py-1 bg-tokyo-bg-highlight border border-tokyo-purple/30 text-tokyo-purple rounded"
                  >
                    {tag}
                  </span>
                {/each}
              </div>

              <div
                class="mt-4 flex items-center gap-2 text-tokyo-comment text-xs group-hover:text-tokyo-cyan transition-colors"
              >
                <span>cd {project.name} && cat README.md</span>
                <span class="ml-auto">{">"}</span>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</section>
