import * as React from 'react'
import './Quote.less'

const Quote:React.StatelessComponent<void>=()=>{
    const content='If the day is done If birds sing no more If the wind has fiagged tired Then draw the  '
    const name='Tagore'
    const title='When Day Is Done'
    return (
        <div className='quoteWrapper'>
            <div className='inner'>
                {content}
            </div>
            <div className='footer'>
                <div className='description'>
                    <p>-{name}-</p>
                    <p>{title}</p>
                </div>
            </div>
        </div>
    )
}
export {Quote as default}
