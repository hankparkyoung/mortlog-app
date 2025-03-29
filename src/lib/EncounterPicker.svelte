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
    class:placeholder={value === ''}
  >
    <option value="" disabled>{placeholder}</option>
    {#each encounterList as {
      encounter_id: id,
      encounter_name: name
    } (id)}
      <option value={id}>
        {name}
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
  .dropdown option {
    font-style: normal;
  }
</style>