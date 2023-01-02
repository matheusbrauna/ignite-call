import { globalCss } from '@ignite-ui/react'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },

  'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },

  'input[type="number"]': {
    '-moz-appearance': 'textfield',
  },

  '::-webkit-scrollbar': {
    width: '0.25rem',
  },

  '::-webkit-scrollbar-track': {
    background: '$gray600',
  },

  '::-webkit-scrollbar-thumb': {
    background: '$gray500',
    borderRadius: 3,
  },
})
