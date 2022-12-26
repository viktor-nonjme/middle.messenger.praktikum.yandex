export default `
<form class="profile-form" method="POST" enctype="multipart/form-data" name="avatar" novalidate>
    <label class="profile-form-avatar">
        <img src="{{ avatar }}" alt="Фото профайла">
        <input type="file" name="avatar" required>
    </label>

    {{{ button }}}
</form>`;
