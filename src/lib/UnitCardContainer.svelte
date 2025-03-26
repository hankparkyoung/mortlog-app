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

<div class="unit-card-container">
  <h3 class="subtitle">{subtitle}</h3>
  {#if units.length === 0}
    <p class="placeholder">{placeholder}</p>
  {/if}
  <div class="units">
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
  .placeholder {
    font-style: italic;
    padding-left: 4px;
  }
  .units {
    display: flex;
    flex-wrap: wrap;
  }
</style>