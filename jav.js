  const notes = document.querySelectorAll('.note')

  const letter_arr = ["A", "B", "C", "D", "E", "F", "G"]

  notes.forEach((note) => {
    let noteText = note.innerText

    if (noteText.length > 1 &&  noteText[0] == "A") {
      note.innerText = "G#";
    } else if (noteText.length > 1) {
      let index = letter_arr.indexOf(noteText[0]) - 1
      console.log(index)
      note.innerText = letter_arr[index] + "#"
    }
  })
