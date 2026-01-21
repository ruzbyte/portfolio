<script>
  let name = '';
  let email = '';
  let message = '';
  let currentField = 'name';
  let isSubmitting = false;
  let submitted = false;
  let terminalOutput = [];

  function addOutput(text, type = 'output') {
    terminalOutput = [...terminalOutput, { text, type }];
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    isSubmitting = true;
    terminalOutput = [];
    
    addOutput('$ ./contact.sh --send', 'command');
    await new Promise(r => setTimeout(r, 300));
    
    addOutput('[INFO] Validating input...', 'info');
    await new Promise(r => setTimeout(r, 400));
    
    addOutput('[OK] Name: ' + name, 'success');
    await new Promise(r => setTimeout(r, 200));
    
    addOutput('[OK] Email: ' + email, 'success');
    await new Promise(r => setTimeout(r, 200));
    
    addOutput('[OK] Message length: ' + message.length + ' chars', 'success');
    await new Promise(r => setTimeout(r, 400));
    
    addOutput('[INFO] Establishing connection...', 'info');
    await new Promise(r => setTimeout(r, 600));
    
    addOutput('[SUCCESS] Message sent successfully!', 'success');
    addOutput('Exit code: 0', 'output');
    
    isSubmitting = false;
    submitted = true;
  }

  function getOutputClass(type) {
    const classes = {
      'command': 'text-tokyo-fg',
      'info': 'text-tokyo-cyan',
      'success': 'text-tokyo-green',
      'error': 'text-tokyo-red',
      'output': 'text-tokyo-comment',
    };
    return classes[type] || 'text-tokyo-fg';
  }

  function resetForm() {
    name = '';
    email = '';
    message = '';
    submitted = false;
    terminalOutput = [];
    currentField = 'name';
  }
</script>

