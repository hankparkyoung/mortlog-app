<script>
  let {
    subtitle,
    augmentList,
    selectedAugments,
    placeholders
  } = $props();

  const maxAugments = 5;
</script>

<div class="augment-picker">
  <h3 class="subtitle">{subtitle}</h3>
  {#each { length: 5 } as _, index (index)}
    <div class="row">
      <input
        bind:value={selectedAugments[index].game_stage}
        placeholder="Stage"
        class="input"
      />
      <select
        bind:value={selectedAugments[index].augment}
        class="dropdown"
        class:placeholder={selectedAugments[index].augment === ''}
      >
      <option value='' disabled>{placeholders[index]}</option>
      {#each augmentList as {
        augment_id: id,
        augment_name: name
      } (id)}
        <option value={id}>
          {name}
        </option>
      {/each}
    </select>
    </div>
  {/each}
</div>

<style>
  * {
    all: unset;
    box-sizing: border-box;
  }
  .augment-picker {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }
  .row {
    display: flex;
    height: 29px;
    margin-bottom: 4px;
    margin-left: 4px;
    width: 100%;
  }
  .input {
    background-color: #e4e2e2;
    border: 2px solid grey;
    margin-right: 4px;
    padding: 6px;
    width: 52px;
  }
  .input::placeholder {
    font-style: italic;
  }
  .input:focus {
    background-color: #d3d1d1;
    border-color: black;
    outline: none;
  }
  .dropdown {
    background-color: #e4e2e2;
    border: 2px solid grey;
    padding: 4px;
    width: 100%;
  }
  .dropdown option {
    font-style: normal;
  }
</style>