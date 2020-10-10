<script>
  export let callback;

  let showPopup = false;

  function forceClosePopup() {
    showPopup = false;
  }

  export function openPopup() {
    showPopup = true;
  }

  async function submit() {
    showPopup = false;
    if (typeof callback === "function") {
      callback();
    }
  }
</script>

<style>
</style>

{#if showPopup}
  <div class="popup-screen" on:click={forceClosePopup} />
  <div class="popup">
    <p class="title">Example Popup</p>
    <button on:click={submit}>Close Popup</button>
  </div>
{/if}
