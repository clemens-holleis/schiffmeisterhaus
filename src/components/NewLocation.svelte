<script lang="ts">
  import "../styles/global.css";
  import { gsap } from "gsap";
  import { onMount, onDestroy } from "svelte";
  import { isMobileDevice } from "../utils/utils";

  let container: HTMLDivElement;

  let xSetter: (value: number) => void;
  let ySetter: (value: number) => void;

  function handleMove(e: MouseEvent) {
    const rect = container.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // convert back to viewport coordinates (because flair is fixed)
    xSetter(rect.left + x);
    ySetter(rect.top + y);
  }

  function handleEnter() {
    gsap.to("#flair", { autoAlpha: 1, duration: 0.2 });
  }

  function handleLeave() {
    gsap.to("#flair", { autoAlpha: 0, duration: 0.2 });
  }

  onMount(() => {
    if (isMobileDevice()) {
      return;
    }
    document.querySelector("#flairMobile").style.display = "none";
    Array.from(container.getElementsByTagName("a")).forEach((element) => {
      element.addEventListener("mouseenter", handleLeave);
      element.addEventListener("mouseleave", handleEnter);
      element.addEventListener("mousemove", handleMove);
    });

    gsap.set("#flair", {
      xPercent: -50,
      yPercent: -50,
      autoAlpha: 0,
    });

    xSetter = gsap.quickSetter("#flair", "x", "px");
    ySetter = gsap.quickSetter("#flair", "y", "px");

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);
  });

  onDestroy(() => {
    container?.removeEventListener("mousemove", handleMove);
    container?.removeEventListener("mouseenter", handleEnter);
    container?.removeEventListener("mouseleave", handleLeave);
  });
</script>

<div bind:this={container} class="container">
  <h2>Ahoi!</h2>
  <p>
    Wir sind übersiedelt. Ihr findet uns jetzt im <a
      href="https://maps.app.goo.gl/2AzLV5BXebEjqALcA"
      target="_blank">Schiffmeisterhaus</a
    >.
    <br />
    Der Käptn hat Laune! Kommt an Bord und feiert mit.
    <br>
    Stapellauf ist am 01.05.1026 ab 16:00 Uhr.
  </p>
  <img id="flair" src="/jack.gif" alt="flair" />
  <img id="flairMobile" src="/jack.gif" />
</div>

<style>
  a {
    text-decoration: underline;
    color: var(--color-text);
  }
  a:hover {
    color: var(--color-accent);
  }
  h2,
  p {
    font-size: 2rem;
  }
  .container {
    height: 50vh;
    padding-left: 5vw;
    padding-right: 5vw;
    background-color: var(--color-surface);
    color: var(--color-text);

    margin-bottom: 40vh;
    margin-bottom: 40vh;
  }

  #flair {
    width: 200px;
    height: 200px;
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    background-color: antiquewhite;
    opacity: 0;
  }
</style>
