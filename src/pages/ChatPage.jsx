
import { Navigate } from "react-router-dom";
import ChatGeneral from "../components/chat/ChatGeneral";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const ChatPage = () => {
    const { userAccess, loading } = useContext(UserContext);

    if(loading) return <h1>loading.....</h1>
    if (!userAccess) return <Navigate to="/" />;
  return (
    <div>
        <ChatGeneral/>
    </div>
  )
}

export default ChatPage