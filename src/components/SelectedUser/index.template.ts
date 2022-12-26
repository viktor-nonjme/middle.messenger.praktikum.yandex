export default `
<div class="chat-user-content" data-user-id="{{ selectedUser.id }}">

    <div class="chat-user-avatar">

        <img src="{{#if selectedUser.avatar }}{{ baseUrl }}{{ selectedUser.avatar }}{{else}}{{ userAvatar }}{{/if}}" alt="{{ selectedUser.display_name }}" />

    </div>

    <p class="chat-user-name">{{ selectedUser.display_name }}</p>

    <div class="chat-user-buttons">

        {{{ buttonStartChat }}}

        {{{ buttonToChat }}}

    </div>

</div>
`;
