import color from 'color'

export const SHAPE = {
  RED: '#EB5C55',
  ORANGE: '#F6A623',
  PURPLE: '#A076C5',
  PURPLEBOLD: '#7F30C5',
  BLACK: '#3B3B3B',
  BLACKER: '#1D1D1F',
  GREEN: '#2ECC71',
  PRIMARY: '#0984E3',
  PRIMARYBOLD: '#007EE5',
  PINK: '#FE6C88',
  GRAYLIGHT: '#FAFBFB',
  GRAYMORELIGHT: '#f5f5f5',
  GRAYLIGHTMEDIUM: '#d5d5d5',
  GRAYMEDIUM: '#eee',
  GRAYBOLD: '#5c70807a',
  GRAYBOLDER: '#5c7080',
  GRAYTEXT: '#9B9B9B',
  YELLOW: '#f1c40f',
  SECONDARY: '#636E72',
  INFO: '#74B9FF',
  GRAY: '#EEEEEE',
  SUCCESS: '#00B894',
  WARNING: '#FDCB6E',
  DANGER: '#FF7675',
  WHITE: '#FFFFFF'
}

export const BORDER = {
  PRIMARY: '#0984E3',
  SECONDARY: '#2F3542',
  INFO: '#70A1FF',
  GRAY: '#EEEEEE',
  SUCCESS: '#1DCE6C',
  WARNING: '#FFA502',
  DANGER: '#FF4757',
  GRAYLIGHT: '#FAFBFB'
}

export const TEXT = {
  DEFAULT: '#5C7080',
  NORMAL: '#3B3B3B',
  PRIMARY: '#389BFF',
  PRIMARYBOLD: '#007EE5',
  GRAY: '#999999',
  DANGER: '#ff7675',
  DANGERBOLD: '#d63031'
}

export const INPUT = {
  BORDER: SHAPE.GRAYMEDIUM,
  PLACEHOLDER: color(SHAPE.GRAYMEDIUM)
    .darken(0.4)
    .string(),
  FOCUS: SHAPE.PRIMARY
}

export default { SHAPE, TEXT, INPUT, BORDER }
