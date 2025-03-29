<script>
  let {
    subtitle,
    hackList,
    selectedHacks,
    placeholder
  } = $props();
</script>

<div class="hack-picker">
  <h3 class="subtitle">{subtitle}</h3>
  <fieldset class="checkboxes">
    {#each hackList as {
      hack_id: id,
      hack_name: name
    } (id)}
      <div class="hack">
        <input
          class="checkbox"
          type="checkbox"
          id={id}
          value={id}
          bind:group={selectedHacks}
        />
        <label
          for={id}
          class="label"
        >{name}</label>
      </div>
    {/each}
  </fieldset>
</div>

<style>
  * {
    all: unset;
    box-sizing: border-box;
  }
  input[type="checkbox"] {
    all: revert;
    box-sizing: border-box;
  }
  .hack-picker {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }
  .checkboxes {
    border: 2px solid grey;
    column-count: 2;
    padding: 2px;
    width: 100%;
  }
  .hack {
    align-items: center;
    display: flex;
    height: 24px;
  }
  .label {
    padding-left: 4px;
  }
</style>