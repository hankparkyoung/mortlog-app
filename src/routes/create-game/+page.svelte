<script>
  import {
    UnitCardContainer,
    TraitCardContainer,
    GameNotes
  } from '$lib';

  let { data } = $props();
  let { units, breakpoints, encounters } = data;

  let notes = $state('');

  let selectedUnits = $state([]);
  const toggleUnitSelection = unit => {
    const index = selectedUnits.findIndex(selected => (
      selected.unit_id === unit.unit_id
    ));
    if (index === -1) {
      selectedUnits.push(unit);
    } else {
      selectedUnits = selectedUnits.toSpliced(index, 1);
    };
    selectedUnits.sort((a, b) => {
      return a.unit_id - b.unit_id;
    })
  };

  // $inspect(selectedUnits);

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

  // $inspect(allSelectedTraits);

  let activeTraits = $derived.by(() => {
    let result = {};
    Object.keys(allSelectedTraits).forEach(trait_id => {
      let traitBreakpoints = breakpoints.filter(breakpoint => (
        parseInt(trait_id) === breakpoint.trait_id
      ));
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

  // $inspect(activeTraits);

</script>

<h1 class="title">Create Game</h1>

<div class="create-game">
  <div class="row top">
    <div class="column left">
      <UnitCardContainer
        subtitle="Current Units"
        isMini={true}
        placeholder={"Units you select will show up here."}
        units={selectedUnits}
        toggleUnitSelection={toggleUnitSelection}
        selectedUnits={selectedUnits}
      />
    </div>
    <div class="column right">
      <GameNotes
        subtitle={"Game Notes"}
        bind:notes={notes}
      />
    </div>
  </div>
  <div class="row bottom">
    <div class="column left">
      <UnitCardContainer
        subtitle="Select Units"
        isMini={false}
        placeholder={"Units failed to load."}
        units={units}
        toggleUnitSelection={toggleUnitSelection}
        selectedUnits={selectedUnits}
      />
    </div>
    <div class="column right">
      <p>placeholder for other game info selections</p>
    </div>
  </div>
</div>

<style>
  :global(body) {
    background-color: #eeeeee;
    margin: 0;
    padding: 0;
  }
  * {
    all: unset;
    box-sizing: border-box;
  }
  :global(.subtitle) {
    font-size: 20px;
    font-weight: bold;
    line-height: 32px;
    padding-left: 4px;
  }
  .title {
    font-size: 32px;
    font-weight: bolder;
    line-height: 56px;
    padding-left: 8px;
  }
  .create-game {
    border-top: 1px solid black;
    display: flex;
    flex-direction: column;
  }
  .row {
    display: flex;
    padding: 8px;
    width: 100%;
  }
  .top {
    height: 180px;
  }
  .left {
    width: 70%;
  }
  .right {
    width: 30%;
  }
</style>
