import React from 'react'

function Footer({step,players, bonds, nextStep}) {
    return (
        <div className='footer_container'>
            <div className="footer_row">
                <div className="bonds">
                    <div className="text_bonds">
                    Облигации
                    </div>
                    <div className="first_bonds">
                    {bonds.first}
                    </div>
                    <div className="second_bonds">
                    {bonds.second}
                    </div>
                   </div>
                   
                <button className={players < 2 ? 'dis': 'step'} disabled={players < 2}  onClick={nextStep} ><div className='text_step'>Ход</div>  <div  className='count_step'>{step}</div> </button>
            </div>
        </div>
    )
}

export default Footer
