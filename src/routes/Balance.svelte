<script lang="ts">
  import { cuid, balance } from '$lib/stores'
  import { fade, fly } from 'svelte/transition'
  import { quadOut } from 'svelte/easing'
  import BalanceModal from './BalanceModal.svelte'

  let modalOpen = false
</script>

{#if $cuid}
  <div
    class="container"
    in:fly={{ x: 0, y: -100, duration: 600, easing: quadOut }}
    out:fade={{ duration: 600, easing: quadOut }}
  >
    <p class="balance">${$balance}</p>
    <button class="manage" on:click={() => (modalOpen = true)}>Manage</button>
  </div>
{/if}

{#if modalOpen}
  <BalanceModal on:close={() => (modalOpen = false)} />
{/if}

<style>
  .container {
    display: flex;
    place-items: center;
    border: 2px solid #d0d5dd;
    border-radius: 8px;
    font-weight: 600;
    overflow: hidden;
  }
  .balance {
    padding: 0.7em 0.8em;
  }
  .manage {
    background: none;
    border: none;
    background: var(--color-background);
    padding: 0.7em 0.8em;
    color: white;
    cursor: pointer;
  }
  .modal {
    position: absolute;
    place-self: center;
  }
</style>
