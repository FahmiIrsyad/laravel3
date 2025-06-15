@extends('team.layouts.app') {{-- Adjust if your layout filename differs --}}

@section('content')

<div style="margin-top:100px"></div>
<section class="mt-10">
	<div class="container">
        <form method="POST" action="{{ route('team.join.submit', $event->id) }}" enctype="multipart/form-data">
    @csrf

    <h1 class="mb-4">{{ $event->title }}</h1>
    <div class="row mb-4">
    <div class="col-12">
        <img 
            src="{{ Str::startsWith($event->image, 'http') ? $event->image : asset('storage/' . ltrim($event->image, '/')) }}" 
            class="img-fluid img-thumbnail" 
            style="width:100%"
        >
    </div>
</div>

<div class="row mb-4">
    <div class="col-12 text-justify">
        {!! $event->description !!}
    </div>
</div>
<hr style="border:1px solid red">


    @foreach($formFields->chunk(2) as $fieldPair)
    <div class="row">
        @foreach($fieldPair as $field)
            <div class="col-md-6 mb-4">
                <label for="{{ $field->input_id }}">
                    {{ $field->label }}
                    @if($field->popup_detail)
                        <a href="{{ $field->popup_detail }}" target="_blank" class="text-info">(View Detail)</a>
                    @endif
                    @if($field->required)
                        <span class="text-danger">*</span>
                    @endif
                </label>

                @php
                    $options = $field->options ?? [];
                @endphp

                @switch($field->type)

                    @case('text')
                    @case('email')
                    @case('number')
                        <input type="{{ $field->type }}" id="{{ $field->input_id }}" name="{{ $field->input_id }}"
                               placeholder="{{ $field->placeholder }}" class="form-control {{ $field->class }}"
                               @if($field->required) required @endif>
                        @break

                    @case('textarea')
                        <textarea id="{{ $field->input_id }}" name="{{ $field->input_id }}"
                                  placeholder="{{ $field->placeholder }}" class="form-control {{ $field->class }}"
                                  @if($field->required) required @endif></textarea>
                        @break

                    @case('datepicker')
                        <input type="date" id="{{ $field->input_id }}" name="{{ $field->input_id }}"
                               class="form-control {{ $field->class }}" @if($field->required) required @endif>
                        @break

                    @case('select')
                        <select id="{{ $field->input_id }}" name="{{ $field->input_id }}"
                                class="form-control {{ $field->class }}" @if($field->required) required @endif>
                            <option value="">Please select</option>
                            @foreach($options as $opt)
                                <option value="{{ $opt->value }}">{{ $opt->label }}</option>
                            @endforeach
                        </select>
                        @break

                    @case('checkbox')
                        @if(count($options) > 0)
                            @foreach($options as $opt)
                                <div class="form-check">
                                    <input class="form-check-input {{ $field->class }}"
                                           type="checkbox"
                                           id="{{ $field->input_id }}_{{ $loop->index }}"
                                           name="{{ $field->input_id }}[]"
                                           value="{{ $opt->value }}"
                                           @if($opt->checked) checked @endif
                                           @if($field->required) required @endif>
                                    <label class="form-check-label" for="{{ $field->input_id }}_{{ $loop->index }}">
                                        {{ $opt->label }}
                                    </label>
                                </div>
                            @endforeach
                        @else
                            <div class="form-check">
                                <input class="form-check-input {{ $field->class }}"
                                       type="checkbox"
                                       id="{{ $field->input_id }}"
                                       name="{{ $field->input_id }}"
                                       value="1"
                                       @if($field->required) required @endif>
                            </div>
                        @endif
                        @break

                    @case('radio')
                    @case('radio_price')
                    @case('radio_qty')
                        @if(count($options) > 0)
                            @foreach($options as $opt)
                                <div class="form-check">
                                    <input class="form-check-input {{ $field->class }}"
                                           type="radio"
                                           id="{{ $field->input_id }}_{{ $loop->index }}"
                                           name="{{ $field->input_id }}"
                                           value="{{ $opt->value }}"
                                           @if($opt->checked) checked @endif
                                           @if($field->required) required @endif>
                                    <label class="form-check-label" for="{{ $field->input_id }}_{{ $loop->index }}">
                                        {{ $opt->label }}
                                        @if(in_array($field->type, ['radio_price', 'radio_qty']))
                                            (RM{{ number_format($opt->price, 2) }})
                                        @endif
                                    </label>
                                </div>
                            @endforeach
                        @else
                            <div class="form-check">
                                <input class="form-check-input {{ $field->class }}"
                                       type="radio"
                                       id="{{ $field->input_id }}"
                                       name="{{ $field->input_id }}"
                                       value="1"
                                       @if($field->required) required @endif>
                            </div>
                        @endif
                        @break

                    @case('image')
                        <input type="file" name="{{ $field->input_id }}" id="{{ $field->input_id }}"
                               class="form-control {{ $field->class }}" @if($field->required) required @endif>
                        @break

                @endswitch
            </div>
        @endforeach
    </div>
