import { ref } from 'vue'
import { Ref } from '@vue/reactivity'

export function useSocketConnectionState (socket: any): { isConnected: Ref<boolean>, socketId: Ref<string> } {
  const isConnected = ref<boolean>(false)
  const socketId = ref<string>('')

  socket.on('connect', () => {
    console.info(`RECEIVED: CONNECT: ${socket.id}`)
    isConnected.value = true
    socketId.value = socket.id
  })
  socket.on('disconnect', () => {
    console.info('RECEIVED: DISCONNECT')
    isConnected.value = false
    socketId.value = ''
  })

  return {
    isConnected,
    socketId
  }
}
