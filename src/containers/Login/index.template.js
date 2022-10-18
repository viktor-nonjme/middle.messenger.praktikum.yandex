export default `
<form class="{{ classes }}">
<fieldset>
    <legend>Вход</legend>
    {{> Input name=login id=login type=text label=Логин value= error= }}
    {{> Input name=password id=password type=password label=Пароль value= error= }}
    {{> Button type=submit title=Авторизоваться }}
    <a href="/registration" title="Страница регистрации">Нет аккаунта?</a>
</fieldset>
</form>`;
