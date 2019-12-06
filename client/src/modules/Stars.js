import React from 'react'

let randNumTop = '';
let randNumRight = '';
let starsMap = []

const makeStars = () => {

    let stars = []
    for(let i = 0; i < 500; i++){
        randNumTop = Math.random() * 100;
        randNumRight = Math.random() * 100;
        // console.log(randNumTop, randNumRight)
        stars.push({
            id: i,
            top: randNumTop,
            right: randNumRight
        })
    }
    // console.log(stars)
    return stars
}

const handleGenStars = () => {
    let starsArray = makeStars();
    starsMap = starsArray.map(item => 
            <div className="Weather-stars" 
            key={`star-id=${item.id}`}
            style={{top: `${item.top}%`, right: `${item.right}%`}}>
            </div>
        )
        
}

// let starsMap = new Promise((resolve, reject) => {
//     let stars = [];
    
//     // console.log(stars);
//     resolve(stars)
// }).then((res) => {
//     starsMap = res.map(item =>
//         <div className="Weather-stars" 
//         key={`star-id=${item.id}`}
//         style={{top: `${randNumTop}%`, right: `${randNumRight}%`}}>
//         </div>
//     )
//     // console.log(starsMap)
// }).catch(err => console.log(err))

// const handleGenStars = () => {
//     let stars = [];
//     let randNumTop  = Math.random() * 100;
//     let randNumRight  = Math.random() * 100;

//     for(let i = 0; i < 500; i++){
//         stars.unshift({
//             id: i,
//             top: randNumTop,
//             right: randNumRight
//         })
//     }
//     // console.log(stars);
//     // return stars;
//     starsMap = stars.map(item =>
//             <div className="Weather-stars" 
//             key={`star-id=${item.id}`}
//             style={{top: `${randNumTop}%`, right: `${randNumRight}%`}}>
//             </div>
//         )
//         console.log(starsMap)
// }





export { starsMap, handleGenStars };
