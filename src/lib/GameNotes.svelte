<script>
  let { subtitle, notes: value } = $props();
  // let { notes } = $state('');
</script>

<div class="game-notes">
  <h3 class="subtitle">{subtitle}</h3>
  <textarea
    class="input"
    placeholder="Write your notes here."
    bind:value
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
    height: 120px;
    padding: 8px;
    text-align: top;
    width: 100%;
  }
  .input:focus {
    background-color: #d3d1d1;
    border-color: black;
    outline: none;
  }
</style>