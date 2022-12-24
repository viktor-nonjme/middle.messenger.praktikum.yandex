export default `
    <div class="popup{{#if isOpened}} opened{{/if}}">
        <div class="popup-content">
            <form class="popup-form">

                <fieldset>
                    <legend class="popup-title">Создать чат</legend>

                    {{{ inputNameChat }}}

                    <div class="form-input-item">

                        <label class="label" for="addUser">Добавить пользователя</label>

                        <input class="input input-users" type="text" name="addUser" id="addUser" placeholder="Найти пользователей">
                            
                    </div>

                    {{{ SearchedUsers }}}

                    {{{ button }}}

                </fieldset>

            </form>
        </div>
    </div>
`;
