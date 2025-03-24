<script>
  import UnitCard from '$lib/UnitCard.svelte';

  let { data } = $props();
  let { units, breakpoints, encounters } = data;
  console.log(breakpoints);
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

  let selectedUnits = $state([]);
  const toggleUnitSelection = unit => {
    const index = selectedUnits.findIndex(selected => (
      selected.unit_id === unit.unit_id
    ));
    if (index === -1) {
      selectedUnits.push(unit);
    } else {
      selectedUnits.splice(index, 1);
    }
  };

  $inspect(selectedUnits);

  let allSelectedTraits = $derived.by(() => {
    let result = {};
    selectedUnits.forEach(unit => {
      unit.traits.forEach(trait => {
        result[trait.trait_id] = result[trait.trait_id]
          ? result[trait.trait_id] + 1
          : 1;
      });
    });
    return result;
  });

  $inspect(allSelectedTraits);

  let activeTraits = $derived.by(() => {
    let result = {};
    Object.keys(allSelectedTraits).forEach(trait_id => {
      let traitBreakpoints = breakpoints.filter(breakpoint => (
        parseInt(trait_id) === breakpoint.trait_id
      ));
      console.log(breakpoints, traitBreakpoints);
      let activeBreakpoint;
      traitBreakpoints.forEach(breakpoint => {
        let currentBreakpoint = parseInt(allSelectedTraits[trait_id]);
        if (allSelectedTraits[trait_id] >= breakpoint.breakpoint_value) {
          activeBreakpoint = breakpoint;
        }
      });
      if (activeBreakpoint) {
        result[trait_id] = activeBreakpoint;
      }
    });
    return result;
  })

  $inspect(activeTraits);

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
            selectedUnits={selectedUnits}
          />
        {/each}
      </div>
      <div class="units-by-cost">
        {#each unitsByCost[2] as unit}
          <UnitCard
            unit={unit}
            toggleUnitSelection={toggleUnitSelection}
            selectedUnits={selectedUnits}
          />
        {/each}
      </div>
      <div class="units-by-cost">
        {#each unitsByCost[3] as unit}
          <UnitCard
            unit={unit}
            toggleUnitSelection={toggleUnitSelection}
            selectedUnits={selectedUnits}
          />
        {/each}
      </div>
      <div class="units-by-cost">
        {#each unitsByCost[4] as unit}
          <UnitCard
            unit={unit}
            toggleUnitSelection={toggleUnitSelection}
            selectedUnits={selectedUnits}
          />
        {/each}
      </div>
      <div class="units-by-cost">
        {#each unitsByCost[5] as unit}
          <UnitCard
            unit={unit}
            toggleUnitSelection={toggleUnitSelection}
            selectedUnits={selectedUnits}
          />
        {/each}
      </div>
    </div>
  </div>
  <div class="current-game-state">
    <h3 class="subtitle">Current Units</h3>
    {#if selectedUnits.length === 0}
      <p class="description">Units you select will show up here.</p>
    {/if}
    <div class="units-by-cost">
      {#each units as unit}
        {#if selectedUnits.some(selected => selected.unit_id === unit.unit_id)}
          <UnitCard
            unit={unit}
            toggleUnitSelection={toggleUnitSelection}
            selectedUnits={selectedUnits}
            isMini={true}
          />
        {/if}
      {/each}
    </div>
    <h3 class="subtitle">Active Traits</h3>
    {#if Object.keys(activeTraits).length === 0}
      <p class="description">Activated traits will show up here.</p>
    {/if}
    <div class="traits">
      {#each Object.keys(activeTraits) as activeTraitId}
      <div
        class="
          trait-tag
          {`trait-tag--${activeTraits[activeTraitId].breakpoint_tier}`}
      ">
        <p class="trait">
          {activeTraits[activeTraitId].trait_name}
        </p>
        <p class="breakpoint">
          {activeTraits[activeTraitId].breakpoint_value}
        </p>
      </div>
    {/each}
    </div>

  </div>
</div>

<style>
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
  .traits {
    display: flex;
    flex-wrap: wrap;
  }
  .trait-tag {
    background-color: #bbbbbb88;
    border-radius: 8px;
    display: flex;
    height: 32px;
    justify-content: space-between;
    margin: 0 0 4px 4px;
    padding: 0;
    width: 140px;
  }
  .trait-tag--bronze {
    background-color: #99571477
  }
  .trait-tag--silver {
    background-color: #86868666;
  }
  .trait-tag--gold {
    background-color: #ffae0088;
  }
  .trait-tag--prismatic {
    background-color: blue;
  }
  .trait-tag--unique {
    background-color: #ff494988;
  }
  .trait, .breakpoint {
    margin: 0;
    padding: 8px;
  }
</style>
