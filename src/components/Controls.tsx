import React, { FC } from 'react'
import { Grid, Paper } from '@material-ui/core'
import { Store } from '@lauf/lauf-store'
import type { AppState } from '../types'
import { DetailRadio } from './controls/DetailRadio'
import { LengthSlider } from './controls/LengthSlider'
import { PriorityList } from './controls/PriorityList'
import { DownloadButton, SourceButton } from './controls/Buttons'

export const Controls: FC<{ store: Store<AppState> }> = ({ store }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Paper style={{ padding: '5%' }}>
      <Grid container>
        <Grid item xs={6}>
          <DetailRadio store={store} />
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column" spacing={3}>
            <DownloadButton store={store} />
            <SourceButton />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    <Paper style={{ padding: '5%' }}>
      <Grid container>
        <Grid item xs={6}>
          <LengthSlider store={store} />
        </Grid>
        <Grid item xs={6}>
          <PriorityList store={store} />
        </Grid>
      </Grid>
    </Paper>
  </div>
)
