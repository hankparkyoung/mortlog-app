<script>
  import {
    UnitCardContainer,
    TraitCardContainer,
    GameNotes,
    EncounterPicker,
    HackPicker,
    AugmentPicker
  } from '$lib';

  let { data } = $props();
  let {
    units,
    breakpoints,
    encounters,
    hacks,
    augments
  } = data;
  const patch = "PBE"; // change this per patch

  let notes = $state('');
  let encounter = $state('');
  let selectedHacks = $state([]);
  let selectedUnits = $state([]);
  let selectedAugments = $state(
    Array.from({ length: 5 }, () => ({ game_stage: '', augment: '' }))
  );
  let augmentPlaceholders = [
    "Pick your 1st Augment.",
    "Pick your 2nd Augment.",
    "Pick your 3rd Augment.",
    "Pick your 4th Augment. (optional)",
    "Pick your 5th Augment. (optional)"
  ];

  const toggleUnitSelection = unit => {
    const maxTeamSize = 12;
    const index = selectedUnits.findIndex(selected => (
      selected.unit_id === unit.unit_id
    ));
    if (selectedUnits.length < maxTeamSize) {
      if (index === -1) {
        selectedUnits.push(unit);
      } else {
        selectedUnits = selectedUnits.toSpliced(index, 1);
      };
      selectedUnits.sort((a, b) => {
        return a.unit_id - b.unit_id;
      });
    } else {
      if (index !== -1) {
        selectedUnits = selectedUnits.toSpliced(index, 1);
      }
    };
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

<div class="create-game">
  <div class="heading">
    <p class="title">Create Game</p>
    <p class="patch">{patch}</p>
  </div>
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
      <TraitCardContainer
        subtitle="Active Traits"
        placeholder="Activated traits will show up here."
        traits={activeTraits}
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
      <EncounterPicker
        subtitle="Select Encounter"
        encounterList={encounters}
        bind:encounter={encounter}
        placeholder="Pick your encounter."
      />
      <HackPicker
        subtitle="Select Hacks"
        hackList={hacks}
        bind:selectedHacks={selectedHacks}
        placeholder="Pick your hacks."
      />
      <AugmentPicker
        subtitle="Select Augments"
        augmentList={augments}
        bind:selectedAugments={selectedAugments}
        placeholders={augmentPlaceholders}
      />
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
  :global(.placeholder) {
    font-style: italic;
    padding-left: 4px;
  }
  .heading {
    display: flex;
    justify-content: space-between;
    width: 1135px;
  }
  .title, .patch {
    font-size: 32px;
    font-weight: bolder;
    line-height: 56px;
    padding: 8px;
  }
  .create-game {
    align-items: center;
    border-top: 1px solid black;
    display: flex;
    flex-direction: column;
  }
  .row {
    border-top: 1px solid black;
    display: flex;
    padding: 8px;
  }
  .top {
    height: 260px;
  }
  .column {
    display: flex;
    flex-direction: column;
  }
  .left {
    width: 784px;
  }
  .right {
    width: 335px;
  }
</style>
