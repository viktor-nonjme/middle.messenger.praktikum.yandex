export default `
<form class="form-main login">
<fieldset class="form-main-content">
    <legend class="form-main-legend">Вход</legend>
    {{> Input name=login id=login type=text label=Логин value= error= }}
    {{> Input name=password id=password type=password label=Пароль value= error= }}
    {{> Button type=submit title=Авторизоваться }}
    <a class="form-main-link" href="/registration" title="Страница регистрации">Нет аккаунта?</a>
</fieldset>
</form>`;
