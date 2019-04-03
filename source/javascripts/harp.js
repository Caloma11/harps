const scalesIntervals = {

  majorScale: [2, 2, 1, 2, 2, 2, 1],
  naturalMinorScale: [2, 1, 2, 2, 1, 2, 2],
  minorPentatonicScale: [2, 2, 3, 2, 3],
  bluesScale: [3, 2, 1, 1, 3, 2],
  harmonicMinorScale: [2, 1, 2, 2, 1, 3, 2],
  melodicMinorScale: [2, 1, 2, 2, 2, 2, 1],
  ionianScale: [2, 2, 1, 2, 2, 2, 1],
  dorianScale:[2, 1, 2, 2, 2, 1, 2],
  phrygianScale: [1, 2, 2, 2, 1, 2, 2],
  lydianScale: [2, 2, 2, 1, 2, 2, 1],
  mixolydianScale: [2, 2, 1, 2, 2, 1, 2],
  aeolianScale: [2, 1, 2, 2, 1, 2, 2],
  locrianScale: [1, 2, 2, 1, 2, 2, 2],
  wholeToneScale: [2, 2, 2, 2, 2, 2],
  wholeToneDiminished: [2, 1, 2, 1, 2, 1, 2, 1],
  wholeHalfDiminished: [1, 2, 1, 2, 1, 2, 1, 2]
  }


const harpGrid =  [ ['', '', '', '', '', '', '', '', '', 10 ]
  , ['', '', '', '', '', '', '', 3, 6, 11]
  , [1, 3, 5, 1, 3, 5, 1, 3, 5, 1]
  , [2, 5, 7, 2, 4, 6, 7, 2, 4, 6]
  , [1, 6, 10, 1, '', 8, '', '', '', '']
  , ['', 5, 9, '', '', '', '', '', '', '']
  , ['', '', 8, '', '', '', '', '', '', '']
  ]

 const chromaticScale = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B']

  // Reorders a given scale so that it starts with a given note

 function reorder(scale, note) {
 		let array = JSON.parse(JSON.stringify(scale));
 		while (array[0] != note) {
 			array = array.splice(-1).concat(array)
		}
		return array
 }


  // Returns any scale in any given key, given that key and the intervals, which
  // are available in the   constant
 
 	function scaleNotes(note, intervals) {
 		let i = 0
 		let scale = reorder(chromaticScale, note)
 		let notes = [scale[0]]

 		intervals.forEach((interval) => {
  		i += interval;
  		notes.push(scale[i])
		});
		// notes.splice(-1, 1)
		notes.push(scale[0])

		return notes

 	} 


 	// Returns an array, in which every element is
 	// an array representing the notes in a 'row' of the harmonica,
 	// starting from the 'wholestep blow bend row' and going to the 'three halfsteps
 	// draw bend row'


 	function harmonicaDrawer(key) {
 		let majorScale = scaleNotes(key, scalesIntervals['majorScale'])

 		let keyChromaticScale = reorder(chromaticScale, key)

	 	checkIfNoteMajor = function (interval) {
		  return (interval == '') ? interval : majorScale[interval - 1];
		}	
		checkIfNoteChrom = function (interval) {
		  return (interval == '') ? interval : keyChromaticScale[interval];
		}

 		let wBendBlowIntervals = harpGrid[0].map(checkIfNoteChrom)

 		let bendBlowIntervals =  harpGrid[1].map(checkIfNoteChrom)	

	  let blowNotesIntervals = harpGrid[2].map(checkIfNoteMajor)	
	 	
	 	let drawNotesIntervals = harpGrid[3].map(checkIfNoteMajor)	

	  let bendDrawIntervals =  harpGrid[4].map(checkIfNoteChrom)
	  
	  let wBendDrawIntervals =  harpGrid[5].map(checkIfNoteChrom)

	  let whBendDrawIntervals =  harpGrid[6].map(checkIfNoteChrom)

		
	  let harmonicaArray = [wBendBlowIntervals, bendBlowIntervals, blowNotesIntervals, drawNotesIntervals,
  	bendDrawIntervals, wBendDrawIntervals, whBendDrawIntervals]

    return harmonicaArray
		}


// -------------- HTML related content -----------------------



(function(window, document, undefined){

// code that should be taken care of right away

window.onload = init;

  function init(){

    const selectKey = document.getElementById('key');
  
  function fillHarp() {
    let selectedNote = selectKey.value
    let dividedNotes = harmonicaDrawer(selectedNote)
    let notes = [].concat.apply([], dividedNotes);
    let circles = document.querySelectorAll('.circle-text')
    let holes =  Array.prototype.slice.call(circles).slice(10)

    for (i = 0; i < holes.length; i++) {

      if (holes[i].querySelector('p')) {
        holes[i].querySelector('p').innerText = notes[i]
      }
    }

  }

    selectKey.addEventListener('change', (event) => {
      event.preventDefault();
      fillHarp();
    });
  }

})(window, document, undefined);







