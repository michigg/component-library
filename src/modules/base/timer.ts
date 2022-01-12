import { Ref } from '@vue/reactivity'

// TODO: can be a class
function timer (stateRef: Ref<number>, durationSeconds: number): void {
  let remainingTime = durationSeconds

  stateRef.value = remainingTime
  const countdownId = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(countdownId)
    }
    remainingTime -= 1

    stateRef.value = remainingTime
  }, 1000)
}

export { timer }
