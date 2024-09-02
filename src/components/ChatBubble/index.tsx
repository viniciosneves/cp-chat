import React from 'react';
import styled from 'styled-components';

interface ChatBubbleProps {
    message?: string;
    isSender?: boolean;
}

const Bubble = styled.div<{ $isSender?: boolean }>`
  width: 100%;
  padding: 10px 15px;
  border-radius: 20px;
  margin: 5px 0;
  font-size: 14px;
  color: ${({ $isSender }) => ($isSender ? '#fff' : '#333')};
  background-color: ${({ $isSender }) => ($isSender ? '#007bff' : '#f1f0f0')};
  align-self: ${({ $isSender }) => ($isSender ? 'flex-end' : 'flex-start')};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isSender = false }) => {
    if (!message) {
        return null
    }
    return <Bubble $isSender={isSender}>{message}</Bubble>;
};

export default ChatBubble;