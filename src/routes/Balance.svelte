<script>
  let hover = false
</script>

<button on:mouseenter={() => (hover = true)} on:mouseleave={() => (hover = false)}>
  {#if hover}
    <span>Hovering</span>
  {:else}
    <span>Not hovering</span>
  {/if}
</button>
