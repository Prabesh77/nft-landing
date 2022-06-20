import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24, margin: '0 4px' }} spin />;

export default function Indicator() {
  return <Spin indicator={antIcon} />
}
