var writer;
var isCharVisible;
var isOutlineVisible;

var drawDisabled = false

function printStrokePoints(data) {
  var pointStrs = data.drawnPath.points.map((point) => `{x: ${point.x}, y: ${point.y}}`);
  console.log(`[${pointStrs.join(', ')}]`);
}

function updateCharacter() {
  document.querySelector('#target').innerHTML = '';

  var character = document.querySelector('.js-char').value;
  window.location.hash = character;
  writer = HanziWriter.create('target', character, {
    width: 400,
    height: 400,
    renderer: 'svg',
    onCorrectStroke: printStrokePoints,
    onMistake: printStrokePoints,
    showCharacter: false,
    charDataLoader: function(character, onComplete) {
      let data = {
        "strokes": [
          "M 330 202 Q 361 175 399 134 Q 415 119 424 118 Q 433 118 439 128 Q 446 138 442 170 Q 435 206 361 247 L 319 270 Q 292 286 258 304 Q 237 314 240 335 Q 261 393 281 453 L 293 492 Q 317 568 337 644 Q 347 690 366 715 Q 379 737 373 750 Q 360 769 313 797 Q 294 810 276 801 Q 263 794 273 778 Q 303 733 247 486 L 236 442 Q 218 373 195 336 Q 185 314 206 296 Q 254 268 294 233 L 330 202 Z",
          "M 294 233 Q 287 226 281 217 Q 250 180 196 143 Q 183 134 165 124 Q 149 114 133 104 Q 120 95 131 92 Q 212 86 327 199 Q 328 200 330 202 L 361 247 Q 406 322 421 385 Q 449 488 463 510 Q 473 526 458 537 Q 416 576 387 569 Q 374 565 378 550 Q 387 531 387 507 L 385 481 Q 384 469 382 455 Q 375 376 319 270 L 294 233 Z",
          "M 387 507 Q 341 501 293 492 L 247 486 Q 183 479 115 468 Q 94 465 61 471 Q 48 471 45 462 Q 41 450 49 441 Q 68 422 96 400 Q 106 396 118 402 Q 190 436 236 442 L 281 453 Q 320 463 362 474 Q 372 478 385 481 C 414 489 417 511 387 507 Z",
          "M 671 521 Q 788 635 822 648 Q 843 655 835 672 Q 831 688 760 725 Q 739 735 716 725 Q 661 703 575 676 Q 553 669 498 669 Q 473 669 482 648 Q 491 635 511 623 Q 544 605 578 627 Q 597 636 691 676 Q 706 682 719 673 Q 732 664 726 649 Q 693 595 655 531 C 640 505 649 500 671 521 Z",
          "M 717 430 Q 702 497 671 521 L 655 531 Q 648 535 640 538 Q 618 547 608 540 Q 595 533 608 519 Q 645 491 653 444 Q 656 434 659 421 L 668 384 Q 701 204 658 103 Q 643 76 607 83 Q 576 89 548 94 Q 536 97 542 85 Q 546 78 564 65 Q 604 31 618 5 Q 628 -14 645 -11 Q 660 -10 687 17 Q 775 107 726 391 L 717 430 Z",
          "M 726 391 Q 783 397 947 397 Q 966 398 971 406 Q 977 416 960 430 Q 909 467 848 454 Q 793 445 717 430 L 659 421 Q 562 409 452 393 Q 431 392 447 375 Q 460 362 478 357 Q 497 351 514 356 Q 586 375 668 384 L 726 391 Z"
        ],
        "medians": [
          [
            [
              282,
              788
            ],
            [
              307,
              769
            ],
            [
              327,
              733
            ],
            [
              264,
              465
            ],
            [
              216,
              321
            ],
            [
              235,
              298
            ],
            [
              386,
              194
            ],
            [
              411,
              166
            ],
            [
              424,
              133
            ]
          ],
          [
            [
              390,
              556
            ],
            [
              417,
              530
            ],
            [
              424,
              516
            ],
            [
              422,
              504
            ],
            [
              387,
              361
            ],
            [
              338,
              255
            ],
            [
              304,
              207
            ],
            [
              260,
              165
            ],
            [
              206,
              127
            ],
            [
              137,
              97
            ]
          ],
          [
            [
              59,
              457
            ],
            [
              107,
              434
            ],
            [
              373,
              491
            ],
            [
              380,
              501
            ]
          ],
          [
            [
              493,
              656
            ],
            [
              517,
              646
            ],
            [
              550,
              644
            ],
            [
              680,
              692
            ],
            [
              706,
              699
            ],
            [
              743,
              696
            ],
            [
              771,
              669
            ],
            [
              765,
              657
            ],
            [
              677,
              546
            ],
            [
              674,
              535
            ],
            [
              663,
              536
            ]
          ],
          [
            [
              613,
              530
            ],
            [
              637,
              519
            ],
            [
              659,
              499
            ],
            [
              674,
              474
            ],
            [
              687,
              432
            ],
            [
              711,
              289
            ],
            [
              709,
              166
            ],
            [
              692,
              92
            ],
            [
              672,
              59
            ],
            [
              648,
              41
            ],
            [
              551,
              85
            ]
          ],
          [
            [
              449,
              384
            ],
            [
              504,
              377
            ],
            [
              860,
              427
            ],
            [
              906,
              426
            ],
            [
              960,
              412
            ]
          ]
        ],
        "radStrokes": [
          0,
          1,
          2
        ]
      }
      data.radStrokes = Array.from({
        length: data.medians.length
      }, (v, i) => i);
      onComplete(data)
    }
  });
  isCharVisible = true;
  isOutlineVisible = true;
  window.writer = writer;
}

