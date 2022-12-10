<script lang="ts">
  import { address } from '$lib/stores'
  import type { TransitionConfig } from 'svelte/transition'

  function slideOut(node: HTMLElement): TransitionConfig {
    return {
      duration: 500,
      css: (t) => `
        height: ${t * 10}em;
      `
    }
  }

  let hover = false
  $: dropdown = !$address && hover
  $: shortAddr = $address ? $address.slice(0, 5) + '...' + $address.slice(-3) : ''

  function click() {
    if (!address) return

    // if (!$address) {
    //   dropdown = true
    // } else {
    // }
  }
  function metamask() {
    alert('connect to metamask')
  }
  function walletconnect() {
    alert('connect to walletconnect')
  }
</script>

<div class="wrapper">
  <button
    class="main-btn"
    on:mouseenter={() => (hover = true)}
    on:mouseleave={() => (hover = false)}
    on:click={click}
  >
    {#if !$address}
      <span>Connect Wallet</span>
    {:else if hover}
      <span>{shortAddr}</span>
    {:else}
      <span>Logout?</span>
    {/if}
  </button>
  {#if dropdown}
    <div
      class="dropdown"
      transition:slideOut
      on:mouseenter={() => (hover = true)}
      on:mouseleave={() => (hover = false)}
    >
      <button on:click={metamask}><img src="/images/metamask.svg" alt="" /></button>
      <button on:click={walletconnect}><img src="/images/walletconnect.svg" alt="" /></button>
    </div>
  {/if}
</div>

<style lang="scss">
  .wrapper {
    display: grid;
    place-items: center;
    border-radius: 8px;
    background-color: var(--color-primary);
    font-weight: 600;
    position: relative;
  }
  .main-btn {
    padding: 1em;
  }
  button {
    background-color: transparent;
    border: none;
    color: white;
  }
  .dropdown {
    top: calc(100% - 0.7em);
    padding-top: 0.7em;
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: center;
    height: 10em;
    gap: 1em;
    background-color: var(--color-primary);
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
  }
  img {
    height: 4em;
    object-fit: contain;
  }
</style>
