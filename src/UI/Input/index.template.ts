export default `
<div class="form-input-item">
    <label class="label" for="{{ id }}">{{ label }}</label>
    <input class="input" name="{{ name }}" id="{{ id }}" type="{{ type }}" value="{{ value }}" />
    <span class="error">{{ error }}</span>
</div>
`;
