const scalesIntervals = { majorScale: [2, 2, 1, 2, 2, 2, 1] };

const harpGrid =  [ ['', '', '', '', '', '', '', '', '', 10 ]
  , ['', '', '', '', '', '', '', 3, 6, 11]
  , [1, 3, 5, 1, 3, 5, 1, 3, 5, 1]
  , [2, 5, 7, 2, 4, 6, 7, 2, 4, 6]
  , [1, 6, 10, 1, '', 8, '', '', '', '']
  , ['', 5, 9, '', '', '', '', '', '', '']
  , ['', '', 8, '', '', '', '', '', '', '']
  ];

 const chromaticScale = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];

  // Reorders a given scale so that it starts with a given note

 function reorder(scale, note) {
 		let array = JSON.parse(JSON.stringify(scale));
 		while (array[0] != note) {
 			array = array.splice(-1).concat(array);
		}
		return array
 }


  // Returns any scale in any given key, given that key and the intervals, which
  // are available in the   constant

 	function scaleNotes(note, intervals) {
 		let i = 0
 		const scale = reorder(chromaticScale, note);
 		const notes = [scale[0]];

 		intervals.forEach((interval) => {
  		i += interval;
  		notes.push(scale[i]);
		});
		// notes.splice(-1, 1)
		notes.push(scale[0]);
		return notes
 	}


  const equivalences = {
    "sharps": {
               "C#": "Db",
               "D#": "Eb",
               "F#": "Gb",
               "G#": "Ab",
               "A#": "Bb"
              },
    "flats": {
              "Db":"C#",
              "Eb":"D#",
              "Gb":"F#",
              "Ab":"G#",
              "Bb":"A#"
             }
  };

  createSharps = function (note) {
    if (note == "Db" || note =="Gb") {
      return equivalences["flats"][note];
    }
      return note;
  }


 	// Returns an array, in which every element is
 	// an array representing the notes in a 'row' of the harmonica,
 	// starting from the 'wholestep blow bend row' and going to the 'three halfsteps
 	// draw bend row'


 	function harmonicaDrawer(key) {
 		const majorScale = scaleNotes(key, scalesIntervals['majorScale']);

 		const keyChromaticScale = reorder(chromaticScale, key);

    const oneHalfStepUp = {
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
		  return (interval == '') ? interval : majorScale[interval - 1];
		}
		checkIfNoteChrom = function (interval) {
		  return (interval == '') ? interval : keyChromaticScale[interval];
		}

 		const wBendBlowIntervals = harpGrid[0].map(checkIfNoteChrom).map(createSharps);

 		const bendBlowIntervals =  harpGrid[1].map(checkIfNoteChrom).map(createSharps);

	  const blowNotesIntervals = harpGrid[2].map(checkIfNoteMajor).map(createSharps);

	 	const drawNotesIntervals = harpGrid[3].map(checkIfNoteMajor).map(createSharps);

	  const bendDrawIntervals =  harpGrid[4].map(checkIfNoteChrom).map(createSharps);

	  const wBendDrawIntervals =  harpGrid[5].map(checkIfNoteChrom).map(createSharps);

	  const whBendDrawIntervals =  harpGrid[6].map(checkIfNoteChrom).map(createSharps);


	  const harmonicaArray = [wBendBlowIntervals, bendBlowIntervals, blowNotesIntervals, drawNotesIntervals,
  	bendDrawIntervals, wBendDrawIntervals, whBendDrawIntervals];

    // Puts the overblow notes on their correspondent spots

    const fillOverblows = (harmonicaArray) => {
      [0, 3, 4, 5].forEach((index) => {
        harmonicaArray[1][index] = oneHalfStepUp[harmonicaArray[3][index]];
      })
    }

    // Puts the overbdraw notes on their correspondent spots

    const fillOverdraws = (harmonicaArray) => {
      [6, 8, 9].forEach((index) => {
        harmonicaArray[4][index] = oneHalfStepUp[harmonicaArray[2][index]];
      })
    }

    // Fills the harmonica with the overbends

    fillOverblows(harmonicaArray);
    fillOverdraws(harmonicaArray);

    // Changes the harmonica for sharps and flats if allowed

    const filterHarmonica = (harmonicaArray, option) => {
      const changeEquivalence = (item, option) => {
          if (item in equivalences[option]) {
            return equivalences[option][item];
          }
          return item;
      };
     const filteredHarmonica = harmonicaArray.map( function (arr) {
        return arr.map(function(note) { return changeEquivalence(note, option) });
      });
     return filteredHarmonica
    }

    if (window.sharps) {
      return filterHarmonica(harmonicaArray, "flats");
    } else if (window.flats) {
      return filterHarmonica(harmonicaArray, "sharps");
    }

    return harmonicaArray
		}

    // Finds the harmonica key for a given song key and a given harmonica "position"

    const circleOfFiths = ["C", "G", "D", "A", "E", "B", "Gb", "Db", "Ab", "Eb","Bb", "F"]

    function findHarpKey(songKey, position) {
      const result = position == 1 ?
      songKey :
      reorder(circleOfFiths, songKey).reverse()[position - 2];
      return `${createSharps(result)} harmonica`
    }

    // Finds the song key for a given harmonica key and a given harmonica "position"

    function findSongKey(harpKey, position) {
      const scale = reorder(circleOfFiths, harpKey);
      const result = scale[position - 1];
      return `Key of ${createSharps(result)}`
    }

    // Finds the harmonica "position" for a given harmonica key and a given song key

    function findPosition(songKey, harpKey) {

    const fancyNames = { 1: "1st",
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
                         12:  "12th"
                        };

      let scale = reorder(circleOfFiths, harpKey);
      return `${fancyNames[scale.indexOf(songKey) + 1]} position`
    }


