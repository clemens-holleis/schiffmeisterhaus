<script lang="ts">
  import { gsap } from "gsap";
  import { TextPlugin } from "gsap/TextPlugin";

  gsap.registerPlugin(TextPlugin);
  let name = "";
  let email = "";
  let submitted = false;
  let guests = false;
  let guestsCount: number;
  let smile: HTMLImageElement;

  import { tick } from "svelte";

  async function handleSubmit(e) {
    e.preventDefault();
    console.log({ name, email, guests });
    submitted = true;

    await tick(); // wait until DOM updates

    gsap.to("#text", {
      duration: 1,
      text: "Leinen Los!",
      ease: "none",
      onComplete: ()=>{
        smile.src="/sent.svg?" + Math.random()
      }
    });
  }
  
</script>

<div class="container">
  <form class="contact-form" on:submit={handleSubmit}>
    {#if submitted}
      <div class="success-message">
        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" alt="" class="sent" bind:this={smile}/>
        <p id="text"></p>
      </div>
    {:else}
      <h2>Anheuern</h2>
      <div class="form-group">
        <input
          type="text"
          id="name"
          bind:value={name}
          placeholder="Name"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="email"
          id="email"
          bind:value={email}
          placeholder="E-Mail"
          required
        />
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" name="" id="" bind:checked={guests} />
          <span> Ich bringe auch blinde Passagiere mit! </span>
        </label>

        {#if guests}
          <input
            type="number"
            id="guests"
            bind:value={guestsCount}
            min="1"
            max="3"
            required
            placeholder="Anzahl Begleitpersonen"
          />
        {/if}
      </div>
      <button type="submit" class="btn btn-primary">Abschicken</button>
    {/if}
  </form>
</div>

<style>
  input[type="checkbox"] {
    width: 20px;
  }
  .container {
    width: min(70vw, 400px);
    margin: auto;
    margin-bottom: 20vh;
  }
  .contact-form {
    text-align: left;
  }

  .sent {
    width: 150px;
  }
  .form-group {
    margin-bottom: var(--spacing-md);
    position: relative;
    display: block;
  }

  .form-group label {
    display: block;
    font-weight: 500;
    margin-bottom: var(--spacing-xs);
  }

  .form-group input {
    width: 100%;
    padding: 12px;
    border: solid 3px black;
    border-radius: var(--radius-sm);
    font-size: 1rem;
    background: var(--color-surface);
    color: var(--color-text);
  }

  .form-group input:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  .btn {
    display: inline-block;
    padding: 12px 24px;
    border-radius: var(--radius-sm);
    font-weight: 500;
    font-family: var(--font-body);
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .btn-primary {
    background: var(--color-primary);
    color: white;
    border: none;
    width: 100%;
  }

  .btn-primary:hover {
    background: var(--color-accent);
  }

  .success-message {
    text-align: center;
    padding: var(--spacing-lg);
    background: var(--color-surface);
    border-radius: var(--radius-md);
  }

  .success-message p {
    margin: 0;
    color: var(--color-text);
    font-size: 2rem;
    font-weight: 500;
  }

  input {
    font-weight: 400;
    font-style: normal;
    &::placeholder {
      font-family: var(--font-body);
      color: #555;
      transition: color 0.3s ease;
    }

    &:focus {
      &::placeholder {
        color: transparent;
      }
    }
    &[type="checkbox"] {
      width: auto;
      margin-right: 20px;
    }
  }

  label {
    display: inline-flex;
    align-items: center;
  }
</style>
