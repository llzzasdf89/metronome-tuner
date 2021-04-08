
const sixteenth = {
    name:"sixteenth",
    isActived:false,
    id:4,
    correspondingNum:1/16,
    iconName:"mdi-music-note-sixteenth",
    subdivisions:[]
}
const eighth = {
    name:"eighth",
  isActived:false,
  id:3,
  correspondingNum:1/8,
  iconName:"mdi-music-note-eighth",
  subdivisions:[sixteenth]
}
const quarter = {
    name:"quarter",
    isActived:true,
    id:2,
    correspondingNum:1/4,
    iconName:"mdi-music-note-quarter",
    subdivisions:[eighth,sixteenth]
}
const half = {
    name:"half",
    isActived:false,
    id:1,
    correspondingNum:1/2,
    iconName:"mdi-music-note-half",
    subdivisions:[quarter,eighth]
}
const whole = {
    name:"whole",
    isActived:false,
    correspondingNum:1,
    id:0,
    iconName:"mdi-music-note-whole",
    subdivisions:[half,quarter]
}
whole.subdivisions.unshift(whole)
half.subdivisions.unshift(half)
quarter.subdivisions.unshift(quarter)
eighth.subdivisions.unshift(eighth)
sixteenth.subdivisions.unshift(sixteenth)
export const musicNotes = [
    whole,half,quarter,eighth,sixteenth
]