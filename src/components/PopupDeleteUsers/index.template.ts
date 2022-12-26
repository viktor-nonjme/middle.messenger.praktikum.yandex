export default `
    <div class="popup{{#if isOpened}} opened{{/if}}">
        <div class="popup-content">
            <form class="popup-form">

                <fieldset>

                    <legend class="popup-title">Удалить пользователей</legend>

                    {{{ SearchedUsers }}}

                    {{{ button }}}

                </fieldset>

            </form>
        </div>
    </div>
`;
