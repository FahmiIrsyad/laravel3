@extends('manager.layouts.app')

@section('title', 'Dashboard')

@section('content')
        <div class="page-wrapper">
            <!-- ============================================================== -->
            <!-- Container fluid  -->
            <!-- ============================================================== -->
            <div class="container-fluid">
                <!-- ============================================================== -->
                <!-- Bread crumb and right sidebar toggle -->
                <!-- ============================================================== -->
                <div class="row page-titles">
                    <div class="col-md-5 align-self-center">
                        <h4 class="text-themecolor">Dashboard 1</h4>
                    </div>
                    <div class="col-md-7 align-self-center text-end">
                        <div class="d-flex justify-content-end align-items-center">
                            <ol class="breadcrumb justify-content-end">
                                <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                                <li class="breadcrumb-item active">Dashboard 1</li>
                            </ol>
                            <a href="{{ route('manager.events.create') }}" class="btn btn-info d-none d-lg-block m-l-15 text-white">
                                <i class="fa fa-plus-circle"></i> Create New
                            </a>
                        </div>
                    </div>
                </div>

                <!-- ============================================================== -->
                <!-- Filter Row -->
                <!-- ============================================================== -->

                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <!-- Filter Row -->
                                <div class="row">
                                    <div class="col-md-3">
                                        <label for="filterStatus">Status</label>
                                        <select id="filterStatus" class="form-control">
                                            <option value="">All</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="filterDate">Date</label>
                                        <input type="date" id="filterDate" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- ============================================================== -->
                <!-- Table Row -->
                <!-- ============================================================== -->
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table id="eventTable" class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Date</th>
                                                <th>Location</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <!-- DataTables will populate this -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <!-- ============================================================== -->
            <!-- End Container fluid  -->
            <!-- ============================================================== -->
        </div>
        <script>
    $(document).ready(function () {
        let table = $('#eventTable').DataTable({
            processing: true,
            serverSide: true,
            ajax: {
                url: "{{ route('manager.events.list') }}", // Adjust route name if needed
                data: function (d) {
                    d.status = $('#filterStatus').val();
                    d.date = $('#filterDate').val();
                }
            },
            columns: [
                { data: 'DT_RowIndex', name: 'DT_RowIndex' },
                { data: 'title', name: 'title' },
                { data: 'created_at', name: 'created_at' },
                { data: 'location', name: 'location' },
                { data: 'status', name: 'status' },
                { data: 'action', name: 'action', orderable: false, searchable: false }
            ]
        });

        $('#filterStatus, #filterDate').on('change', function () {
            table.ajax.reload();
        });
    });
</script>

@endsection
