const  tunningObjs = [{
    name:"Standard",
    strings:['E','A','D','G','B','E'],
    fileSrc:[require('./standard/E_6th.wav'),require('./standard/A_5th.wav'), require('./standard/D_4th.wav'),require('./standard/G_3th.wav'),require('./standard/B_2nd.wav'),require('./standard/E_1st.wav')],
    MIDInotes:['E2','A2','D3','G3','B3','E4']
},
{
    name:"Drop D",
    strings:['D', 'A', 'D' ,'G', 'B', 'E'],
    MIDInotes:['D2','A2','D3','G3','B3','E4']
},

{
    name:"Drop C",
    strings:['C', 'G', 'C', 'F', 'A', 'D'],
    MIDInotes:['C2','G2','C3','F3','A3','D4']
},
{
    name:"Open C",
    strings:['C' ,'G', 'C', 'G', 'C' ,'E'],
    MIDInotes:['C2' ,'G2', 'C3', 'G3', 'C4' ,'E4']
},
{
    name:"Open D",
    strings:['D' ,'A', 'D', 'F<sup>#</sup>', 'A' ,'D'],
    MIDInotes:['D2' ,'A2', 'D3', 'F#3', 'A3' ,'D4']
},
{
    name:"Open G",
    strings:['D' ,'G', 'D', 'G', 'B' ,'D'],
    MIDInotes:['D2' ,'G2', 'D3', 'G3', 'B3' ,'D4']
}
]
export default tunningObjs