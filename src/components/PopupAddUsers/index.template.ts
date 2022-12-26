export default `
    <div class="popup{{#if isOpened}} opened{{/if}}">
        <div class="popup-content">
            <form class="popup-form">

                <fieldset>

                    <legend class="popup-title">Добавить пользователей в чат</legend>

                    {{{ inputFindUsers }}}

                    {{{ SearchedUsers }}}

                    {{{ button }}}

                </fieldset>

            </form>
        </div>
    </div>
`;