@endforeach

    @if($event->event_statements->count())
    <div class="pb-3 d-flex flex-wrap justify-content-center mt-4">
        @foreach($event->event_statements as $statement)
            <div class="mx-1">
                <button type="button"
                        onclick="window.open('{{ $statement->url }}', '{{ $statement->target }}')"
                        class="{{ $statement->class }}">
                    {{ $statement->title }}
                </button>
            </div>
        @endforeach
    </div>
@endif
<div class="row mb-3 alert alert-secondary">
    @if($event->eventFee && $event->eventFee->type == 1)
        @if($event->eventFee->amount > 0)
        <div class="col-12 mb-3">
            @php
                $total_fee = $event->eventFee->amount + $event->eventFee->processing_fee;
            @endphp
            <h1>RM<span id="fee">{{ number_format($total_fee, 2) }}</span></h1>
            <strong>Fee</strong>: RM{{ number_format($event->eventFee->amount, 2) }}
            @if($event->eventFee->processing_fee > 0)
                (plus <strong>Processing Fee</strong>: RM{{ number_format($event->eventFee->processing_fee, 2) }})
            @endif
        </div>
        @endif

    @elseif($event->eventFee && $event->eventFee->type == 2)
        <div class="col-md-12">
            <div>
                <h5><div id="select_category">Please select category</div></h5>
                <span id="fee"></span>
            </div>
        </div>

    @elseif($event->eventFee && $event->eventFee->type == 0)
        <div class="col-md-6">
            <div class="text-center-xs mb-2 mt-2">
                <h1 class="m-0">RM0.00</h1>
                <div class="m-0">Yes, it's FREE!</div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="text-center-xs mb-2s">
                <h6>
                    This event is sponsored by 
                    @if($event->eventFee->sponsored_by)
                        {{ $event->eventFee->sponsored_by }}
                    @endif
                </h6>
                <div>How about giving some Like to our Facebook page?</div>
                <div class="fb-like m-1" data-href="https://www.facebook.com/sporteqa/" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="true"></div>
            </div>
        </div>
        @php $total_fee = 0; @endphp
    @endif
</div>

@php
    $order_id = time(); // UNIX timestamp
@endphp

<div class="d-flex justify-content-between align-items-center mb-3">
    <button type="submit" class="btn btn-primary">Register</button>

    <div class="d-flex align-items-center">
        <label class="me-2 mb-0">Order ID&nbsp;&nbsp;</label>
        <input class="form-control py-2" type="text" disabled readonly style="width: 180px;" value="{{ $order_id }}">
    </div>
</div>


</form>

		
	</div>
</section>
@push('scripts')
<script>
$(document).ready(function(){
	$('.autoplay').slick({
		dots: true,
		infinite: false,
		centerMode: true,
		speed: 300,
		autoplay: true,
		autoplaySpeed:2000,
		slidesToShow: 6,
		slidesToScroll: 1,
		responsive: [
		{
		  breakpoint: 1024,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 3,
			infinite: true,
			dots: true
		  }
		},
		{
		  breakpoint: 600,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 2
		  }
		},
		{
		  breakpoint: 480,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		  }
		}
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
		]
		});
	
	$('.testimonials').slick({
		dots: true,
		infinite: false,
		centerMode: true,
		speed: 500,
		autoplay: true,
		arrow: true,
		autoplaySpeed:4500,
		slidesToShow: 1,
		slidesToScroll: 1
		});
})
</script>
@endpush
@endsection
