import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Icon, Button, Card } from 'antd';
import config from '../../config.js'
const rootUrl = "http://" + config.apiUrl

const Show = ({ fetchShow, manager, info }) => {
  const { login, avatarUrl, name, id } = manager
  const { total, finished } = info

  let clickGetInfo = () => {
    console.log("id = " + id);
    fetchShow(id)
  }


  let clickOut = () => {
    // console.log("id = " + id);
    // fetchShow(id)
    window.open("http://115.159.26.94:9001/out");
  }

  if(info.pictureList){
    return (

      <div className="show">

        <Button type="primary" onClick={clickOut}>
            导出
        </Button>

        {
          info.pictureList.map(function(info){
            return <Card title={info.labelNumber>10?'已完成标签化':'暂未完成标签化'} bordered={false} style={{ width: 300 }}>
                      <img src={"http://115.159.26.94:9001/" + info.path} style = {{width:100}} />
                      <br/>
                      <br/>

                      {info.acceptedLabel?'已完成标签：'+info.acceptedLabel:''}

                    </Card>
          })
        }


      </div>
    )
  }
  else{
    return (
      <div className="User">
        <Button type="primary" onClick={clickGetInfo}>
          点我查看上传图片完成情况!
        </Button>
      </div>
    )
  }
  
}

Show.propTypes = {
//   user: PropTypes.shape({
//     login: PropTypes.string.isRequired,
//     avatarUrl: PropTypes.string.isRequired,
//     name: PropTypes.string
//   }).isRequired
}

export default Show
