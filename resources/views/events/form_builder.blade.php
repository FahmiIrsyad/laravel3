@extends('manager.layouts.app')

@section('content')
<div class="page-wrapper">
    <div class="container-fluid">

        <!-- Page Title & Breadcrumb -->
        <div class="row page-titles">
            <div class="col-md-5 align-self-center">
                <h4 class="text-themecolor">Form Builder</h4>
            </div>
            <div class="col-md-7 align-self-center text-end">
                <div class="d-flex justify-content-end align-items-center">
                    <ol class="breadcrumb justify-content-end">
                        <li class="breadcrumb-item"><a href="{{ route('manager.dashboard') }}">Home</a></li>
                        <li class="breadcrumb-item"><a href="{{ route('manager.events.index') }}">Event List</a></li>
                        <li class="breadcrumb-item active">Form Builder</li>
                    </ol>
                </div>
            </div>
        </div>

        <!-- Builder Form Card -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">

                        <h4 class="card-title mb-4">Build Form for: <strong>{{ $event->title }}</strong></h4>

                        <div class="row mb-3">
                            <div class="col-md-4">
                                <label for="field-type">Select Field Type</label>
                                <select id="field-type" class="form-select">
                                    <option value="text">Text</option>
                                    <option value="textarea">Textarea</option>
                                    <option value="dropdown">Dropdown</option>
                                    <option value="checkbox">Checkbox</option>
                                </select>
                            </div>
                            <div class="col-md-2 d-flex align-items-end">
                                <button type="button" id="add-field-btn" class="btn btn-secondary">Add Field</button>
                            </div>
                        </div>

                        <form method="POST" action="{{ route('manager.event.form.store', $event->id) }}">
                            @csrf
                            <div id="form-preview" class="mt-3 border p-3 rounded bg-light"></div>
                            <input type="hidden" name="form_json" id="form_json">
                            <button type="submit" class="btn btn-primary mt-3">Save Form</button>
                            <a href="{{ route('manager.events.index') }}" class="btn btn-secondary mt-3">Cancel</a>
                        </form>

                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!-- ✅ JavaScript -->
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

        formStructure.forEach((field, index) => {
            const requiredMark = field.required ? `<span style="color:red">*</span>` : '';
            preview.innerHTML += `
                <div class="mb-2 p-2 border-bottom">
                    <strong>${field.label}</strong> (${field.type}) ${requiredMark}
                </div>
            `;
        });

        document.getElementById("form_json").value = JSON.stringify(formStructure);
    }

    document.getElementById("add-field-btn").addEventListener("click", addField);
});
</script>
@endsection
