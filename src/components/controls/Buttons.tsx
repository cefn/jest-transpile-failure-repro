import React, { FC } from 'react'
import { Button } from '@material-ui/core'
import { Store } from '@lauf/lauf-store'
import type { AppState } from '../../types'
import { downloadPdf } from '../../util'

const BUTTON_DEFAULTS = {
  variant: 'contained',
  color: 'primary',
} as const

export const DownloadButton: FC<{ store: Store<AppState> }> = ({ store }) => (
  <>
    {process.browser && (
      <Button
        suppressHydrationWarning
        {...BUTTON_DEFAULTS}
        onClick={() => downloadPdf(store)}
      >
        Download
      </Button>
    )}
  </>
)

export const SourceButton: FC = () => (
  <Button {...BUTTON_DEFAULTS} href="https://github.com/cefn/cvnext">
    About
  </Button>
)
