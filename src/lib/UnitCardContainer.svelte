<script>
  import { UnitCard } from '$lib';

  let {
    subtitle,
    isMini,
    placeholder,
    units,
    toggleUnitSelection,
    selectedUnits
  } = $props();

</script>

<div
  class="unit-card-container"
  class:current-units-container={isMini}
>
  <h3 class="subtitle">{subtitle}</h3>
  <div
    class="units"
    class:current-units={isMini}
  >
    {#if units.length === 0}
      <p class="placeholder">{placeholder}</p>
    {/if}
    {#each units as unit (unit.unit_id)}
      <UnitCard
        isMini={isMini}
        unit={unit}
        toggleUnitSelection={toggleUnitSelection}
        selectedUnits={selectedUnits}
      />
    {/each}
  </div>
</div>

<style>
  * {
    all: unset;
    box-sizing: border-box;
  }
  .unit-card-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }
  .current-units-container {
    height: 132px;
    width: 390px;
  }
  .units {
    align-content: flex-start;
    display: flex;
    flex-wrap: wrap;
  }
</style>