<section id="contact" class="min-h-screen py-20 px-6">
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="tile-window zzz-glow mb-8">
      <div class="tile-header">
        <div class="tile-dot bg-tokyo-red"></div>
        <div class="tile-dot bg-tokyo-yellow"></div>
        <div class="tile-dot bg-tokyo-green"></div>
        <span class="ml-2 text-tokyo-comment text-sm">contact.sh</span>
      </div>
      
      <div class="p-4">
        <div class="text-tokyo-comment text-sm mb-2">#!/bin/bash</div>
        <div class="text-tokyo-comment text-sm"># Interactive contact form</div>
        <div class="text-tokyo-comment text-sm"># Usage: ./contact.sh</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Input Form -->
      <div class="tile-window zzz-glow">
        <div class="tile-header">
          <span class="text-tokyo-green">INPUT</span>
          <span class="ml-2 text-tokyo-comment text-xs">stdin</span>
        </div>
        
        <form onsubmit={handleSubmit} class="p-4 space-y-4">
          <!-- Name field -->
          <div>
            <label class="flex items-center gap-2 text-sm mb-2" for="name">
              <span class="text-tokyo-cyan">$</span>
              <span class="text-tokyo-purple">read</span>
              <span class="text-tokyo-fg">-p "Name: " NAME</span>
            </label>
            <div class="flex items-center gap-2 bg-tokyo-bg-dark border border-tokyo-purple/30 rounded px-3 py-2 focus-within:border-tokyo-purple transition-colors">
              <span class="text-tokyo-green">{">"}</span>
              <input
                id="name"
                type="text"
                bind:value={name}
                onfocus={() => currentField = 'name'}
                class="flex-1 bg-transparent text-tokyo-fg outline-none placeholder:text-tokyo-comment/50"
                placeholder="your_name"
                disabled={submitted}
              />
              {#if currentField === 'name' && !submitted}
                <span class="text-tokyo-cyan animate-pulse">_</span>
              {/if}
            </div>
          </div>

          <!-- Email field -->
          <div>
            <label class="flex items-center gap-2 text-sm mb-2" for="email">
              <span class="text-tokyo-cyan">$</span>
              <span class="text-tokyo-purple">read</span>
              <span class="text-tokyo-fg">-p "Email: " EMAIL</span>
            </label>
            <div class="flex items-center gap-2 bg-tokyo-bg-dark border border-tokyo-purple/30 rounded px-3 py-2 focus-within:border-tokyo-purple transition-colors">
              <span class="text-tokyo-green">{">"}</span>
              <input
                id="email"
                type="email"
                bind:value={email}
                onfocus={() => currentField = 'email'}
                class="flex-1 bg-transparent text-tokyo-fg outline-none placeholder:text-tokyo-comment/50"
                placeholder="user@domain.com"
                disabled={submitted}
              />
              {#if currentField === 'email' && !submitted}
                <span class="text-tokyo-cyan animate-pulse">_</span>
              {/if}
            </div>
          </div>

          <!-- Message field -->
          <div>
            <label class="flex items-center gap-2 text-sm mb-2" for="message">
              <span class="text-tokyo-cyan">$</span>
              <span class="text-tokyo-purple">cat</span>
              <span class="text-tokyo-fg">{"<<"} EOF {">"} message.txt</span>
            </label>
            <div class="bg-tokyo-bg-dark border border-tokyo-purple/30 rounded p-3 focus-within:border-tokyo-purple transition-colors">
              <textarea
                id="message"
                bind:value={message}
                onfocus={() => currentField = 'message'}
                rows="4"
                class="w-full bg-transparent text-tokyo-fg outline-none resize-none placeholder:text-tokyo-comment/50"
                placeholder="Your message here..."
                disabled={submitted}
              ></textarea>
              <div class="text-tokyo-purple text-sm">EOF</div>
            </div>
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            disabled={isSubmitting || submitted || !name || !email || !message}
            class="w-full py-3 px-4 bg-tokyo-bg-highlight border border-tokyo-purple text-tokyo-purple rounded hover:bg-tokyo-purple hover:text-tokyo-bg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 zzz-glow"
          >
            {#if isSubmitting}
              <span class="animate-spin">{"⟳"}</span>
              <span>Processing...</span>
            {:else if submitted}
              <span>Message Sent</span>
            {:else}
              <span>./send.sh</span>
            {/if}
          </button>

          {#if submitted}
            <button
              type="button"
              onclick={resetForm}
              class="w-full py-2 px-4 border border-tokyo-comment/50 text-tokyo-comment rounded hover:border-tokyo-cyan hover:text-tokyo-cyan transition-colors text-sm"
            >
              ./reset.sh
            </button>
          {/if}
        </form>
      </div>

      <!-- Output Terminal -->
      <div class="tile-window zzz-glow">
        <div class="tile-header">
          <span class="text-tokyo-yellow">OUTPUT</span>
          <span class="ml-2 text-tokyo-comment text-xs">stdout</span>
        </div>
        
        <div class="p-4 min-h-[300px] lg:min-h-[400px]">
          {#if terminalOutput.length === 0 && !isSubmitting}
            <div class="text-tokyo-comment text-sm">
              <p># Waiting for input...</p>
              <p class="mt-2"># Fill in the form and execute ./send.sh</p>
              <div class="mt-4 flex items-center gap-2">
                <span class="text-tokyo-cyan">~</span>
                <span class="text-tokyo-purple">{">"}</span>
                <span class="text-tokyo-cyan animate-pulse">_</span>
              </div>
            </div>
          {:else}
            <div class="space-y-1 text-sm">
              {#each terminalOutput as line}
                <div class={getOutputClass(line.type)}>{line.text}</div>
              {/each}
              {#if !isSubmitting && terminalOutput.length > 0}
                <div class="flex items-center gap-2 mt-4">
                  <span class="text-tokyo-cyan">~</span>
                  <span class="text-tokyo-purple">{">"}</span>
                  <span class="text-tokyo-cyan animate-pulse">_</span>
                </div>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Social links -->
    <div class="mt-8 tile-window p-4 zzz-glow">
      <div class="text-tokyo-comment text-sm mb-4"># Other ways to reach me:</div>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="https://github.com" class="flex items-center gap-2 text-tokyo-fg hover:text-tokyo-purple transition-colors">
          <span>github</span>
        </a>
        <a href="https://linkedin.com" class="flex items-center gap-2 text-tokyo-fg hover:text-tokyo-cyan transition-colors">
          <span>linkedin</span>
        </a>
        <a href="mailto:user@domain.com" class="flex items-center gap-2 text-tokyo-fg hover:text-tokyo-green transition-colors">
          <span>email</span>
        </a>
        <a href="https://discord.com" class="flex items-center gap-2 text-tokyo-fg hover:text-tokyo-yellow transition-colors">
          <span>discord</span>
        </a>
      </div>
    </div>
  </div>
</section>
