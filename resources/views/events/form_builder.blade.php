@extends('manager.layouts.app')

@section('content')
<h2>Form Builder for: {{ $event->title }}</h2>

<div class="mb-3">
  <label for="field-type">Select Field Type</label>
  <select id="field-type" class="form-select w-25">
    <option value="text">Text</option>
    <option value="textarea">Textarea</option>
    <option value="dropdown">Dropdown</option>
    <option value="checkbox">Checkbox</option>
  </select>
  <button type="button" id="add-field-btn" class="btn btn-secondary mt-2">Add Field</button>
</div>

<form method="POST" action="{{ route('manager.event.form.store', $event->id) }}">
  @csrf
  <div id="form-preview" class="mt-4 border p-3 rounded bg-light"></div>
  <input type="hidden" name="form_json" id="form_json">
  <button type="submit" class="btn btn-primary mt-3">Save Form</button>
</form>

<!-- ✅ Your JavaScript goes inside the content section so it's executed -->
<script>
document.addEventListener('DOMContentLoaded', function () {
  let formStructure = [];

  function addField() {
    const type = document.getElementById("field-type").value;
    const label = prompt("Enter field label:");
    if (!label) return;

    const required = confirm("Is this field required?");
    const options = (type === "dropdown")
      ? prompt("Enter options (comma-separated):").split(',').map(opt => opt.trim())
      : [];

    formStructure.push({ type, label, required, options });
    updatePreview();
  }

  function updatePreview() {
    const preview = document.getElementById("form-preview");
    preview.innerHTML = "";

    formStructure.forEach((field) => {
      const requiredMark = field.required ? `<span style="color:red">*</span>` : '';
      preview.innerHTML += `<div class="mb-2 p-2 border-bottom"><strong>${field.label}</strong> (${field.type}) ${requiredMark}</div>`;
    });

    document.getElementById("form_json").value = JSON.stringify(formStructure);
  }

  // Attach once DOM is ready
  document.getElementById("add-field-btn").addEventListener("click", addField);
});
</script>
@endsection
