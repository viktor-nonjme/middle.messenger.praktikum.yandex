export default `
<div class="form-input-item">
    <label class="label" for="{{ id }}">{{ label }}</label>
    <input 
        class="input" 
        name="{{ name }}" 
        id="{{ id }}" 
        type="{{ type }}" 
        value="{{ value }}" 
        {{#if minlength}}minlength="{{ minlength }}"{{/if}}
        {{#if maxlength}}maxlength="{{ maxlength }}"{{/if}}
        {{ isRequired }}
    />
    <span class="error">{{ error }}</span>
</div>
`;
