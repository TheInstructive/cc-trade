import React from 'react'

export default function Affiliate() {
  return (
    <div className='affiliates-container'>
    <div className='affiliates-title'>
        <h1>AFFILIATES</h1>
        <p>THIS FEATURE IS ONLY AVAILABLE FOR <b>ALIENS FROM EARTH</b> NFT COLLECTION</p>
    </div>

    <div className='affiliates-link'>
        <br></br>
        <label>YOUR REFFERAL LINK</label><br></br><br></br>
        <input value='https://aliensfromearth.com/?ref=ernewnk23km23mf'></input>
        <button>COPY</button>
        <p>Share your referral code with your community and receive a percentage of their every mint.</p>
    </div>

    <div className='affiliates-information'>
        <div className='affiliates-item'>
            <h3>TOTAL USERS</h3>
            <p>Number of referred users</p>
            <br/>
            <h1>77</h1>
        </div>

        <div className='affiliates-item'>
            <h3>YOUR SHARE</h3>
            <p>Your current commission</p>
            <br/>
            <h1>30%</h1>
        </div>

        <div className='affiliates-item'>
            <h3>TOTAL REVENUE</h3>
            <p>Your affiliate earnings</p>
            <br/>
            <h1>0.00 CRO</h1>
        </div>

        <div className='affiliates-item'>
            <h3>AVAILABLE REVENUE</h3>
            <p>Total claimable revenue</p>
            <br/>
            <h1>0.00 CRO</h1>
            <br/>
            <button>Claim</button>
        </div>
    </div>

    <div className='affiliates-help'>
        <h3 id='affiliate-title'>How does it work?</h3>

        <div className='affiliates-steps'>
            <div className='affiliates-step'>
                <h1>1</h1>
                <br/>
                <h3>Copy affiliate link</h3><br/>
                <p>Click the copy button and copy your affiliate link!</p>
            </div>
            <div className='affiliates-step'>
                <h1>2</h1>
                <br/>
                <h3>Share with community</h3><br/>
                <p>Share your link to invite your community to AFE. Each mint you refer will remain your affiliate and will generate you revenue.</p>
            </div>
            <div className='affiliates-step'>
                <h1>3</h1>
                <br/>
                <h3>Get rewards</h3><br/>
                <p>You earn a percentage of mints your community made. Invite more people in order to maximize your revenue.</p>
            </div>
        </div>
    </div>

</div>
  )
}
