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
    <legend>Смена пароля</legend>
    <fieldset>
      {{> Input name=oldPassword id=oldPassword type=password label=Старый value= error= }}
      {{> Input name=newPassword id=newPassword type=password label=Новый value= error= }}
      {{> Input name=newPassword_repeat id=newPasswordRepeat type=password label=Повторите value= error= }}
      {{> Button type=submit title=Сохранить }}
    </fieldset>
</form>

</div>
`;
