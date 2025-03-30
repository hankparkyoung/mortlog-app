<script>
  const {
    unit,
    toggleUnitSelection,
    selectedUnits,
    isMini
  } = $props();

  const {
    unit_id: id,
    unit_name: name,
    cost,
    traits
  } = unit;

  const isSelected = $derived(
    selectedUnits.some(selected => selected.unit_id === id)
  );
  const styleByCost = `cost-${cost}`;
  const styleBySelected = $derived.by(() => {
    const style = !isMini && isSelected
      ? `cost-${cost}--selected`
      : ''
    return style;
  });
</script>

<button
  class="unit-card"
  class:mini={isMini}
  onclick={() => toggleUnitSelection(unit)}
>
  <h3
    class={`name ${styleByCost} ${styleBySelected}`}
    class:name-mini={isMini}
  >{name}</h3>
  {#if !isMini}
    <ul class="traits">
      {#each traits as trait}
        <li>{trait.trait_name}</li>
      {/each}
    </ul>
  {/if}
</button>

<style>
  * {
    all: unset;
    box-sizing: border-box;
  }
  ul {
    display: block;
    list-style: none;
  }

  .unit-card {
    border: 2px solid grey;
    display: flex;
    flex-direction: column;
    height: 72px;
    margin: 4px;
    width: 88px;
  }
  .mini {
    height: 26px;
  }
  .unit-card:hover, .mini:hover {
    border-color: black;
  }

  .name {
    font-size: 14px;
    font-weight: bold;
    line-height: 22px;
    padding-left: 4px;
    width: 100%;
  }
  .name-mini {
    font-weight: normal;
    padding-top: 1px;
  }
  .cost-1 {
    background-color: #bbbbbb88;
  }
  .cost-1--selected {
    background-color: #a3a3a3;
  }
  .cost-2 {
    background-color: #14CC7388;
  }
  .cost-2--selected {
    background-color: #14CC73;
  }
  .cost-3 {
    background-color: #54C3FF88;
  }
  .cost-3--selected {
    background-color: #54C3FF;
  }
  .cost-4 {
    background-color: #DE0EBD66;
  }
  .cost-4--selected {
    background-color: #DE0EBDAA;
  }
  .cost-5 {
    background-color: #FFC43088;
  }
  .cost-5--selected {
    background-color: #FFC430FF;
  }

  .traits {
    display: flex;
    flex-direction: column;
    font-size: 11px;
    margin-top: 4px;
    padding-left: 4px;
  }
</style>
