import formStyles from "../../styles/form.module.scss";

export default `
<div class="{{ classes }}">
<form action="" method="" enctype="multipart/form-data">
    <label>
        <img src="{{ account }}" alt="Фото профайла">
        <input type="file" name="avatar">
    </label>
</form>
<form class="${formStyles.Form}">
    <legend>Виктор</legend>
    <fieldset>
        {{> Input name=email id=email type=email label=Почта value=smg93880@gmail.com error= }}
        {{> Input name=login id=login type=text label=Логин value=viktornonjme error= }}
        {{> Input name=first_name id=firstName type=text label=Имя value=Виктор error= }}
        {{> Input name=second_name id=secondName type=text label=Фамилия value=Кулешов error= }}
        {{> Input name=phone id=phone type=tel label=Телефон value=375296668084 error= }}
        {{> Button type=submit title=Сохранить }}
    </fieldset>
</form>

<a href="/profile/password">Изменить пароль</a>

<a href="/logout">Выйти</a>

</div>
`;
