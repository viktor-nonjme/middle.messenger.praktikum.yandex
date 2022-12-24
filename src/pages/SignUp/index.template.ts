export default `
<main class="container-base">

    {{{ tooltip }}}

    <form class="form-main" name="sign-up" novalidate>
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

            {{{ link }}}

        </fieldset>
    </form>
</main>
`;
