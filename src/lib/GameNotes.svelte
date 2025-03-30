<script>
  let { subtitle, notes = $bindable() } = $props();
</script>

<div class="game-notes">
  <h3 class="subtitle">{subtitle}</h3>
  <textarea
    class="input"
    placeholder="Write your notes here."
    bind:value={notes}
  ></textarea>
</div>

<style>
  * {
    all: unset;
    box-sizing: border-box;
  }
  .game-notes {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }
  .input {
    background-color: #e4e2e2;
    border: 2px solid grey;
    height: 360px;
    margin: 4px;
    padding: 4px;
    width: 100%;
  }
  .input::placeholder {
    font-style: italic;
  }
  .input:focus {
    background-color: #d3d1d1;
    border-color: black;
    outline: none;
  }
</style>