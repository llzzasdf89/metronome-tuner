const  tunningObjs = [{
    name:"Standard",
    strings:['E','A','D','G','B','E'],
    fileSrc:[require('./media/E_6th.wav'),require('./media/A_5th.wav'), require('./media/D_4th.wav'),require('./media/G_3th.wav'),require('./media/B_2nd.wav'),require('./media/E_1st.wav')],
    MIDInotes:['E2','A2','D3','G3','B3','E4']
},
{
    name:"Drop D",
    strings:['D', 'A', 'D' ,'G', 'B', 'E'],
    fileSrc:[require('./media/D2_6th.wav'),require('./media/A_5th.wav'), require('./media/D_4th.wav'),require('./media/G_3th.wav'),require('./media/B_2nd.wav'),require('./media/E_1st.wav')],
    MIDInotes:['D2','A2','D3','G3','B3','E4']
},

{
    name:"Drop C",
    strings:['C', 'G', 'C', 'F', 'A', 'D'],
    MIDInotes:['C2','G2','C3','F3','A3','D4'],
    fileSrc:[require('./media/C2_6th.wav'),require('./media/G2_5th.wav'), require('./media/C3_4th.wav'),require('./media/F3_3rd.wav'),require('./media/A3_2nd.wav'),require('./media/D4_1st.wav')],
}
]
export default tunningObjs