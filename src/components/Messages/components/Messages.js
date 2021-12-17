import React, { useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import useSound from 'use-sound';
import config from '../../../config';
import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages';
import TypingMessage from './TypingMessage';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import '../styles/_messages.scss';
import initialBottyMessage from '../../../common/constants/initialBottyMessage';

const socket = io(
  config.BOT_SERVER_ENDPOINT,
  { transports: ['websocket', 'polling', 'flashsocket'] }
);

function Messages() {
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { setLatestMessage } = useContext(LatestMessagesContext);

  // My Logic
  const [isTyping, setIsTyping] = useState(true)
  const [message, setMessage] = useState('')
  const [sentMessage, setSentMessage] = useState([])

  // useEffect(() => {

  //   if(message.length > 0){
  //       setIsTyping(false)

  //   }
    
  // }, [message])

  const onChangeMessage = (e) => {
    const bottyMessage = e.target.value
    setMessage(bottyMessage)
    
  }
  
  const sendMessage = (e) => {
    setSentMessage(sentMessage => [...sentMessage, message]);
    setMessage('')
    
  }


  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
        <div>{initialBottyMessage}</div>
        <div>{sentMessage}</div>
        {/* {TypingMessage()}  */}
      </div>
      <Footer message={message} sendMessage={sendMessage} onChangeMessage={onChangeMessage}/>
    </div>
  );
}

export default Messages;