// -------------- HTML related content -----------------------


(function(window, document, undefined){

window.onload = init;

  function init(){

    // Sets the global variable for default notes layout

    window.default = true;

    // Selected option for key of harmonica to be displayed on the main container

    const selectKey = document.getElementById('key');

    // Button, selected harmonica key, selected song key and Paragraph to hold the result,
    // for finding a position

    const posButton = document.getElementById('pos-button');
    const posHarp = document.getElementById('pos-harp-key');
    const posSong = document.getElementById('pos-song-key');
    const posResult = document.getElementById('pos-result');

    // Button,selected song key, position and Paragraph to hold the result,
    // for finding a harmonica key

    const harpButton = document.getElementById('harp-button');
    const harpSong = document.getElementById('harp-song-key');
    const harpPos = document.getElementById('harp-pos');
    const harpResult = document.getElementById('harp-result')

    // Button, selected harmonica key, position and Paragraph to hold the result,
    // for finding a song key

    const songButton = document.getElementById('song-button');
    const songHarp = document.getElementById('song-harp-key');
    const songPos = document.getElementById('song-pos');
    const songResult = document.getElementById('song-result');

    // Puts the notes on their correspondent holes

  function fillHarp() {
    let selectedNote = selectKey.value;
    let dividedNotes = harmonicaDrawer(selectedNote);
    let notes = [].concat.apply([], dividedNotes);
    let circles = document.querySelectorAll('.circle-text');
    let holes =  Array.prototype.slice.call(circles).slice(10);

    for (i = 0; i < holes.length; i++) {

      if (holes[i].querySelector('p')) {
        holes[i].querySelector('p').innerText = notes[i];
      }
    }

  }

    // Binds the button to draw the harmonica

    selectKey.addEventListener('change', (event) => {
      fillHarp();
    }, {capture: true, passive: true});

    // Binds the button to find the position

    posButton.addEventListener('click', (event) => {
      let songKey = posSong.value;
      let harpKey = posHarp.value;
      posResult.innerText = findPosition(songKey, harpKey);
    });

    // Binds the button to find the harmonica key

    harpButton.addEventListener('click', (event) => {
      let songKey = harpSong.value;
      let position = harpPos.value;
      harpResult.innerText = findHarpKey(songKey, position);
    });

    // Binds the button to find the song key

    songButton.addEventListener('click', (event) => {
      let harpKey = songHarp.value;
      let position = songPos.value;
      songResult.innerText = findSongKey(harpKey, position);
    });

    // ------- Overbends -------

    // Allows overblows to be displayed

    const toggleOverblows = () => {
      const blowBendReedNotes = document.querySelectorAll('.reed')[2].querySelectorAll('.circle-text');
      [0, 3, 4, 5].forEach((index) => {
        blowBendReedNotes[index].classList.toggle("invisible");
      })
    }

    // Allows overdraws to be displayed

    const toggleOverdraws = () => {
      const halfStepDrawBendNotes = document.querySelectorAll('.reed')[5].querySelectorAll('.circle-text');
      [6, 8, 9].forEach((index) => {
        halfStepDrawBendNotes[index].classList.toggle("invisible");
      })
    }

    // Binds the overbends switches to their correspondent functions

    overblowsSwitch = document.getElementById("overblows-switch");
    overdrawsSwitch = document.getElementById("overdraws-switch");

    overblowsSwitch.addEventListener('change', (event) => {
      toggleOverblows();
    });

    overdrawsSwitch.addEventListener('change', (event) => {
      toggleOverdraws();
    });

    // Binds the sharps and flats switches to change global variable, making sure
    // they switch off one another

    defaultRadio = document.getElementById("defaultRadio");
    sharpsRadio = document.getElementById("sharpsRadio");
    flatsRadio = document.getElementById("flatsRadio");

    sharpsRadio.addEventListener('change', (event) => {
      window.sharps = true;
      window.default = false;
      window.flats = false;
      fillHarp();
    });

    flatsRadio.addEventListener('change', (event) => {
      window.flats = true
      window.sharps = false;
      window.default = false;
      fillHarp();
    });

    defaultRadio.addEventListener('change', (event) => {
      window.default = true
      window.sharps = false;
      window.flats = false;
      fillHarp();
    });

  }

})(window, document, undefined);
