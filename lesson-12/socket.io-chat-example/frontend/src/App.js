import SigninChatForm from "./components/SigninChatForm/SigninChatForm";
import ChatForm from "./components/ChatForm/ChatForm";
import Chat from "./components/Chat/Chat";
import { useCallback, useEffect, useState } from "react";
import io from 'socket.io-client'
import { nanoid } from 'nanoid'

const socket = io.connect('http://localhost:4020')

function App() {
  const [nickname, setNickname] = useState("")
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on('user-message', (data) => {
      setMessages(prevMessages => {
        const { message, nickname } = JSON.parse(data)

        const newMessage = {
          id: nanoid(),
          type: 'user',
          nickname,
          message
        }

        return [newMessage, ...prevMessages]
      })
    })
  }, [])

  const addNickname = useCallback(({ nickname }) => setNickname(nickname), [])

  const addMessage = useCallback(({ message }) => {
    setMessages(prevMessages => {
      const newMessage = {
        type: 'you',
        nickname,
        message,
        id: nanoid()
      }

      return [...prevMessages, newMessage]
    })

    socket.emit('user-message', JSON.stringify({ message, nickname }))
  }, [nickname])

  return (
    <div className="App">
      {!nickname && < SigninChatForm onSubmit={addNickname} />}
      {nickname && <ChatForm onSubmit={addMessage} />}
      {nickname && <Chat items={messages} />}
    </div>
  )
}

export default App;
