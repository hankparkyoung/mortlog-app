<script>
  let { unit } = $props();
  let {unit_name: name, cost, traits } = unit;
</script>

<div class="unit-card">
  <h3>{name}</h3>
  <!-- temporary cost styling -->
  <p>Cost: {cost}</p>
  <ul>
    {#each traits as trait}
      <li>{trait.trait_name}</li>
    {/each}
  </ul>
</div>