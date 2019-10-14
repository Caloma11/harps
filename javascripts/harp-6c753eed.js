'use strict';

var scalesIntervals = {

  majorScale: [2, 2, 1, 2, 2, 2, 1] //,
  // naturalMinorScale: [2, 1, 2, 2, 1, 2, 2],
  // minorPentatonicScale: [2, 2, 3, 2, 3],
  // bluesScale: [3, 2, 1, 1, 3, 2],
  // harmonicMinorScale: [2, 1, 2, 2, 1, 3, 2],
  // melodicMinorScale: [2, 1, 2, 2, 2, 2, 1],
  // ionianScale: [2, 2, 1, 2, 2, 2, 1],
  // dorianScale:[2, 1, 2, 2, 2, 1, 2],
  // phrygianScale: [1, 2, 2, 2, 1, 2, 2],
  // lydianScale: [2, 2, 2, 1, 2, 2, 1],
  // mixolydianScale: [2, 2, 1, 2, 2, 1, 2],
  // aeolianScale: [2, 1, 2, 2, 1, 2, 2],
  // locrianScale: [1, 2, 2, 1, 2, 2, 2],
  // wholeToneScale: [2, 2, 2, 2, 2, 2],
  // wholeToneDiminished: [2, 1, 2, 1, 2, 1, 2, 1],
  // wholeHalfDiminished: [1, 2, 1, 2, 1, 2, 1, 2]
};

var harpGrid = [['', '', '', '', '', '', '', '', '', 10], ['', '', '', '', '', '', '', 3, 6, 11], [1, 3, 5, 1, 3, 5, 1, 3, 5, 1], [2, 5, 7, 2, 4, 6, 7, 2, 4, 6], [1, 6, 10, 1, '', 8, '', '', '', ''], ['', 5, 9, '', '', '', '', '', '', ''], ['', '', 8, '', '', '', '', '', '', '']];

var chromaticScale = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// Reorders a given scale so that it starts with a given note

function reorder(scale, note) {
  var array = JSON.parse(JSON.stringify(scale));
  while (array[0] != note) {
    array = array.splice(-1).concat(array);
  }
  return array;
}

// Returns any scale in any given key, given that key and the intervals, which
// are available in the   constant

function scaleNotes(note, intervals) {
  var i = 0;
  var scale = reorder(chromaticScale, note);
  var notes = [scale[0]];

  intervals.forEach(function (interval) {
    i += interval;
    notes.push(scale[i]);
  });
  // notes.splice(-1, 1)
  notes.push(scale[0]);

  return notes;
}

// Returns an array, in which every element is
// an array representing the notes in a 'row' of the harmonica,
// starting from the 'wholestep blow bend row' and going to the 'three halfsteps
// draw bend row'

function harmonicaDrawer(key) {
  var majorScale = scaleNotes(key, scalesIntervals['majorScale']);

  var keyChromaticScale = reorder(chromaticScale, key);

  var oneHalfStepUp = {
    "C": "C#",
    "C#": "D",
    "D": "Eb",
    "Eb": "E",
    "E": "F",
    "F": "F#",
    "F#": "G",
    "G": "Ab",
    "Ab": "A",
    "A": "Bb",
    "Bb": "B",
    "B": "C"
  };

  checkIfNoteMajor = function (interval) {
    return interval == '' ? interval : majorScale[interval - 1];
  };
  checkIfNoteChrom = function (interval) {
    return interval == '' ? interval : keyChromaticScale[interval];
  };

  createSharps = function (note) {
    if (note == "Db") {
      return "C#";
    } else if (note == "Gb") {
      return "F#";
    } else {
      return note;
    }
  };

  var wBendBlowIntervals = harpGrid[0].map(checkIfNoteChrom).map(createSharps);

  var bendBlowIntervals = harpGrid[1].map(checkIfNoteChrom).map(createSharps);

  var blowNotesIntervals = harpGrid[2].map(checkIfNoteMajor).map(createSharps);

  var drawNotesIntervals = harpGrid[3].map(checkIfNoteMajor).map(createSharps);

  var bendDrawIntervals = harpGrid[4].map(checkIfNoteChrom).map(createSharps);

  var wBendDrawIntervals = harpGrid[5].map(checkIfNoteChrom).map(createSharps);

  var whBendDrawIntervals = harpGrid[6].map(checkIfNoteChrom).map(createSharps);

  var harmonicaArray = [wBendBlowIntervals, bendBlowIntervals, blowNotesIntervals, drawNotesIntervals, bendDrawIntervals, wBendDrawIntervals, whBendDrawIntervals];

  // Puts the overblow notes on their correspondent spots

  var fillOverblows = function fillOverblows(harmonicaArray) {
    [0, 3, 4, 5].forEach(function (index) {
      harmonicaArray[1][index] = oneHalfStepUp[harmonicaArray[3][index]];
    });
  };

  // Puts the overbdraw notes on their correspondent spots

  var fillOverdraws = function fillOverdraws(harmonicaArray) {
    [6, 8, 9].forEach(function (index) {
      harmonicaArray[4][index] = oneHalfStepUp[harmonicaArray[2][index]];
    });
  };

  // Fills the harmonica with the overbends

  fillOverblows(harmonicaArray);
  fillOverdraws(harmonicaArray);

  return harmonicaArray;
}

