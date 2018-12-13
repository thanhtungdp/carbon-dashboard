import React from 'react'
import styled from 'styled-components'
import Avatar from '../avatar'
import { SHAPE } from 'themes/color'

const UserAvatarStyle = styled.div`
  display: flex;
  align-items: center;
`
const Username = styled.span`
  margin: 2px 0;
  display: flex;
  color: #333;
  font-weight: 500;
  font-size: 15px;
`
const Fullname = styled.span`
  margin: 2px 0;
  display: flex;
  color: ${SHAPE.GRAYTEXT};
  font-size: 15px;
`
const InfoUser = styled.div`
  margin-left: 8px;
  flex-direction: column;
`

export default ({
  avatar,
  size = 35,
  username,
  fullname,
  showFullname = true,
  className,
  borderWidth = 0,
  borderColor = '#fff',
  borderStyle = 'solid',
  onClick
}) => (
  <UserAvatarStyle className={className} onClick={onClick}>
    <Avatar
      borderWidth={4}
      borderColor='#fff'
      borderStyle='solid'
      className='avatar'
      random={username}
      image={avatar}
      size={size}
    />
    <InfoUser className='userInfo'>
      <Username>{username}</Username>
      {showFullname && !!fullname && <Fullname>{fullname}</Fullname>}
    </InfoUser>
  </UserAvatarStyle>
)
