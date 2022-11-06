export default `
<div class="container-grid-profile">
    <a class="container-grid-profile-link" href="/" title="Вернуться к чатам">
        <svg class="container-grid-profile-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 512 512" fill="currentColor"><title>ionicons-v5-a</title><path d="M48,256c0,114.87,93.13,208,208,208s208-93.13,208-208S370.87,48,256,48,48,141.13,48,256Zm212.65-91.36a16,16,0,0,1,.09,22.63L208.42,240H342a16,16,0,0,1,0,32H208.42l52.32,52.73A16,16,0,1,1,238,347.27l-79.39-80a16,16,0,0,1,0-22.54l79.39-80A16,16,0,0,1,260.65,164.64Z"/></svg>
    </a>
    <div class="profile">
        <form class="profile-form" action="" method="POST" enctype="multipart/form-data" name="profile">
            <label class="profile-form-avatar">
                <img src="{{ account }}" alt="Фото профайла">
                <input type="file" name="avatar">
            </label>
        </form>
    <form class="form-main">
        <fieldset class="form-main-content">
            <legend class="form-main-legend">Виктор</legend>
            {{{ email }}}
            {{{ login }}}
            {{{ firstName }}}
            {{{ secondName }}}
            {{{ phone }}}
            {{{ button }}}
        </fieldset>
    </form>

    <a href="/profile/password">Изменить пароль</a>

    <a href="/logout">Выйти</a>

    </div>
</div>`;
