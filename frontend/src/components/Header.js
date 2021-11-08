import React from 'react';
import { PageHeader } from 'antd';

export const Header = () => {
  return <PageHeader
    className="site-page-header"
    onBack={() => null}
    title="Best Bets"
    subTitle="with a little bubble"
  />
}