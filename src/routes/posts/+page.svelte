<script lang="ts">
  import { posts } from '$lib/posts';
</script>

<svelte:head>
  <title>Posts | Asakura Mizu's Blog</title>
</svelte:head>

<div w="full" max-w="192">
  <h1 text="3xl" font="bold">Posts</h1>

  <div flex="~ col" gap="4" p="5">
    {#each Object.entries(posts) as [path, post] (path)}
      <a href={path} font="normal">
        <span>{post.title}</span>
        {#if post.tags}
          {#each post.tags as tag}
            <span bg="slate/30" border="rounded" text="sm" p="0.5" m="x-0.5">#{tag}</span>
          {/each}
        {/if}
        {#if post.author}
          <span bg="slate/30" border="rounded" text="sm" p="0.5">author:{post.author}</span>
        {/if}
        <span op="75" float="right">{post.time.fromNow()}</span>
      </a>
    {/each}
  </div>
</div>
