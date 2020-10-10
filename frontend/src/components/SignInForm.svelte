<script>
  import { auth, googleProvider } from "../services/firebase";
  import { getCurrentUser } from "../services/api/users";
  import { authState } from "rxfire/auth";

  export const user = authState(auth);
  let email = "";
  let password = "";
  let displayError;

  function signIn() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        displayError = null;
      })
      .catch((error) => {
        displayError = error.message;
      });
  }

  function signUp() {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        displayError = null;
      })
      .catch((error) => {
        displayError = error.message;
      });
  }

  function signInGoogle() {
    auth
      .signInWithPopup(googleProvider)
      .then(() => {
        displayError = null;
      })
      .catch((error) => {
        displayError = error.message;
      });
  }

  function signOut() {
    auth.signOut();
    displayError = null;
  }

  async function getUserInfo() {
    const response = await getCurrentUser({});
    console.log(response);
  }
</script>

<section>
  {#if $user}
    <button on:click={signOut}>Logout</button>
    <button on:click={getUserInfo}> log user info </button>
  {:else}
    <input bind:value={email} />
    <input type="password" bind:value={password} />
    <button on:click={signIn}> sign in </button>
    <button on:click={signUp}> sign up </button>
    <button on:click={signInGoogle}> google sign in </button>
  {/if}
  {#if displayError != null}
    <p class="error">{displayError}</p>
  {/if}
</section>
