import React from 'react';
import { Metamask } from '../blockchain/Metamask';
import { Wallet } from '../blockchain/Phantom';
import metamask_img from '../assets/metamask.png';
import phantom_img from '../assets/phantom.png';

import { Card } from 'antd';
import { connect } from 'react-redux';

const SelectWalletC = ({ account }) => {
	if (!account) {
		return(
			<div className="frame-selectWallet d-flex">
				<Card className="m-5">
					<div className="container-logo-wallet">
						<img src={metamask_img} />
					</div>
					<Metamask />
				</Card>
				<Card className="m-5">
					<div className="container-logo-wallet">
						<img src={phantom_img} />
					</div>
					<Wallet />
				</Card>
			</div>
		);
	} else {
		return(<div>Please connect to a wallet</div>)
	}
} 

const getProps = state => {
	return {
	  account : state.account,
	}
}

export const SelectWallet = connect(getProps)(SelectWalletC);