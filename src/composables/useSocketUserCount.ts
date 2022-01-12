import { ref } from 'vue'
import { Ref } from '@vue/reactivity'

export function useSocketUserCount (socket: any): { userCount: Ref<number> } {
  const userCount = ref<number>(0)
  socket.on('user_count', (count: number) => {
    console.info(`RECEIVED: USER COUNT: UPDATE: ${count}`)
    userCount.value = count
  })
  return { userCount }
}
