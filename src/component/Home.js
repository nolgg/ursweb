import React from 'react'
import "./Home.css"

// let homeData = {
//     title: "React landing page",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam velit iure aut delectus sapiente omnis adipisci expedita ipsam, possimus impedit minus vero dolor? Reprehenderit eveniet, minus pariatur aperiam voluptate labore?"
// }

function Home() {
    return (
        <div className="home-bg">
            <div className="container">
                <div className="home-con">
                    <div className="home-text">
                        {/* <h1>{homeData.title}</h1> */}
                        
                        {/* <a href="#" className="home-btn">Learn More</a> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home