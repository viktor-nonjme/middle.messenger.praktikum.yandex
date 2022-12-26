export default `
<div class="chat-list-items searched-users">

    {{#if isUsers}}

        {{{ buttonClose }}}

        {{#if isNotFoundUser}}

            <img class="chat-list-search-icon" src="{{ searchIcon }}" alt="Поиск не дал результата" />
            <p class="chat-list-not-found">Пользователь с таким логином не найден</p>

        {{else}}

            {{#each selectedUsers}}

                <div class="chat-list-user-item" data-user-id="{{ id }}">
                    <div class="chat-list-user-item-avatar">
                        <img src="{{#if avatar}}{{ @root.baseUrl }}{{ avatar }}{{else}}{{ @root.avatar }}{{/if}}" />
                    </div>
                    <div class="chat-list-user-item-center">
                        <p><strong>{{ first_name }} {{ second_name }}</strong></p>
                        <p>@{{ login }}</p>
                    </div>
                    <div class="chat-list-item-right">
                        <input class="unselect-user" type="checkbox" checked/>
                    </div>
                </div>

            {{/each}}

                {{#if selectedUsers.length}}

                    <div class="searched-users-line"></div>

                {{/if}}

            {{#each users}}

                <div class="chat-list-user-item" data-user-id="{{ id }}">
                    <div class="chat-list-user-item-avatar">
                        <img src="{{#if avatar}}{{ @root.baseUrl }}{{ avatar }}{{else}}{{ @root.avatar }}{{/if}}" />
                    </div>
                    <div class="chat-list-user-item-center">
                        <p><strong>{{ first_name }} {{ second_name }}</strong></p>
                        <p>@{{ login }}</p>
                    </div>
                    <div class="chat-list-item-right">
                        <input class="select-user" type="checkbox" />
                    </div>
                </div>

            {{/each}}

        {{/if}}

    {{/if}}

</div>
`;
