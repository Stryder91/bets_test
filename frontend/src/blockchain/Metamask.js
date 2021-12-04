import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import GetWeb3 from './GetWeb3';

import { Button } from 'antd';

const MetamaskComponent = ({ setAccDispatch, setNetworkDispatch, setChainDispatch }) => {
	const [account, setAccount] = useState(null);
	const [chainId, setCurrentChainID] = useState(0)

	useEffect( async () => {
		try {
			const web3 = await GetWeb3();

			const accounts = await web3.eth.getAccounts();
			setAccount(accounts[0]);
			setAccDispatch(accounts[0]);

			const networkId = await web3.eth.net.getId()
			const id = await window.ethereum.request({ method: 'eth_chainId' });
			console.log("From MM : ", accounts, networkId, id)
			setNetworkDispatch(networkId);
			setCurrentChainID(() => parseInt(id));
			setChainDispatch(id);
		} catch (err) {
			if (err.code === 4001) {
				// EIP-1193 userRejectedRequest error
				// If this happens, the user rejected the connection request.
				console.log('Please connect to MetaMask.')
				setAccount("User Rejected Request");
			} else if(err.code === -32002) {
				setAccount('Please unlock MetaMask and try agin.')
			} else {
				console.error(err);
				setAccount(err.message)
			}
		}

		if (window.ethereum) {
			window.ethereum.on('accountsChanged', (accounts) => {
				// Handle the new accounts, or lack thereof.
				// "accounts" will always be an array, but it can be empty.
				console.log("Account changed!")
				setAccount(accounts[0]);
				setAccDispatch(accounts[0]);
			});
			
			window.ethereum.on('chainChanged', (chainId) => {
				// Handle the new chain.
				// Correctly handling chain changes can be complicated.
				// We recommend reloading the page unless you have good reason not to.
				// window.location.reload();
				setCurrentChainID(chainId);
				setChainDispatch(chainId);
			});
		} else {
			setAccount("No accounts");
		}

	}, [])
	return (
		<div>
			<div>Metamask</div>
			{(account)?
			<div>
				<div>{account}</div>
				<div>On chain : {chainId}</div>
				{/* <Button onClick={txHash}>Send</Button> */}
			</div>
			: <p>Please connect to Metamask</p>
			}
		</div>
	);
}
const getProps = state => {
	return {
	  titleHome : state.titleHome,
	}
}

const setProps = dispatch => {
	return {
		setAccDispatch: address => {
			dispatch({type: "SET_ACCOUNT", address: address});
		},
		setNetworkDispatch: id => {
			dispatch({type: "SET_NETWORK", id: id});
		},
		setChainDispatch: id => {
			dispatch({type: "SET_CHAIN", id: id});
		},
	}
};
export const Metamask = connect(getProps, setProps)(MetamaskComponent);

	// const txHash = async () => {
	// 		await window.ethereum.request({
	// 		method: 'eth_sendTransaction',
	// 		params: [transactionParameters],
	// 	});
	// }
	// const transactionParameters = {
	// 	nonce: '0x00', // ignored by MetaMask
	// 	gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
	// 	gas: '0x2710', // customizable by user during MetaMask confirmation.
	// 	to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
	// 	from: window.ethereum.selectedAddress, // must match user's active address.
	// 	value: '0x00', // Only required to send ether to the recipient from the initiating external account.
	// 	data:
	// 		'0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
	// 	chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
	// };