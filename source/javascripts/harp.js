const scales_intervals = {

  major_scale: [2, 2, 1, 2, 2, 2, 1],
  natural_minor_scale: [2, 1, 2, 2, 1, 2, 2],
  minor_pentatonic_scale: [2, 2, 3, 2, 3],
  blues_scale: [3, 2, 1, 1, 3, 2],
  harmonic_minor_scale: [2, 1, 2, 2, 1, 3, 2],
  melodic_minor_scale: [2, 1, 2, 2, 2, 2, 1],
  ionian_scale: [2, 2, 1, 2, 2, 2, 1],
  dorian_scale:[2, 1, 2, 2, 2, 1, 2],
  phrygian_scale: [1, 2, 2, 2, 1, 2, 2],
  lydian_scale: [2, 2, 2, 1, 2, 2, 1],
  mixolydian_scale: [2, 2, 1, 2, 2, 1, 2],
  aeolian_scale: [2, 1, 2, 2, 1, 2, 2],
  locrian_scale: [1, 2, 2, 1, 2, 2, 2],
  whole_tone_scale: [2, 2, 2, 2, 2, 2],
  whole_tone_diminished: [2, 1, 2, 1, 2, 1, 2, 1],
  whole_half_diminished: [1, 2, 1, 2, 1, 2, 1, 2]
  }


const harp_grid =  [ ['', '', '', '', '', '', '', '', '', 10 ]
  , ['', '', '', '', '', '', '', 3, 6, 11]
  , [1, 3, 5, 1, 3, 5, 1, 3, 5, 1]
  , [2, 5, 7, 2, 4, 6, 7, 2, 4, 6]
  , [1, 6, 10, 1, '', 8, '', '', '', '']
  , ['', 5, 9, '', '', '', '', '', '', '']
  , ['', '', 8, '', '', '', '', '', '', '', '']
  ]

 const chromatic_scale = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B']

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
 
 	function scale_notes(note, intervals) {
 		let i = 0
 		let scale = reorder(chromatic_scale, note)
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


 	function harmonica_drawer(key) {
 		let major_scale = scale_notes(key, scales_intervals['major_scale'])

 		let key_chromatic_scale = reorder(chromatic_scale, key)

	 	checkIfNoteMajor = function (interval) {
		  return (interval == '') ? interval : major_scale[interval - 1];
		}	
		checkIfNoteChrom = function (interval) {
		  return (interval == '') ? interval : key_chromatic_scale[interval];
		}

 		let w_bend_blow_intervals = harp_grid[0].map(checkIfNoteChrom)

 		let bend_blow_intervals =  harp_grid[1].map(checkIfNoteChrom)	

	  let blow_notes_intervals = harp_grid[2].map(checkIfNoteMajor)	
	 	
	 	let draw_notes_intervals = harp_grid[3].map(checkIfNoteMajor)	

	  let bend_draw_intervals =  harp_grid[4].map(checkIfNoteChrom)
	  
	  let w_bend_draw_intervals =  harp_grid[5].map(checkIfNoteChrom)

	  let wh_bend_draw_intervals =  harp_grid[6].map(checkIfNoteChrom)

		
	  harmonarray = [w_bend_blow_intervals, bend_blow_intervals, blow_notes_intervals, draw_notes_intervals,
  	bend_draw_intervals, w_bend_draw_intervals, wh_bend_draw_intervals]

  	console.log(harmonarray)

		}


// -------------- HTML related content -----------------------



(function(window, document, undefined){

// code that should be taken care of right away

window.onload = init;

  function init(){
  	const selectKey = document.getElementById('key');
		const fo = document.querySelector('.note')
		console.log(fo)

		selectKey.addEventListener('change', (event) => {
			event.preventDefault();
		  console.log('Pee is stored in the balls')
		});

    // the code to be called when the dom has loaded
    // #document has its nodes
  }

})(window, document, undefined);