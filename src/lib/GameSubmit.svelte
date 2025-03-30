<script>
  let {
    subtitle,
    gamePayload,
    onSubmit,
    isSubmitting,
    errorMessage
  } = $props();
</script>

<div class="game-submit">
  <h3 class="subtitle">{subtitle}</h3>
  <button
    type="button"
    onclick={onSubmit}
    disabled={isSubmitting}
  >{isSubmitting ? 'Saving ...' : 'Save Game'}</button>
  <p class="payload-log">
    {gamePayload}
  </p>
</div>