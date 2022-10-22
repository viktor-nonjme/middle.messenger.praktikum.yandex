import MainLayout from "../../layouts/Main/index.template";
import Chat from "../../components/Chat/index.template";
import MessagesList from "../../components/MessagesList/index.template";

function MainChat() {
  return `
        ${MessagesList()}
        ${Chat()}
    `;
}

export default MainLayout(MainChat());
