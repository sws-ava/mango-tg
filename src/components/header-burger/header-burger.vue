<template>
    <div
      class="burgerToggle"
      @click="clickBurgerHandler"
    >
      <svg
        class="ham hamRotate ham8" viewBox="0 0 100 100"
        width="50" height="50"
      >
        <path class="line top"
              d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"></path>
        <path class="line middle" d="m 30,50 h 40"></path>
        <path class="line bottom"
              d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"></path>
      </svg>
    </div>
</template>

<script setup lang="ts">


const clickBurgerHandler = () => {
  document.body.className = 'show-left-navigation';
}

</script>

<style scoped lang="scss">

.burgerToggle {
  display: block;
  height: 50px;
  width: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 5px;
  top: calc(var(--header-height) + 4px);
  background: #000;
  border-radius: 50%;
}

@media (min-width: 767px) {
  .burgerToggle {
    //display: none;
  }
}

.ham {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}


.show-left-navigation {
  .hamRotate {
    transform: rotate(45deg);
  }

  .ham8 .top {
    stroke-dashoffset: -64px;
  }

  .ham8 .middle {
    transform: rotate(90deg);
  }

  .ham8 .bottom {
    stroke-dashoffset: -64px;
  }
}


.line {
  fill: none;
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
  stroke: #fff;
  stroke-width: 4;
  stroke-linecap: round;
}

.ham8 {
  z-index: 99;
  position: relative;

  & .top {
    stroke-dasharray: 40 160;
  }

  & .middle {
    stroke-dasharray: 40 142;
    transform-origin: 50%;
    transition: transform 400ms;
  }

  & .bottom {
    stroke-dasharray: 40 85;
    transform-origin: 50%;
    transition: transform 400ms, stroke-dashoffset 400ms;
  }

}


</style>