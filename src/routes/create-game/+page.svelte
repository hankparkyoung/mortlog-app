<script>
  import UnitCardContainer from '$lib/UnitCardContainer.svelte';
  import TraitCardContainer from '$lib/TraitCardContainer.svelte';

  let { data } = $props();
  let { units, breakpoints, encounters } = data;

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
  <div class="column">
    <UnitCardContainer
      title="Select Units"
      isMini={false}
      placeholder={"Units failed to load."}
      units={units}
      toggleUnitSelection={toggleUnitSelection}
      selectedUnits={selectedUnits}
    />
  </div>
  <div class="column">
    <UnitCardContainer
      title="Current Units"
      isMini={true}
      placeholder={"Units you select will show up here."}
      units={selectedUnits}
      toggleUnitSelection={toggleUnitSelection}
      selectedUnits={selectedUnits}
    />
    <TraitCardContainer
      title="Active Traits"
      placeholder={"Activated traits will show up here."}
      traits={activeTraits}
    />
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
  .title {
    font-size: 32px;
    font-weight: bolder;
    line-height: 56px;
    padding-left: 8px;
  }
  .create-game {
    border-top: 1px solid black;
    display: flex;
  }
  .column {
    padding: 8px;
    width: 50%;
  }
</style>
