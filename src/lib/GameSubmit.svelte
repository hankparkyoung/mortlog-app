<script>
  let {
    subtitle,
    isReady,
    onSubmit,
    isSubmitting,
    errorMessage
  } = $props();
</script>

<div class="game-submit">
  <h3 class="subtitle">{subtitle}</h3>
  <button
    class="button"
    class:not-ready={!isReady}
    type="button"
    onclick={onSubmit}
    disabled={isSubmitting || !isReady}
  >{isSubmitting ? 'Saving ...' : 'Save Game'}</button>
</div>

<style>
  * {
    all: unset;
    box-sizing: border-box;
  }
  .game-submit {
    display: flex;
    flex-direction: column;
  }
  .button {
    background-color: #ff494988;
    border: 2px solid grey;
    height: 32px;
    margin: 4px;
    padding: 4px;
    width: 120px;
  }
  .not-ready {
    background-color: darkgrey;
  }
  .button:hover {
    border-color: black;
  }
  .not-ready:hover {
    border-color: grey;
  }
</style>