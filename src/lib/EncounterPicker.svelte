<script>
  let {
    subtitle,
    encounterList,
    encounter = $bindable(),
    placeholder
    } = $props();
</script>

<div class="encounter-picker">
  <h3 class="subtitle">{subtitle}</h3>
  <select
    bind:value={encounter}
    class="dropdown"
    class:placeholder={encounter === ''}
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
    background-color: #e4e2e2;
    border: 2px solid grey;
    margin-left: 4px;
    padding: 4px;
    width: 100%;
  }
  .dropdown option {
    font-style: normal;
  }
</style>