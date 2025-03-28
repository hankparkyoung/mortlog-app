<script>
  let {
    subtitle,
    encounterList,
    encounter: value,
    placeholder
    } = $props();
</script>

<div class="encounter-picker">
  <h3 class="subtitle">{subtitle}</h3>
  <select
    bind:value
    class="dropdown"
  >
    <option value="" disabled>{placeholder}</option>
    {#each encounterList as encounter}
      <option value={encounter.encounter_id}>
        {encounter.encounter_name}
      </option>
    {/each}
  </select>
</div>

<style>
  * {
    all: unset;
    box-sizing: border-box;
  }
  .encounter-picker {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }
  .dropdown {
    border: 2px solid grey;
    padding: 4px;
    width: 100%;
  }
</style>