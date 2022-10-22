import "./index.scss";

export default () => {
  return `
<div class="chat">
    <div class="chat-content">

        <header class="chat-header">

            <div class="chat-header-avatar"></div>
            <p><strong class="chat-header-user">Вадим</strong></p>
            <div class="chat-header-menu">
                <svg class="chat-header-menu-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="9" height="9" viewBox="0 0 512 512"><title>ionicons-v5-f</title><circle cx="256" cy="256" r="48"/><circle cx="256" cy="416" r="48"/><circle cx="256" cy="96" r="48"/></svg>
                <input type="checkbox" />

                <div class="chat-header-menu-dropdown">
                    <ul>
                        <li>Добавить пользователя</li>
                        <li>Удалить пользователя</li>
                    </ul>
                </div>

            </div>

        </header>

        <div class="chat-messages">

            <p class="chat-date">19 июня</p>

            <div class="chat-message receive">
                <p class="chat-message-text">
                    Привет! Смотри, тут всплыл интересный 
                    кусок лунной космической истории — НАСА 
                    в какой-то момент попросила Хассельблад 
                    адаптировать модель SWC для полетов на 
                    Луну. Сейчас мы все знаем что астронавты 
                    летали с моделью 500 EL — и к слову 
                    говоря, все тушки этих камер все еще 
                    находятся на поверхности Луны, так как 
                    астронавты с собой забрали только кассеты 
                    с пленкой.
                </p>
                <p class="chat-message-date">11:56</p>
            </div>

            <div class="chat-message send">
                <p class="chat-message-text">Круто!</p>
                <p class="chat-message-date">12:00</p>
            </div>

        </div>

        <footer class="chat-footer">

            <form class="chat-footer-form">
                <input class="chat-footer-form-input" placeholder="Сообщение" type="text" />
                <button class="chat-footer-form-button" type="submit" title="Отправить сообщение">
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 512 512"><title>ionicons-v5-a</title><polyline points="268 112 412 256 268 400" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"/><line x1="392" y1="256" x2="100" y2="256" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"/></svg>
                </button>
            </form>

        </footer>
    </div>
</div>
    `;
};
