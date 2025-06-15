@extends('team.layouts.app') {{-- Adjust if your layout filename differs --}}

@section('content')

<div data-bs-parallax-bg="true" style="height:500px; background-image:url('{{ asset('events/assets/img/running-01-959x489.jpg') }}'); background-position:center; background-size:cover;"></div>

<div style="position: absolute; top:0; height:500px; z-index: 90; background-color: black; opacity: 0.4; width:100%"></div>

<div style="position: absolute;width:100%" class="text-center">
    <div style="z-index: 100; position: absolute; top:-360px; width: 100%" class="text-center">
        <h3 class="sporteqa-yellow"><span class="bg-black">The Most Versatile Sports Event Management Platform On The PLANET!</span></h3>
        <div class="container mt-4">
            <div class="autoplay text-center" style="width:100%">
                <div><img src="{{ asset('assets/images/netball-txt-orange2-240x300.png') }}" height="150" alt="Netball"></div>
                <div><img src="{{ asset('assets/images/run-06c-txt-orange2-240x300.png') }}" height="150" alt="Running"></div>
                <div><img src="{{ asset('assets/images/football-txt-orange2-240x300.png') }}" height="150" alt="Football"></div>
                <div><img src="{{ asset('assets/images/hockey-txt-orange2-240x300.png') }}" height="150" alt="Hockey"></div>
                <div><img src="{{ asset('assets/images/rugby-txt-orange2-240x300.png') }}" height="150" alt="Rugby"></div>
                <div><img src="{{ asset('assets/images/multi-sports-txt-orange2-240x300.png') }}" height="150" alt="Various Sports"></div>
            </div>
        </div>
    </div>
</div>

<main class="page landing-page">
    <section class="clean-block clean-info dark">
        <div class="container">
            <div class="block-heading mb-0">
                <h2 class="text-info">Upcoming Events</h2>
            </div>
            <div class="d-flex row justify-content-center">
                
                    @php
    $dummyEvents = [
        [
            'title' => 'KL City Marathon',
            'image' => 'running-event.jpg',
            'venue' => 'Dataran Merdeka, Kuala Lumpur',
            'start' => strtotime('2025-07-20'),
            'end' => strtotime('2025-07-21'),
            'status' => 1,
            'external' => 0,
            'register_url' => '#',
            'detail_url' => '#',
        ],
        [
            'title' => 'Penang Island Run',
            'image' => 'https://via.placeholder.com/400x200?text=Penang+Run',
            'venue' => 'Padang Kota Lama',
            'start' => strtotime('2025-08-05'),
            'end' => strtotime('2025-08-05'),
            'status' => 2,
            'external' => 1,
            'register_url' => 'https://externalregister.com/penangrun',
            'detail_url' => '#',
        ],
        [
            'title' => 'Sabah Ultra Trail',
            'image' => 'https://via.placeholder.com/400x200?text=Sabah+Trail',
            'venue' => 'Kinabalu Park',
            'start' => strtotime('2025-09-01'),
            'end' => strtotime('2025-09-02'),
            'status' => 3,
            'external' => 0,
            'register_url' => '#',
            'detail_url' => '#',
        ],
    ];
@endphp

                       @foreach($events as $event)
    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div class="card justify-content-center">
            <img class="card-img-top" src="{{ asset('storage/' . ltrim($event->image, '/')) }}" alt="event image">
            <div class="card-body justify-content-center">
                <h5 class="card-title text-center">{{ $event->title }}</h5>
                <p class="card-text text-center">
                    <div>{{ \Carbon\Carbon::parse($event->start_date)->format('d M Y') }} - {{ \Carbon\Carbon::parse($event->end_date)->format('d M Y') }}</div>
                    <div>{{ $event->location }}</div>
                </p>

                @if($event->status == 1)
                   <a href="{{ route('team.join.show', $event->id) }}" class="btn btn-success animated flash infinite">Join This Event</a>
                @elseif($event->status == 2)
                    <button disabled type="button" class="btn btn-warning">Opening Soon</button>
                @elseif($event->status == 3)
                    <button disabled type="button" class="btn btn-dark">Completed</button>
                @else
                    <button disabled type="button" class="btn btn-danger">Closed</button>
                @endif

                @if(!empty($event->detail_url))
                    <button type="button" class="btn btn-info" onclick="location.href='{{ $event->detail_url }}'">Detail</button>
                @endif
            </div>
        </div>
    </div>
@endforeach

            </div>
        </div>
    </section>

    <section class="clean-block features">
        <div class="container">
            <div class="block-heading">
                <h2 class="text-info">What Our Fantastic Users Say</h2>
                <p>Managing an event is never easy, but our clients have proven that Sporteqa has made managing any sporting event a piece of cake.</p>
            </div>

            <div class="row justify-content-center">
                <div class="testimonials text-center justify-content-center" style="width:100%">
                    @php
    $dummyTestimonials = [
        [
            'name' => 'Sarah Ahmad',
            'title' => 'Netball Coach',
            'text' => 'Sporteqa made our tournament run so smoothly! I’ve never managed a more stress-free event.'
        ],
        [
            'name' => 'Jason Lee',
            'title' => 'Running Club Leader',
            'text' => 'Registration and team coordination was seamless. Highly recommended!'
        ],
        [
            'name' => 'Aishah Malik',
            'title' => 'Rugby Organizer',
            'text' => 'Sporteqa helped us track and manage over 50 teams effortlessly. Amazing platform!'
        ],
    ];
@endphp

@foreach($dummyTestimonials as $testimonial)
    <div>
        <div class="user col-md-12 justify-content-center">
            <div class="user_image justify-content-center">
                <img src="{{ asset('userfiles/images/rmw-fc-400x400.png') }}" height="150" alt="">
            </div>
            <div class="user_text pb-3">
                <p class="mbr-fonts-style"><em>{{ $testimonial['text'] }}</em></p>
            </div>
            <div class="user_name mbr-bold pb-2 mbr-fonts-style"><strong>{{ $testimonial['name'] }}</strong></div>
            <div class="user_desk mbr-light mbr-fonts-style">{{ $testimonial['title'] }}</div>
        </div>
    </div>
@endforeach

                </div>
            </div>
        </div>
    </section>
</main>
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
