export default `
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

            {{#each chatMessages}}
                <div id={{ id }}"" class="chat-message {{ type }}">
                    <p class="chat-message-text">
                        {{ text }}
                    </p>
                    <p class="date chat-message-date">{{ date }}</p>
                </div>
            {{/each}}

        </div>

        <footer class="chat-footer">

            {{{ formSendMessage }}}

        </footer>
    </div>
</div>`;
