import ChatFeed from './messenger/ChatFeed';
import { ChatEngine} from "react-chat-engine";
import "./Messenger.css";
import LoginForm from './messenger/LoginForm'; 
import WebNavbar from "../Navbar/Navbar";
import { Container, Row, Col } from 'reactstrap';
import Homebtn from './messenger/Homebtn'
import { Button } from "reactstrap";

const projectID = 'db336757-f2cc-4004-8a8d-85d4069e021f';
const Messenger = () => {
  if (!localStorage.getItem('username')) return <LoginForm />;
  return (
    <>
    {/* <WebNavbar /> */}
 
    <ChatEngine 
    
     
      height="95vh"
      projectID="db336757-f2cc-4004-8a8d-85d4069e021f"
      userName="Esraa"
      userSecret="1234567Aa"
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />

    </>
  );
};
export default Messenger;


