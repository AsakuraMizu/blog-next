<script lang="ts">
  import '@fontsource/noto-sans-sc/400.css';
  import '@fontsource/noto-sans-sc/500.css';
  import '@fontsource/noto-sans-sc/700.css';
  import '@fontsource/rubik/400.css';
  import '@fontsource/rubik/500.css';
  import '@fontsource/rubik/700.css';
  import '@unocss/reset/tailwind.css';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import 'uno.css';
  import '../app.postcss';
  import '../post.postcss';

  dayjs.extend(relativeTime);

  let scrollY = 0;
</script>

<svelte:window bind:scrollY />

<div
  flex="~ col"
  items="center"
  min-h="screen"
  text="base"
  font="normal synthesis-none antialiased"
>
  <header w="full">
    <a pos="absolute lg:fixed" href="/" select="none" w="8" h="8" m="4">
      <img src="$lib/assets/logo.png" alt="blog" class="logo logo-light" />
      <img src="$lib/assets/logo-dark.png" alt="blog" class="logo logo-dark" />
    </a>
    <button
      pos="fixed right-3 bottom-3"
      w="10"
      h="10"
      transition="all"
      bg="hover:slate/25"
      border="rounded-full"
      class={scrollY > 300 ? 'op-50 hover:op-100' : 'op-0 pointer-events-none'}
      on:click={() => void (scrollY = 0)}
    >
      <div
        class="i-icon-park-outline:to-top-one vertical-middle"
        display="inline-block"
        w="5"
        h="5"
      />
    </button>
    <nav float="right" flex="~" p="6" gap="6" items="center">
      <a href="/posts">Posts</a>
      <a href="/projects">Projects</a>
      <a href="https://github.com/AsakuraMizu" rel="noopener">
        <div class="i-icon-park-outline:github-one" w="5" h="5" />
      </a>
    </nav>
  </header>
  <main flex="~ col" p="4" w="full" max-w="256" m="ba" items="center">
    <slot />
  </main>

  <footer flex="~ col" justify="center" items="center" p="3">
    <p>
      <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>
      2023-PRESENT © Asakura Mizu
    </p>
  </footer>
</div>

<style lang="postcss">
  .logo {
    @apply op-50;
  }

  @media (prefers-color-scheme: dark) {
    .logo-light {
      display: none;
    }
  }

  @media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {
    .logo-dark {
      display: none;
    }
  }

  nav {
    a {
      @apply transition-opacity;
      @apply op-60;

      &:hover {
        @apply op-100;
      }
    }
  }
</style>
