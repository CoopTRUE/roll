<script>
  import { address } from '$lib/stores'
  let hover = false

  $: shortAddr = $address ? $address.slice(0, 5) + '...' + $address.slice(-3) : ''
</script>

<button on:mouseenter={() => (hover = true)} on:mouseleave={() => (hover = false)}>
  {#if !$address}
    <span>Connect Wallet</span>
  {:else if hover}
    <span>{shortAddr}</span>
  {:else}
    <span>Logout?</span>
  {/if}
</button>

<style>
  button {
    background: #eee;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5em 1em;
    cursor: pointer;
  }
</style>
