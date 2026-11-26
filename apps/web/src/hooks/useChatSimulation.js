import { useCallback, useEffect, useRef, useState } from 'react'
import { defaultResponse, initialMessages, simulatedResponses } from '../data/bot.data'
export default function useChatSimulation() {
  const [messages, setMessages] = useState(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const timer = useRef(null)
  const busy = useRef(false)
  useEffect(() => () => clearTimeout(timer.current), [])
  const sendMessage = useCallback(text => {
    const content = text.trim()
    if (!content || busy.current) return false
    busy.current = true
    setMessages(previous => [...previous, { sender: 'user', text: content }])
    setIsTyping(true)
    timer.current = setTimeout(() => {
      const normalized = content.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      const match = Object.entries(simulatedResponses).find(([word]) => normalized.includes(word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')))
      setMessages(previous => [...previous, { sender: 'bot', text: match?.[1] || defaultResponse }])
      busy.current = false
      setIsTyping(false)
    }, 1500)
    return true
  }, [])
  return { messages, isTyping, sendMessage }
}
