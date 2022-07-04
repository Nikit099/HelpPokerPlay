import React from 'react'
import { BsChevronDoubleDown } from "react-icons/bs";
function Stocks({dividents, stocks, boostDown,backUp, boostUp}) {
    return (
        <div className='stocks_container'>
            <div className="stocks_row">
                <div className="top_stocks">
                <div className={ 'stocks_divid ' + (dividents ? 'dividents_true' :'dividents_false') } >Пора платить дивиденты</div> 
                <button onClick={backUp}>Ход обратно</button>
               
                </div>
               <div className="stocks_cost">
                {
                    stocks.map((i, index) => (
                        <div key={i.id} className="stocks">
                            <div className="boost">
                                
                                {
                                    i.up === 1 && <div className='gold'>{i.up}</div>
                                }
                                 {
                                    i.up === 2 && <div className='platinum'>{i.up}</div>
                                }
                                 {
                                    i.up === 3 && <div className='brown'>{i.up}</div>
                                }
                                 {
                                    i.up === 4 && <div className='green'>{i.up}</div>
                                }
                            
                            <button onClick={() => boostDown(i.id, i.up)}><BsChevronDoubleDown className='iconDown'  value={{ color: "blue", className: "global-class-name" }} /></button>
                            </div>
                            <div onClick={() => boostUp(i.id, i.up)}  className={'around_stock' + index}>
                                <div className="inside_around">
                                    <div>{
                                        i.cost > 0 && i.cost 
                                    }</div>
                                    <div className='brown' >
                                    {
                                        i.cost === 0 && 1
                                    }
                                    </div>
                                    <div className='platinum'>
                                    {
                                        i.cost === -1 && 1
                                    }
                                    </div>
                                    <div className='gold'>
                                    {
                                        i.cost === -2 && 1
                                    }
                                    </div>
                                    <div className='silver'>
                                    {
                                        i.cost === -3 && 1
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}

export default Stocks
