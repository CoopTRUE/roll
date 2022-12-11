<script lang="ts">
  import { balance, cuid } from '$lib/stores'
  import { fade, fly } from 'svelte/transition'
  import { quadOut } from 'svelte/easing'
  import { createEventDispatcher } from 'svelte'

  const dispach = createEventDispatcher()
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && dispach('close')} />
<div class="wrapper" transition:fade={{ duration: 400, easing: quadOut }}>
  <div class="modal">
    <button class="close" on:click={() => dispach('close')}>X</button>
    <h2 class="wallet">Wallet</h2>
    <h3 class="info">Make a deposit or withdraw your rewards</h3>
    <h2 class="deposit">Deposit Amount</h2>
    <input type="number" />
    <h2 class="total">Total After Processing <span>Gas + fes</span></h2>
    <input type="number" />
    <div class="actions">
      <button>Deposit</button>
      <button>Withdraw</button>
    </div>
  </div>
</div>

<style lang="scss">
  .wrapper {
    display: grid;
    position: absolute;
    place-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(52, 64, 84, 0.7);
    backdrop-filter: blur(8px);
    z-index: 100;
  }
  .modal {
    background: white;
    padding: 1em;
    border-radius: 12px;
  }
  .close {
    background: none;
    border: none;
    font-size: 1.5em;
    font-weight: 600;
    color: var(--color-secondary);
    cursor: pointer;
    float: right;
  }
  .wallet {
    font-size: 1.5em;
    font-weight: 600;
    margin-bottom: 0.3em;
  }
  .info {
    font-size: 0.9em;
    color: var(--color-secondary);
    margin-bottom: 1.5em;
  }
</style>
