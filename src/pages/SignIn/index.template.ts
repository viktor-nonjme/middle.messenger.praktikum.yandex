export default `
<main class="container-base">
    {{{ tooltip }}}
    <form class="form-main login" name="sign-in" novalidate>
        <fieldset class="form-main-content">
            <legend class="form-main-legend">Вход</legend>
            {{{ login }}}
            {{{ password }}}
            {{{ button }}}
            {{{ link }}}
        </fieldset>
    </form>
</main>`;
