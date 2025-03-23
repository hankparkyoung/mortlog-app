<script>
  import UnitCard from '$lib/UnitCard.svelte';

  let { data } = $props();
  let { units } = data;
  let unitsByCost = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  };
  units.forEach(unit => {
    unitsByCost[unit.cost].push(unit);
  });

  let selectedUnitIds = $state([]);
  const toggleUnitSelection = unitId => {
    const index = selectedUnitIds.indexOf(unitId);
    if (index === -1) {
      selectedUnitIds.push(unitId);
    } else {
      selectedUnitIds.splice(index, 1);
    }
  };

  $inspect(selectedUnitIds);

</script>

<h1>Create Game</h1>

<div class="create-game">
  <div class="unit-selection">
    <h3 class="subtitle">Select Units</h3>
    <div class="units-container">
      <div class="units-by-cost">
        {#each unitsByCost[1] as unit}
          <UnitCard
            unit={unit}
            toggleUnitSelection={toggleUnitSelection}
            selectedUnitIds={selectedUnitIds}
          />
        {/each}
      </div>
      <div class="units-by-cost">
        {#each unitsByCost[2] as unit}
          <UnitCard
            unit={unit}
            toggleUnitSelection={toggleUnitSelection}
            selectedUnitIds={selectedUnitIds}
          />
        {/each}
      </div>
      <div class="units-by-cost">
        {#each unitsByCost[3] as unit}
          <UnitCard
            unit={unit}
            toggleUnitSelection={toggleUnitSelection}
            selectedUnitIds={selectedUnitIds}
          />
        {/each}
      </div>
      <div class="units-by-cost">
        {#each unitsByCost[4] as unit}
          <UnitCard
            unit={unit}
            toggleUnitSelection={toggleUnitSelection}
            selectedUnitIds={selectedUnitIds}
          />
        {/each}
      </div>
      <div class="units-by-cost">
        {#each unitsByCost[5] as unit}
          <UnitCard
            unit={unit}
            toggleUnitSelection={toggleUnitSelection}
            selectedUnitIds={selectedUnitIds}
          />
        {/each}
      </div>
    </div>
  </div>
  <div class="current-game-state">
    <h3 class="subtitle">Current Units</h3>
    {#if selectedUnitIds.length === 0}
      <p class="description">Units you select will show up here.</p>
    {/if}
    <div class="units-by-cost">
      {#each units as unit}
        {#if selectedUnitIds.includes(unit.unit_id)}
          <UnitCard
            unit={unit}
            toggleUnitSelection={toggleUnitSelection}
            selectedUnitIds={selectedUnitIds}
            isMini={true}
          />
        {/if}
      {/each}
    </div>
    <h3 class="subtitle">Active Traits</h3>
  </div>
</div>

<style lang="scss">
  .create-game {
    background-color: #eeeeee;
    display: flex;
    padding: 8px;
  }
  .unit-selection, .current-game-state {
    width: 50%;
  }

  .subtitle, .description {
    margin: 0 0 8px 4px;
    padding: 0;
  }
  .units-container {
    display: block;
    margin: none;
  }
  .units-by-cost {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }
</style>
