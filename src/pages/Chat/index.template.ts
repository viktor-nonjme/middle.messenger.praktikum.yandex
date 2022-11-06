export default `
<main class="container-grid">
<div class="messages-list">
  <div class="messages-list-content">
    <a class="messages-list-link" href="/profile" title="Редактировать профиль">Профиль</a>
    <input class="messages-list-input" placeholder="Поиск" type="text"/>
      <div class="messages-list-items">
         {{{ messagesList }}}
      </div>
  </div>
</div>
{{{ chat }}}
</main>`;
