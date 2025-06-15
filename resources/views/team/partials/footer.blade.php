<footer class="page-footer " style="background-color: black">
        <div class="container">
          <div class="row">
			  <div class="col-md-12 pb-3 d-flex justify-content-center">
			  <div class="text-white">Powered By <a href="https://sporteqa.com" style="color:#ffc107" target="_blank">Sporteqa.com</a></div>
			  </div>
			</div>
	</div>
    </footer>
    <div id="action" style="display:none"></div>
    <div id="action2" style="display:none"></div>
<!-- The Bootstrap Image Gallery lightbox, should be a child element of the document body -->
<div id="blueimp-gallery" class="blueimp-gallery blueimp-gallery-controls">
    <!-- The container for the modal slides -->
    <div class="slides"></div>
    <!-- Controls for the borderless lightbox -->
    <h3 class="title"></h3>
    <a class="prev">&lsaquo;</a>
    <a class="next">&rsaquo;</a>
    <a class="close"><i class="fa fa-close"></i></a>
    <a class="play-pause"></a>
    <ol class="indicator"></ol>
    <!-- The modal dialog, which will be used to wrap the lightbox content -->
    <div class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-hidden="true">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body next main_content"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default pull-left prev">
                        <i class="fa fa-chevron-left"></i>
                        Previous
                    </button>
                    <button type="button" class="btn btn-primary next">
                        Next
                        <i class="fa fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>