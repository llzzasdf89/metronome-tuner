const  tunningObjs = [{
    name:"Standard",
    strings:['E','A','D','G','B','E'],
    fileSrc:[require('./standard/E_6th.wav'),require('./standard/A_5th.wav'), require('./standard/D_4th.wav'),require('./standard/G_3th.wav'),require('./standard/B_2nd.wav'),require('./standard/E_1st.wav')]
},
{
    name:"Drop D",
    strings:['D', 'A', 'D' ,'G', 'B', 'E']
},
{
    name:"Drop C<sup>#</sup>",
    strings:['C<sup>#</sup>', 'A', 'D', 'G', 'B', 'E']
}
,
{
    name:"Drop C",
    strings:['C', 'G', 'C', 'F', 'A', 'D']
},
{
    name:"Drop B",
    strings:['B' ,'G', 'B', 'E', 'A<sup>b</sup>' ,'D<sup>b</sup>']
},
{
    name:"Drop A",
    strings:['A' ,'E', 'A', 'D', 'G<sup>b</sup>' ,'B']
},
{
    name:"Open C",
    strings:['C' ,'G', 'C', 'G', 'C' ,'E']
},
{
    name:"Open D",
    strings:['D' ,'A', 'D', 'F<sup>#</sup>', 'A' ,'D']
},
{
    name:"Open E",
    strings:['E' ,'B', 'E', 'G<sup>#</sup>', 'B' ,'E']
}

]
export default tunningObjs