window.onload = function () {
  var char = decodeURIComponent(window.location.hash.slice(1));
  if (char) {
    document.querySelector('.js-char').value = char;
  }

  updateCharacter();

  document.querySelector('.js-char-form').addEventListener('submit', function (evt) {
    evt.preventDefault();
    updateCharacter();
  });

  document.querySelector('.js-toggle').addEventListener('click', function () {
    isCharVisible ? writer.hideCharacter() : writer.showCharacter();
    isCharVisible = !isCharVisible;
  });
  document.querySelector('.js-toggle-hint').addEventListener('click', function () {
    isOutlineVisible ? writer.hideOutline() : writer.showOutline();
    isOutlineVisible = !isOutlineVisible;
  });
  document.querySelector('.js-animate').addEventListener('click', function () {
    writer.animateCharacter({
      highlightColor: '#166E16',
    });
  });
  document.querySelector('.js-quiz').addEventListener('click', function () {
    writer.quiz({
      showOutline: true,
    });
  });
  document.querySelector('.js-disabled').addEventListener('click', function () {
    drawDisabled = !drawDisabled;
    writer.setDisableDraw({
      disabled: drawDisabled,
    });
  });
  document.querySelector('.js-debug').addEventListener('click', function () {
    let arr = [{"x":133.5,"y":83},{"x":131.5,"y":89},{"x":129.5,"y":94},{"x":128.5,"y":103},{"x":126.5,"y":111},{"x":124.5,"y":119},{"x":121.5,"y":126},{"x":120.5,"y":132},{"x":118.5,"y":138},{"x":116.5,"y":141},{"x":116.5,"y":144},{"x":115.5,"y":147},{"x":114.5,"y":150},{"x":112.5,"y":153},{"x":111.5,"y":158},{"x":109.5,"y":161},{"x":106.5,"y":166},{"x":104.5,"y":169},{"x":103.5,"y":173},{"x":102.5,"y":175},{"x":101.5,"y":176},{"x":101.5,"y":178},{"x":100.5,"y":180},{"x":99.5,"y":182},{"x":99.5,"y":184},{"x":97.5,"y":187},{"x":96.5,"y":189},{"x":95.5,"y":192},{"x":95.5,"y":194},{"x":94.5,"y":196},{"x":93.5,"y":198},{"x":93.5,"y":200},{"x":93.5,"y":201},{"x":92.5,"y":203},{"x":92.5,"y":204},{"x":92.5,"y":205},{"x":91.5,"y":206},{"x":91.5,"y":208},{"x":91.5,"y":210},{"x":91.5,"y":211},{"x":91.5,"y":212},{"x":91.5,"y":213},{"x":91.5,"y":214},{"x":91.5,"y":216},{"x":91.5,"y":217},{"x":91.5,"y":218},{"x":91.5,"y":219},{"x":91.5,"y":220},{"x":93.5,"y":220},{"x":95.5,"y":223},{"x":98.5,"y":225},{"x":101.5,"y":227},{"x":103.5,"y":228},{"x":104.5,"y":229},{"x":105.5,"y":230},{"x":106.5,"y":232},{"x":109.5,"y":234},{"x":113.5,"y":238},{"x":119.5,"y":244},{"x":123.5,"y":248},{"x":128.5,"y":252},{"x":133.5,"y":254},{"x":136.5,"y":256},{"x":138.5,"y":258},{"x":139.5,"y":258},{"x":140.5,"y":258},{"x":142.5,"y":259},{"x":144.5,"y":260},{"x":146.5,"y":261},{"x":148.5,"y":262},{"x":150.5,"y":263},{"x":151.5,"y":263},{"x":152.5,"y":264},{"x":153.5,"y":264},{"x":153.5,"y":265},{"x":154.5,"y":265},{"x":154.5,"y":266},{"x":154.5,"y":267},{"x":155.5,"y":267}]
    for(let i = 0;i<arr.length;i++){
      if(i === 0){
        writer.penOpen(arr[i], 0)
      }else if(i === arr.length-1) {
        writer.penOpen(arr[i], 2)
      }else{
        writer.penOpen(arr[i], 1)
      }

    }
  });
};
