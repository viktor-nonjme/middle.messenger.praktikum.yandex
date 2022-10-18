export default `
<form class="{{ classes }}">
    <fieldset>
        <legend>Регистрация</legend>
        {{> Input name=email id=email type=email label=Почта value= error= }}
        {{> Input name=login id=login type=text label=Логин value= error= }}
        {{> Input name=first_name id=firstName type=text label=Имя value= error= }}
        {{> Input name=second_name id=secondName type=text label=Фамилия value= error= }}
        {{> Input name=phone id=phone type=tel label=Телефон value= error= }}
        {{> Input name=password id=password type=password label=Пароль value= error= }}
        {{> Input name=password_repeat id=passwordRepeat type=password label=Повторите value= error= }}
        {{> Button type=submit title=Зарегистрироваться }}
        <a href="/login" title="Страница входа">Войти</a>
    </fieldset>
</form>
`;
