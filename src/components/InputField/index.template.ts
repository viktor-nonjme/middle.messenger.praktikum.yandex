export default `
<div class="form-input-item">
    <label class="label" for="{{ id }}">{{ label }}</label>
    <input 
        class="input" 
        name="{{ name }}" 
        id="{{ id }}" 
        type="{{ type }}" 
        value="{{ value }}"
        {{#if placeholder}}placeholder="{{ placeholder }}"{{/if}}
        {{#if minlength}}minlength="{{ minlength }}"{{/if}}
        {{#if maxlength}}maxlength="{{ maxlength }}"{{/if}}
        {{#if maxlength}}{{ isRequired }}{{/if}}
    />
    <span class="error">{{ error }}</span>
</div>
`;
