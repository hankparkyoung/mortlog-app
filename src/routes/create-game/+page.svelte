<script>

  // --- IMPORTS and DATA --- //
  import {
    AugmentPicker,
    EncounterPicker,
    GameNotes,
    GameSubmit,
    HackPicker,
    TraitCardContainer,
    UnitCardContainer
  } from '$lib';
  let { data } = $props();
  let {
    units,
    breakpoints,
    encounters,
    hacks,
    augments
  } = data;

  // --- STATE (to be submitted) --- //
  const patch = "TEST"; // change this per patch
  let selectedUnits = $state([]);
  let encounter = $state('');
  let selectedAugments = $state(
    Array.from({ length: 5 }, () => ({ game_stage: '', augment: '' }))
  );
  let selectedHacks = $state([]);
  let notes = $state('');

  // --- DERIVING STATE and others --- //
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
  });
  let isReadyToSubmit = $derived.by(() => {
    const hasUnits = selectedUnits.length > 0;
    const hasTraits = Object.keys(activeTraits).length > 0;
    const hasEncounter = !!encounter;
    const hasAugments = selectedAugments
      .slice(0, 3).every(aug => aug.augment && aug.game_stage);
    const hasHacks = selectedHacks.length > 0;
    const hasNotes = notes !== '';
    return hasUnits
      && hasTraits
      && hasEncounter
      && hasAugments
      && hasHacks
      && hasNotes;
  });

  // --- SUBMITTING --- //
  let isSubmitting = $state(false);
  let errorMessage = $state('');

  const submitGame = async () => {
    if (isSubmitting) return; // prevents double clicks

    isSubmitting = true;
    errorMessage = '';
    console.log('Attempting to submit game...');

    const gamePayload = {
      patch: patch,
      notes: notes,
      encounter_id: encounter,
      unit_ids: selectedUnits.map(unit => unit.unit_id),
      hack_ids: selectedHacks,
      augments: selectedAugments
        .filter(augment => augment.augment)
        .map(augment => ({
          game_stage: augment.game_stage,
          augment_id: augment.augment
        })),
    };
    console.log('Submitting Payload:', JSON.stringify(gamePayload, null, 2));

    try {
      const response = await fetch('api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gamePayload)
      });
      console.log('Received Response Status:', response.status);

      if (!response.ok) {
        let errorData = { message: `HTTP error! Status: ${response.status}` };
        try {
          errorData = await response.json();
          console.error('Backend Error Response:', errorData);
        } catch (jsonError) {
          console.error('Non-JSON Backend Error Response. Status:', response.status);
        };
        throw new Error(errorData.error || errorData.message);
      };

      const result = await response.json();
      console.log('Game submitted successfully:', result);

      notes = '';
      encounter = '';
      selectedHacks = [];
      selectedUnits = [];
      selectedAugments = Array.from({ length: 5 }, () => ({ game_stage: '', augment: '' }));
    } catch (error) {
      console.error('Failed to submit game:', error);
    } finally {
      isSubmitting = false;
    }
  };

  // --- CONTENT (ie placeholders) --- //
  const augmentPlaceholders = [
    "Pick your 1st Augment.",
    "Pick your 2nd Augment.",
    "Pick your 3rd Augment.",
    "Pick your 4th Augment. (optional)",
    "Pick your 5th Augment. (optional)"
  ];

</script>

<div class="create-game">
  <div class="heading">
    <p class="title">Create Game</p>
    <p class="patch">{patch}</p>
  </div>
  <div class="row top">
    <div class="column third">
      <UnitCardContainer
        subtitle="Current Units"
        isMini={true}
        placeholder="Units you select will show up here."
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
    <div class="column third">
      <EncounterPicker
        subtitle="Select Encounter"
        encounterList={encounters}
        bind:encounter={encounter}
        placeholder="Pick your encounter."
      />
      <AugmentPicker
        subtitle="Select Augments"
        augmentList={augments}
        bind:selectedAugments={selectedAugments}
        placeholders={augmentPlaceholders}
      />
    </div>
    <div class="column third">
      <HackPicker
        subtitle="Select Hacks"
        hackList={hacks}
        bind:selectedHacks={selectedHacks}
        placeholder="Pick your hacks."
      />
    </div>
  </div>
  <div class="row bottom">
    <div class="column left">
      <UnitCardContainer
        subtitle="Select Units"
        isMini={false}
        placeholder="Units failed to load."
        units={units}
        toggleUnitSelection={toggleUnitSelection}
        selectedUnits={selectedUnits}
      />
    </div>
    <div class="column right">
      <GameNotes
        subtitle="Game Notes"
        bind:notes={notes}
      />
      <GameSubmit
        subtitle="Submit Game"
        isReady={isReadyToSubmit}
        onSubmit={submitGame}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
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
    width: 1135px;
  }
  .top {
    display: flex;
    justify-content: space-between;
  }
  .column {
    display: flex;
    flex-direction: column;
  }
  .left {
    width: 784px;
  }
  .third {
    width: 335px;
  }
  .right {
    width: 335px;
  }
</style>
