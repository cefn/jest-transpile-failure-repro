import React, { FC } from 'react'

export const Viewport: FC = ({ children }) => (
  <>
    <style global jsx>
      {`
        html,
        body,
        #__next {
          height: 100%;
        }
      `}
    </style>
    {children}
  </>
)
