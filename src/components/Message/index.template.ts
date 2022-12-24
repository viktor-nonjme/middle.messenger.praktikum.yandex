export default `
<div class="chat-message {{ type }}" data-message-id="{{ id }}">
    <p class="chat-message-text">
        {{ content }}
    </p>
    <p class="date chat-message-date">{{ time }}</p>
</div>`;
