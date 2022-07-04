import React, { useEffect, useState } from 'react'
import { GoPlus } from "react-icons/go";
import { BsXLg } from "react-icons/bs";
function Players({players, addPlayers, delPlayers, blind, step}) {
    const [name, setName] = useState('')
    const [round, setRound] = useState(1)
    useEffect(() => {
        if(step - 1 !== 0){
            (step - 1) % players.length === 0 && setRound(prevState => prevState + 1)
        }
    }, [step]);
    
    return (
        <div className='container_players'>
            <div className="info">
            <div>Игроков {players.length}</div>
            <div className="round">
                Раунд {round}
            </div>
            </div>
            <ul className="form">
                <li className="addElem">
                    <input placeholder='Имя' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <button className={blind[1] === 1 || blind[2] === 1 ? 'noAdd' : 'yesAdd'} onClick={() => {
                        addPlayers(name)
                        setName('')
                        }} disabled={blind[1] === 1 || blind[2] === 1 }><GoPlus/></button>
                </li>
                
                { players.length < 3 &&
                    players.map(i => (
                        <li key={i.id} className="elem">
                            <p>{i.name}</p>
                            
                           <div className="btn">
                           {blind[0] === i.order && <div className='parentM' > <div className='smalB' ></div> <div >M</div> </div>}
                            {blind[1] === i.order && <div className='parentB'>   <div className='BigB'></div> <div>B</div> </div>}
                           <button  onClick={() => delPlayers(i.id)}> <BsXLg/></button>

                           </div>
                        </li>
                    ))
                }
                  {players.length >= 3 &&
                    players.map(i => (
                        <li key={i.id} className="elem">
                            <p>{i.name}</p>
                            <div className="btn">
                            {blind[0] === i.order && <p>Diller</p>}
                            {blind[1] === i.order && <div className='parentM' > <div className='smalB' ></div> <div >M</div> </div>}
                            {blind[2] === i.order && <div className='parentB'>   <div className='BigB'></div> <div>B</div> </div>}
                           <button  onClick={() => delPlayers(i.id)}><BsXLg/></button>
                           </div>
                        </li>
                    ))
                }
            </ul>
            
        </div>
    )
}

export default Players
