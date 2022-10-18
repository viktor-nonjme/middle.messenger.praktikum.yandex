export default `
<div class="profile">
    <form class="profile-form" action="" method="POST" enctype="multipart/form-data">
        <label class="profile-form-avatar">
            <img src="{{ account }}" alt="Фото профайла">
            <input type="file" name="avatar">
        </label>
    </form>
    <form class="form-main">
        <fieldset class="form-main-content">
        <legend class="form-main-legend">Смена пароля</legend>
        {{> Input name=oldPassword id=oldPassword type=password label=Старый value= error= }}
        {{> Input name=newPassword id=newPassword type=password label=Новый value= error= }}
        {{> Input name=newPassword_repeat id=newPasswordRepeat type=password label=Повторите value= error= }}
        {{> Button type=submit title=Сохранить }}
        </fieldset>
    </form>
</div>
`;
