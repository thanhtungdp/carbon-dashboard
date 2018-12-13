import React from 'react'
import styled from 'styled-components'
import env from 'env'

const mediaGateway = env.default.API_MEDIA

export function getColorFromText (text, charCodeAt = 0) {
  var colors = [
    '#3498db',
    '#1abc9c',
    '#e67e22',
    '#e74c3c',
    '#34495e',
    '#8e44ad',
    '#2ecc71',
    '#d35400',
    '#f39c12',
    '#f1c40f'
  ]
  var number = 0
  if (text) {
    number = text.charCodeAt(charCodeAt)
  } else number = 2
  if (number > 10) {
    number = number % 10
  }
  if (number > 100) {
    number = number % 100
  }
  return colors[number]
}

const Circle = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
  border-width: ${props => props.borderWidth}px;
  border-style: ${props => props.borderStyle};
  border-color: ${props => props.borderColor};
  background-color: ${props => getColorFromText(props.random)};
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    color: #ffffff;
    font-size: ${props => parseInt(props.size / 1.6)}px;
    font-weight: 600;
  }
`

const Image = styled.img`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
  border-width: ${props => props.borderWidth}px;
  border-style: ${props => props.borderStyle};
  border-color: ${props => props.borderColor};
`

export default ({
  image,
  size = 35,
  className,
  random = 'T',
  borderWidth = 0,
  borderStyle = 'solid',
  borderColor = '#fff'
}) => {
  if (image && image.avatar) {
    return (
      <Image
        borderWidth={borderWidth}
        borderStyle={borderStyle}
        borderColor={borderColor}
        src={
          image.old ? `${mediaGateway}/uploads/avatars/${image.avatar}` : image.avatar
        }
        size={size}
        className={className}
      />
    )
  }
  return (
    <Circle
      borderWidth={borderWidth}
      borderStyle={borderStyle}
      borderColor={borderColor}
      size={size}
      className={className}
      random={random}
    >
      <span className='text'>{random ? random[0].toUpperCase() : null}</span>
    </Circle>
  )
}
