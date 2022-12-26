export default `
<main class="container-grid-profile">

    {{{ Spinner }}}

    {{{ tooltip }}}

    {{{ linkToChat }}}

    <div class="profile">

        {{{ formAvatar }}}

        <form class="form-main" name="password">

            <fieldset class="form-main-content">

                <legend class="form-main-legend">Смена пароля</legend>

                {{{ oldPassword }}}

                {{{ newPassword }}}

                {{{ newPasswordRepeat }}}

                {{{ button }}}

            </fieldset>

        </form>

        {{{ linkToProfile }}}

    </div>
</main>`;