// Finds the harmonica key for a given song key and a given harmonica "position"

var circleOfFiths = ["C", "G", "D", "A", "E", "B", "Gb", "Db", "Ab", "Eb", "Bb", "F"];
var subst = { "Db": "C#", "Gb": "F#" };

function findHarpKey(songKey, position) {
  if (position == 1) {
    return (songKey == "Gb" || songKey == "Db" ? subst[songKey] : songKey) + ' harmonica';
  } else {
    var scale = reorder(circleOfFiths, songKey);
    var preResult = scale.reverse()[position - 2];
    var result = preResult == "Gb" || preResult == "Db" ? subst[preResult] : preResult;
    return result + ' harmonica';
  }
}

// Finds the song key for a given harmonica key and a given harmonica "position"

function findSongKey(harpKey, position) {
  var scale = reorder(circleOfFiths, harpKey);
  var preResult = scale[position - 1];
  var result = preResult == "Gb" || preResult == "Db" ? subst[preResult] : preResult;
  return 'Key of ' + result;
}

// Finds the harmonica "position" for a given harmonica key and a given song key

function findPosition(songKey, harpKey) {

  var fancyNames = { 1: "1st",
    2: "2nd",
    3: "3rd",
    4: "4th",
    5: "5th",
    6: "6th",
    7: "7th",
    8: "8th",
    9: "9th",
    10: "10th",
    11: "11th",
    12: "12th"
  };

  var scale = reorder(circleOfFiths, harpKey);
  return fancyNames[scale.indexOf(songKey) + 1] + ' position';
}

// -------------- HTML related content -----------------------

(function (window, document, undefined) {

  window.onload = init;

  function init() {

    // Selected option for key of harmonica to be displayed on the main container

    var selectKey = document.getElementById('key');

    // Button, selected harmonica key, selected song key and Paragraph to hold the result,
    // for finding a position

    var posButton = document.getElementById('pos-button');
    var posHarp = document.getElementById('pos-harp-key');
    var posSong = document.getElementById('pos-song-key');
    var posResult = document.getElementById('pos-result');

    // Button,selected song key, position and Paragraph to hold the result,
    // for finding a harmonica key

    var harpButton = document.getElementById('harp-button');
    var harpSong = document.getElementById('harp-song-key');
    var harpPos = document.getElementById('harp-pos');
    var harpResult = document.getElementById('harp-result');

    // Button, selected harmonica key, position and Paragraph to hold the result,
    // for finding a song key

    var songButton = document.getElementById('song-button');
    var songHarp = document.getElementById('song-harp-key');
    var songPos = document.getElementById('song-pos');
    var songResult = document.getElementById('song-result');

    // Puts the notes on their correspondent holes

    function fillHarp() {
      var selectedNote = selectKey.value;
      var dividedNotes = harmonicaDrawer(selectedNote);
      var notes = [].concat.apply([], dividedNotes);
      var circles = document.querySelectorAll('.circle-text');
      var holes = Array.prototype.slice.call(circles).slice(10);

      for (i = 0; i < holes.length; i++) {

        if (holes[i].querySelector('p')) {
          holes[i].querySelector('p').innerText = notes[i];
        }
      }
    }

    // Binds the button to draw the harmonica

    selectKey.addEventListener('change', function (event) {
      fillHarp();
    }, { capture: true, passive: true });

    // Binds the button to find the position

    posButton.addEventListener('click', function (event) {
      var songKey = posSong.value;
      var harpKey = posHarp.value;
      posResult.innerText = findPosition(songKey, harpKey);
    });

    // Binds the button to find the harmonica key

    harpButton.addEventListener('click', function (event) {
      var songKey = harpSong.value;
      var position = harpPos.value;
      harpResult.innerText = findHarpKey(songKey, position);
    });

    // Binds the button to find the song key

    songButton.addEventListener('click', function (event) {
      var harpKey = songHarp.value;
      var position = songPos.value;
      songResult.innerText = findSongKey(harpKey, position);
    });

    // ------- Overbends -------

    // Allows overblows to be displayed

    var toggleOverblows = function toggleOverblows() {
      var blowBendReedNotes = document.querySelectorAll('.reed')[2].querySelectorAll('.circle-text');
      [0, 3, 4, 5].forEach(function (index) {
        blowBendReedNotes[index].classList.toggle("invisible");
      });
    };

    // Allows overdraws to be displayed

    var toggleOverdraws = function toggleOverdraws() {
      var halfStepDrawBendNotes = document.querySelectorAll('.reed')[5].querySelectorAll('.circle-text');
      [6, 8, 9].forEach(function (index) {
        halfStepDrawBendNotes[index].classList.toggle("invisible");
      });
    };

    // Binds the switches with their correspondent functions

    overblowsSwitch = document.getElementById("overblows-switch");
    overdrawsSwitch = document.getElementById("overdraws-switch");

    overblowsSwitch.addEventListener('change', function (event) {
      toggleOverblows();
    });

    overdrawsSwitch.addEventListener('change', function (event) {
      toggleOverdraws();
    });
  }
})(window, document, undefined);
