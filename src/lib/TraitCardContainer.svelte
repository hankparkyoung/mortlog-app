<script>
  import TraitCard from '$lib/TraitCard.svelte';

  let {
    title,
    placeholder,
    traits
  } = $props();
</script>

<div class="trait-card-container">
  <h3 class="title">{title}</h3>
  {#if Object.keys(traits).length === 0}
    <p class="placeholder">{placeholder}</p>
  {/if}
  <div class="traits">
    {#each Object.keys(traits) as traitId (traits[traitId].breakpoint_id)}
      <TraitCard
        trait={traits[traitId]}
      />
    {/each}
  </div>
</div>

<style>
  * {
    all: unset;
    box-sizing: border-box;
  }
  .trait-card-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
    line-height: 32px;
  }
  .placeholder {
    font-style: italic;
  }
  .traits {
    display: flex;
    flex-wrap: wrap;
  }
</style>