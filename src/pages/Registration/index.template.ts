export default `
<main class="container-base">
    <form class="form-main" name="registration">
        <fieldset class="form-main-content">
            <legend class="form-main-legend">Регистрация</legend>
            {{{ email }}}
            {{{ login }}}
            {{{ firstName }}}
            {{{ secondName }}}
            {{{ phone }}}
            {{{ password }}}
            {{{ passwordRepeat }}}
            {{{ button }}}
            <a class="form-main-link" href="/login" title="Страница входа">Войти</a>
        </fieldset>
    </form>
</main>
`;
