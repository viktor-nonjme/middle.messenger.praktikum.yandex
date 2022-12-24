export default `
<div class="chat">

        {{#if currentChat}}
            <div class="chat-content">

                <header class="chat-header">

                    <div class="chat-header-avatar">
                        <img src="{{#if currentChat.avatar}}{{ baseUrl }}{{ currentChat.avatar }}{{else}}{{ defaultAvatar }}{{/if}}" />
                    </div>
                    <p><strong class="chat-header-user">{{ currentChat.title }}</strong></p>

                        <div class="chat-header-menu">

                            <svg class="chat-header-menu-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="9" height="9" viewBox="0 0 512 512"><title>ionicons-v5-f</title><circle cx="256" cy="256" r="48"/><circle cx="256" cy="416" r="48"/><circle cx="256" cy="96" r="48"/></svg>
                            <input type="checkbox" />

                            <div class="chat-header-menu-dropdown">
                                <ul>
                                    <li class="delete-chat">Удалить чат</li>
                                </ul>
                            </div>

                        </div>

                </header>

                <div class="chat-messages">

                    <p class="chat-start">Чат создан</p>

                    {{#each messages}}

                        {{{ this }}}

                    {{/each}}

                </div>

                <footer class="chat-footer">

                    {{{ formSendMessage }}}

                </footer>

            </div>

        {{/if}}

        {{#if selectedUser}}

            {{{ FoundUser }}}

        {{/if}}

        {{#if isEmptyChat}}
            <div class="chat-content">

                {{{ emptyChat }}}

            </div>
        {{/if}}

</div>`;
