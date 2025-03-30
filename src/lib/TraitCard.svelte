<script>
  const { trait } = $props();
  const {
    trait_name: name,
    breakpoint_value: breakpoint,
    breakpoint_tier: tier
  } = trait;

  const styleByBreakpoint = `breakpoint--${tier}`
</script>

<div class={`trait-card ${styleByBreakpoint}`}>
  <p class="trait">
    {name}
  </p>
  <p class="breakpoint">
    {breakpoint}
  </p>
</div>

<style>
  * {
    all: unset;
    box-sizing: border-box;
  }
  .trait-card {
    align-items: center;
    border-radius: 4px;
    display: flex;
    font-size: 12px;
    height: 22px;
    justify-content: space-between;
    margin: 4px;
    width: 88px;
  }
  .breakpoint--bronze {
    background-color: #99571477
  }
  .breakpoint--silver {
    background-color: #86868666;
  }
  .breakpoint--gold {
    background-color: #ffae0088;
  }
  .breakpoint--prismatic {
    background-color: blue;
  }
  .breakpoint--unique {
    background-color: #ff494988;
  }
   .trait {
    padding-left: 4px;
   }
   .breakpoint {
    padding-right: 3px;
   }
</style>