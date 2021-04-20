/**
 * Encapsulate all the functions related to the Compare function under manual Mode
 */
function ManualCompare (pitchFrequency,currentTuning,stringIndex) {
  console.log(pitchFrequency)
  const frequencies = currentTuning.frequencies
    if (stringIndex < 0 || !stringIndex === undefined) return;
    const currentStringFrequency = frequencies[stringIndex];
    const centsOffset = Math.round(
      1200 * Math.log2(pitchFrequency / currentStringFrequency)
    );
    return centsOffset
    //input the note to map its corresponding MIDInotes value
  }
export {ManualCompare}
  