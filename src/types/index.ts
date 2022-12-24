type TProps = Record<string, any>;

interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string | null;
}

interface SelectedUser {
  id: number;
  display_name: string;
  avatar: string | null;
}

interface Chat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: User,
    time: string;
    content: string;
  }
}

interface CurrentChat {
  id: number;
  title: string;
  avatar: string | null;
  messages: Message[] | [];
  groupChat: boolean;
}

interface Message {
  id: number;
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  }
}

interface StoreInterface {
  isAuth: boolean,
  user: null | User,
  chats: Chat[],
  messages: {[key: string]: Message[]},
  currentChat: null | CurrentChat,
  selectedUser: null | SelectedUser,
  emptyChat: boolean,
}

export {
  TProps,
  StoreInterface,
  Message,
};
