<script lang="ts">
  import type { get } from "svelte/store";
  import "../styles/global.css";
  import { onMount } from "svelte";
  let navigation: HTMLDivElement;
  class ScrollHandlerMenu {
    private lastScrollPosition: number = 0;
    private distance: number = 0;
    private storedScrollDirection: "up" | "down" = "down";
    private threshold: number = 50;

    private get currentScrollPosition(): number {
      return window.scrollY;
    }
    private get liveScrollDirection(): "up" | "down" {
      if (this.delta > 0) {
        return "down";
      } else if (this.delta < 0) {
        return "up";
      }
      return this.storedScrollDirection;
    }
    private get delta() {
      const d = this.currentScrollPosition - this.lastScrollPosition;
      return d;
    }

    private get isTriggered(): boolean {
      return Math.abs(this.distance) > this.threshold;
    }

    private addCount() {
      this.distance += this.delta;
    }
    private storePosition() {
      this.lastScrollPosition = this.currentScrollPosition;
    }
    private checkDirection() {
      if (this.storedScrollDirection != this.liveScrollDirection) {
        this.storedScrollDirection = this.liveScrollDirection;
        this.distance = 0;
      }
    }

    get showMenu(): boolean {
      if (this.positionAbsolute) return true;

      this.checkDirection();
      this.addCount();
      this.storePosition();

      return this.isTriggered && this.storedScrollDirection == "up"
        ? true
        : false;
    }
    get positionAbsolute(): boolean {
      return this.currentScrollPosition <= 0;
    }
  }

  onMount(() => {
    const scrollHandler = new ScrollHandlerMenu();

    window.addEventListener("scroll", () => {
      navigation.style.transform = `translateY(${scrollHandler.showMenu ? "0px" : "-100px"})`;
      navigation.style.position = scrollHandler.positionAbsolute
        ? "absolute"
        : "fixed";
    });
  });
</script>

<svelte:head>
  <link
    rel="preload"
    href="/fredmansky-logo-animated-light-1303.svg"
    as="image"
  />
</svelte:head>
<div id="wrapper" bind:this={navigation}>
  <a aria-current="page" href="https://fredmansky.at/">
    <p>Fredmansky</p>
  </a>
</div>

<style>
  #wrapper {
    mix-blend-mode: difference;
    padding-left: 1rem;
    a {
      p {
        margin-top: 1rem;
        margin-left: 1rem;
        font-family: var(--font-heading);
        color: var(--color-surface);
        font-size: 2.1rem;
        background-image: none;
      }
      &:hover {
        p {
          color: transparent;
          background-image: url("/fredmansky-logo-animated-light-1303.svg");
          background-repeat: no-repeat;
          background-size: contain;
        }
      }
    }
    transform: translateY(-20px);
    transition: all 0.2s;
    position: fixed;
    top: 0px;
    left: 0px;
  }
</style>
