<script>
  let { unit, toggleUnitSelection, selectedUnits, isMini } = $props();
  let {unit_id: id, unit_name: name, cost, traits } = unit;
  let isSelected = $derived(
    selectedUnits.some(selected => selected.unit_id === id)
  );
  let cost_style = `unit-cost-${cost}`;
</script>

<div
  class="unit-card"
  class:mini-card={isMini}
>
  <button onclick={() => toggleUnitSelection(unit)}>
    <h3
      class="title {cost_style}"
      class:selected-cost-1={isSelected && unit.cost === 1}
      class:selected-cost-2={isSelected && unit.cost === 2}
      class:selected-cost-3={isSelected && unit.cost === 3}
      class:selected-cost-4={isSelected && unit.cost === 4}
      class:selected-cost-5={isSelected && unit.cost === 5}
    >{name}</h3>
    {#if !isMini}
      <ul>
        {#each traits as trait}
          <li>{trait.trait_name}</li>
        {/each}
      </ul>
    {/if}
  </button>
</div>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  button {
    all: unset;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .unit-card {
    border: 2px solid grey;
    display: block;
    height: 106px;
    margin: 4px;
    width: 140px;
  }
  .unit-card:hover {
    border-color: black;
  }
  .mini-card {
    height: 42px;
  }
  ul {
    display: block;
    list-style: none;
    margin: 4px;
  }
  li {
    margin-right: 12px;
  }
  .unit-cost-1 {
    background-color: #bbbbbb88;
  }
  .selected-cost-1 {
    background-color: #a3a3a3;
  }
  .unit-cost-2 {
    background-color: #14CC7388;
  }
  .selected-cost-2 {
    background-color: #14CC73;
  }
  .unit-cost-3 {
    background-color: #54C3FF88;
  }
  .selected-cost-3 {
    background-color: #54C3FF;
  }
  .unit-cost-4 {
    background-color: #DE0EBD88;
  }
  .selected-cost-4 {
    background-color: #ff42e0;
  }
  .unit-cost-5 {
    background-color: #FFC43088;
  }
  .selected-cost-5 {
    background-color: #FFC430;
  }

  .title {
    padding: 8px;
  }
</style>
