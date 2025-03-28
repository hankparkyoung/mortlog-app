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
    {#each hackList as hack}
      <div class="hack">
        <input
          class="checkbox"
          type="checkbox"
          id={hack.hack_id}
          value={hack.hack_id}
          bind:group={selectedHacks}
        />
        <label
          for={hack.hack_id}
          class="label"
        >{hack.hack_name}</label>
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