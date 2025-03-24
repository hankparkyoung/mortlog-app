<script>
  import UnitCard from '$lib/UnitCard.svelte';

  let {
    unitsByCost,
    toggleUnitSelection,
    selectedUnits
  } = $props();
</script>

<div class="unit-card-container">
  <h3 class="title">Select Units</h3>
  {#each Object.keys(unitsByCost) as unitsByCostSection}
    <div class="units-by-cost">
      {#each unitsByCost[unitsByCostSection] as unit}
        <UnitCard
          unit={unit}
          toggleUnitSelection={toggleUnitSelection}
          selectedUnits={selectedUnits}
        />
      {/each}
    </div>
  {/each}
</div>

<style>
  .unit-card-container {
    padding: none;
    margin: none;
    width: 50%;
  }
  .units-by-cost {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }
</style>