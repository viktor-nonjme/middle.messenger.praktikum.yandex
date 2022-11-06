export default `     
<div class="messages-list-items">
{{#each messages}}
    <a class="messages-list-item" href="/id{{ id }}">
    <div class="messages-list-item-avatar"></div>
    <div class="messages-list-item-center">
        <p><strong>{{ name }}</strong></p>
        <p>{{ text }}...</p>
    </div>
    <div class="messages-list-item-right">
        <p class="messages-list-item-date">{{ date }}</p>
        <div class="messages-list-item-notifications">{{ notification }}</div>
    </div>
    </a>
{{/each}}
</div>`;
