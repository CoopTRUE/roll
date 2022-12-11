<script lang="ts">
  import type { TransitionConfig } from 'svelte/transition'
  import { address, provider, cuid } from '$lib/stores'
  import { SIG_MESSAGE } from '$lib/constants'
  import { ethers } from 'ethers'
  import axios from 'axios'

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
    if (hover) {
      $address = null
      $provider = null
    }
  }
  async function signMessage(provider: ethers.providers.Web3Provider, address: string) {
    return await provider.getSigner().signMessage(SIG_MESSAGE.replace('{address}', address))
  }
  async function metamask() {
    try {
      const _provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
      const _address = await _provider.getSigner().getAddress()
      const _signature = await signMessage(_provider, _address)
      console.log(_address)
      const post = await axios.post('/api/login', {
        address: _address,
        signature:
          '0x5d8ce286dbba22a57d413dc3ef4b61dbdb612a8849744082b13a864a4d515ec93190adeff2e96b4e8f6e69c660afdc585bb8255f3e7c50fa37e156abe7801f1f1c'
      })
      $provider = _provider
      $address = _address
      $cuid = post.data
    } catch (e) {
      console.log(e)
    } finally {
      hover = false
    }
  }
  function walletconnect() {
    alert('Not implemented yet')
    // const walletConnectProvider = new WalletConnectProvider({})
    // walletConnectProvider
    //   .enable()
    //   .then((_address) => {
    //     $providerStore = new ethers.providers.Web3Provider(walletConnectProvider, 'any')
    //     $address = _address[0]
    //     hover = false
    //   })
    //   .catch(() => (hover = false))
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
      <span>Logout?</span>
    {:else}
      <span>{shortAddr}</span>
    {/if}
  </button>
  {#if dropdown}
    <div
      class="dropdown"
      transition:slideOut
      on:mouseenter={() => $address || (hover = true)}
      on:mouseleave={() => $address || (hover = false)}
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
    cursor: pointer;
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
