<script>
  import SignInForm from "../components/SignInForm.svelte";
  import EmptyPopup from "../components/popups/EmptyPopup.svelte";
  let emptyPopupChild;
</script>

<style>
  /* your styles go here */
</style>

<h1>Home</h1>
<SignInForm />
<button on:click={emptyPopupChild.openPopup()}>Popup</button>
<EmptyPopup bind:this={emptyPopupChild} />
