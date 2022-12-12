<script>
  import Balance from './Balance.svelte'
  import Wallet from './Wallet.svelte'
</script>

<header>
  <img src="/images/logo.svg" alt="Logo" width="42" height="42" />
  <Balance />
  <Wallet />
</header>

<style>
  header {
    display: flex;
    align-items: center;
    padding: 1em;
    justify-content: space-between;
    border-bottom: 2px solid var(--color-border-secondary);
  }
</style>
