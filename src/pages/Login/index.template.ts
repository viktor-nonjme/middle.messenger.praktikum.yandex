export default `
<main class="container-base">
    <form class="form-main login" name="login">
        <fieldset class="form-main-content">
            <legend class="form-main-legend">Вход</legend>
            {{{ login }}}
            {{{ password }}}
            {{{ button }}}
            <a class="form-main-link" href="/registration" title="Страница регистрации">Нет аккаунта?</a>
        </fieldset>
    </form>
</main>`;
