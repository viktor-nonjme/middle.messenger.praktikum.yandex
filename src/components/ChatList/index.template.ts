export default `     
<div class="chat-list-items">

    {{#if isUsers}}

        {{{ buttonClose }}}

        {{#if isNotFoundUser}}

            <img class="chat-list-search-icon" src="{{ searchIcon }}" alt="Поиск не дал результата" />
            <p class="chat-list-not-found">Пользователь с таким логином не найден</p>

        {{else}}

            {{#each users}}

                <div class="chat-list-user-item" data-user-id="{{ id }}">
                    <div class="chat-list-user-item-avatar">
                        <img src="{{#if avatar}}{{ @root.baseUrl }}{{ avatar }}{{else}}{{ @root.avatar }}{{/if}}" />
                    </div>
                    <div class="chat-list-user-item-center">
                        <p><strong>{{ first_name }} {{ second_name }}</strong></p>
                        <p>@{{ login }}</p>
                    </div>
                </div>

            {{/each}}

        {{/if}}

    {{/if}}

    {{#if isChats}}

        {{#each chats}}

          <div class="chat-list-item" data-chat-id="{{ id }}">
            <div class="chat-list-item-avatar">
                <img src="{{#if avatar}}{{ @root.baseUrl }}{{ avatar }}{{else}}{{ @root.avatar }}{{/if}}" />
            </div>
            <div class="chat-list-item-center">
                <p><strong class="chat-list-item-title">{{ title }}</strong></p>
                <p>{{ last_message.content }}...</p>
            </div>
            <div class="chat-list-item-right">
                <p class="chat-list-item-date">{{ last_message.time }}</p>

                {{#if unread_count}}
                    <div class="chat-list-item-unread">{{ unread_count }}</div>
                {{/if}}

            </div>
          </div>

        {{/each}}

    {{/if }}

</div>`;
