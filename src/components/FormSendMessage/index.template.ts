export default `
<form class="chat-footer-form" name="message">
    <div class="chat-footer-form-field">
        <input class="chat-footer-form-input" placeholder="Сообщение" type="text" name="message" value="{{ value }}" />
        <span>{{ error }}</span>
    </div>
    <button class="chat-footer-form-button" type="submit" title="Отправить сообщение">
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 512 512"><title>ionicons-v5-a</title><polyline points="268 112 412 256 268 400" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"/><line x1="392" y1="256" x2="100" y2="256" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"/></svg>
    </button>
</form>
`;
