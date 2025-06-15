@extends('team.layouts.app')

@section('head')
  <script src="{{ asset('plugins/password-strength-meter/password-score.js') }}"></script>
  <script src="{{ asset('plugins/password-strength-meter/password-score-options.js') }}"></script>
  <script src="{{ asset('plugins/password-strength-meter/bootstrap-strength-meter.js') }}"></script>
@endsection

@section('content')
<div style="margin-top:100px"></div>

<section class="mt-10">
  <div class="container">
    <span class="float-right">
      <button class="btn btn-primary" onClick="update_profile()">
        <i class="fa fa-user-astronaut"></i> Update My Profile
      </button>
    </span>

    <h1>My Profile</h1>
      <div class="row mb-4">
        <div class="col-md-6 col-xs-12">
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" disabled value="{{ $user->user_fullname }}">
          </div>
          <div class="form-group">
            <label>NRIC / Passport</label>
            <input type="text" class="form-control" disabled value="{{ $user->user_nric }}">
          </div>
        </div>

        <div class="col-md-6 col-xs-12">
          <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" disabled value="{{ $user->user_email }}">
          </div>
          <div class="form-group">
            <label>Mobile</label>
            <input type="text" class="form-control" disabled value="{{ $user->user_mobile }}">
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between">
        <div><h1>My Events</h1></div>
        <div>
    <button class="btn btn-primary" onclick="location.href='{{ route('team.event') }}'">
        Register New Event
    </button>
</div>

      </div>

      <div class="row mb-4">
        <div class="col-12">
          <div class="form-group">
           
              <table id="submissions-table" class="table table-bordered table-striped w-100">
        <thead>
            <tr>
                <th>No</th>
                <th>Event Name</th>
                <th>Dates</th>
                <th>Type</th>
                <th>Order ID</th>
                <th>Action</th>
            </tr>
        </thead>
    </table>
          </div>
        </div>
      </div>
  </div>
  <!-- View Summary Modal -->
<div class="modal fade" id="summaryModal" tabindex="-1" aria-labelledby="summaryModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="summaryModalLabel">View Detail</h5>
        <button type="button" class="btn-close" data-dismiss="modal"></button>
      </div>
      <div class="modal-body" id="summaryModalBody">
        <p class="text-center">Loading...</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" data-dismiss="modal">✖ Close</button>
      </div>
    </div>
  </div>
</div>

</section>
@endsection
@push('scripts')
<!-- Include DataTables JS (if not already globally included) -->
<script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap5.min.js"></script>

<script>
$(document).ready(function () {
    $('#submissions-table').DataTable({
        processing: true,
        serverSide: true,
        ajax: '{{ route("team.submissions.data") }}',
        columns: [
            { data: 'DT_RowIndex', name: 'DT_RowIndex', orderable: false, searchable: false },
            { data: 'event_name', name: 'event_name' },
            { data: 'dates', name: 'dates' },
            { data: 'type', name: 'type' },
            { data: 'order_id', name: 'order_id' },
            { data: 'action', name: 'action', orderable: false, searchable: false }
        ]
    });
});

   $(document).on('click', '.btn-view-summary', function () {
    const orderId = $(this).data('order-id');

    $('#summaryModalBody').html('<p class="text-center">Loading...</p>');
    $('#summaryModal').modal('show');

    $.ajax({
        url: "{{ route('team.submission.summary') }}",
        type: "GET",
        data: { order_id: orderId },
        success: function (response) {
            $('#summaryModalBody').html(response);
        },
        error: function () {
            $('#summaryModalBody').html('<p class="text-danger">Error loading summary.</p>');
        }
    });
});

</script>
@endpush
