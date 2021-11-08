import React from 'react';
import { connect } from 'react-redux';


import { Button, PageHeader } from 'antd';

const HeaderComponent = ({ chainId, account }) => {
  return <PageHeader
    className="site-page-header"
    title="Best Bets"
    // subTitle="Csgo Bets"
    extra={[
      <Button key="1">Address: {account}</Button>,
      <Button key="2">Network: {chainId}</Button>,
      <Button key="3" type="warning">
        Disconnect
      </Button>,
    ]}
  />
}

const getProps = state => {
  return {
    chainId : state.chainId,
    account: state.account,
  }
}

export const Header = connect(getProps)(HeaderComponent)