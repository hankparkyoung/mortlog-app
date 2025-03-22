<script>
  import UnitCard from '$lib/UnitCard.svelte';

  let { data } = $props();
  let { units } = data;
</script>

<h1>Create Game</h1>

<div class="units-container">
  {#each units as unit}
    <UnitCard unit={unit} />
  {/each}
</div>
