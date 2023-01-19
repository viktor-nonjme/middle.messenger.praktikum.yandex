export default `
<main class="container-grid-profile">

    {{{ Spinner }}}

    {{{ tooltip }}}

    {{{ linkToChat }}}

    <div class="profile">

        {{{ formAvatar }}}

        <form class="form-main" name="profile" novalidate>
            <fieldset class="form-main-content">
                <legend class="form-main-legend">{{ displayName }}</legend>

                {{{ emailInput }}}

                {{{ loginInput }}}

                {{{ firstNameInput }}}

                {{{ secondNameInput }}}

                {{{ phoneInput }}}

                {{{ button }}}

            </fieldset>
        </form>

        {{{ linkToPassword }}}

        {{{ logoutButton }}}

    </div>
</main>`;
