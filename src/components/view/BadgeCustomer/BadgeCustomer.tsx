import { NotificationTwoTone } from '@ant-design/icons'
import { Badge, Space } from 'antd'
import React from 'react'

const BadgeCustomer =({messageCount}:{messageCount:any}) => {
 <Space size="small">
    {/* count={99} overflowCount={10} */}
    <Badge count={messageCount} overflowCount={50}>
       <NotificationTwoTone style={{fontSize:'20px',textAlign:'center',margin:'4px',padding:'0px',justifyContent:'center',alignItems:'center'}} />
  
      {/* <Avatar style={{backgroundColor:"blue"}} shape="square" size="default"  /> */}
    </Badge>
  </Space>
}

export default BadgeCustomer