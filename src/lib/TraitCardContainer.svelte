<script>
  import { TraitCard } from '$lib';

  let {
    subtitle,
    placeholder,
    traits
  } = $props();
</script>

<div class="trait-card-container">
  <h3 class="subtitle">{subtitle}</h3>
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
  .traits {
    display: flex;
    flex-wrap: wrap;
  }
</style>