/* eslint-disable */

const promo1 = document.getElementById('ink-wrapper-1');
const promo2 = document.getElementById('ink-wrapper-2');

const promo1Normal = document.getElementById('wrapper-1');
const promo2Normal = document.getElementById('wrapper-2');

const text = document.getElementsByClassName('test-text');

let state = 'startState';

function change() {
    if (state === "startState") {
        $('#ink-wrapper-1').wScratchPad({
            size: 40,
            bg: '../assets/images/carnera-side.jpg',
            realtime: true,
            fg: '../assets/images/carnera-face.jpg',
            cursor: 'none'
        });

        $('#ink-wrapper-2').wScratchPad({
            size: 40,
            bg: '../assets/images/carnera-side.jpg',
            realtime: true,
            fg: '../assets/images/carnera-face.jpg',
            cursor: 'none'
        });
    }

    if (state === 'normal' || state === "startState") {
        promo1.style.display = 'block';
        promo2.style.display = 'block';
        promo1Normal.style.display = 'none';
        promo2Normal.style.display = 'none';
        document.body.style.backgroundColor = "#000";
        state = "special"
        for (var i = 0; i < text.length; i++) {
            text[i].style.color = 'white';
        }
    } else {
        promo1.style.display = 'none';
        promo2.style.display = 'none';
        promo1Normal.style.display = 'block';
        promo2Normal.style.display = 'block';
        document.body.style.backgroundColor = "#e0dad5";
        state = "normal"
    }
}