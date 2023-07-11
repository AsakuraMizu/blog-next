<script lang="ts">
  import { page } from '$app/stores';
  import { posts } from '$lib/posts';

  $: post = posts[$page.url.pathname];
</script>

<svelte:head>
  <title>{post.title} | Asakura Mizu's Blog</title>
</svelte:head>

<div class="post">
  <h1>{post.title}</h1>
  <p op="75">
    {post.time.format('YYYY-MM-DD HH:mm')} ({post.time.fromNow()})
    {#if post.author}
      - by {post.author}
    {/if}
  </p>
  <slot />
</div>
