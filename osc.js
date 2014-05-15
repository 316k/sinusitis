// Audio context for the app
var ac = new AudioContext();

// Gain control
var osc_gain = ac.createGain();
osc_gain.gain.value = 0;

var global_gain = ac.createGain();
global_gain.connect(ac.destination);
global_gain.gain.value = 0.5;

osc_gain.connect(global_gain);

// Oscillator
var osc = null;

// Setup the oscillator
function setup() {
    osc = ac.createOscillator();
    osc.type = 'saw';
    osc.connect(osc_gain);
    osc.start(0);
}

$(document).ready(function() {
            $('#controls, #modal').hide();

            // Bind events
            $('#line').mousemove(function(e) {
                if(osc) {
                    osc.frequency.value = parseInt(e.clientX/$('body').width() * (parseInt($('#max_freq').val()) - parseInt($('#min_freq').val())) + parseInt($('#min_freq').val()));
                }

                osc_gain.gain.value = 1 - (e.clientY - $(this).offset().top)/$(this).height();
            });

            $('#gain').change(function() {
                global_gain.gain.value = parseInt($(this).val())/1000;
            });

            $('#toggle-controls').click(function(e) {
                $('#controls').slideToggle('fast');
                e.preventDefault()
                e.stopPropagation();
                return true;
            });

            $('#container').click(function() {
                if($('#controls').css('display') == 'block') {
                    $('#controls').slideUp('fast');
                }
            });

            $('#usage').click(function() {
                $('#modal h1').text('Usage...');
                $('#modal p').html('Slide your finger on the the blue space in the center to play a sine noise !<br /><br />The screen has two axis : the horizontal one determines the pitch of the sound, while the vertical one determines its velocity.');
                $('#modal').fadeIn('fast');
            });

            $('#about').click(function() {
                $('#modal h1').text('About this app...');
                $('#modal p').html('This app has been created by <b>Nicolas Hurtubise</b>. It is distributed under the terms of the MIT License, and it is therefore free as in free speech. Do what you like with it.<br /><br />Also, as the license says, <b>This software is provided "AS IS"</b>. You will be the only responsible if you destroy your speakers with this app.<br /><a href="http://github.com/316k/sinusitis/">Source code available here</a>.');
                $('#modal').fadeIn('fast');
            });

            $('#close-modal').click(function() {
                $('#modal').fadeOut('fast');
            });
});

