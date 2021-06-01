import React, { FC } from 'react'
import { Store } from '@lauf/lauf-store'
import { FormLabel, Slider, Grid } from '@material-ui/core'
import { useSelected } from '@lauf/lauf-store-react'
import type { AppState } from '../../types'
import { ALL_ENTRIES } from '../../data'

/**
 * Mapping natural direction for document length measure (increasing length downwards)
 * No support for reversed sliders per https://github.com/mui-org/material-ui/issues/18690
 */
const sliderPos = (value: number) => ALL_ENTRIES.length - value

const marks = [
  { label: 'Empty', value: sliderPos(0) },
  ...[0.25, 0.5, 0.75].map((share) => {
    const count = Math.floor(share * ALL_ENTRIES.length)
    return { label: count, value: sliderPos(count) }
  }),
  { label: 'All', value: sliderPos(ALL_ENTRIES.length) },
]

export const LengthSlider: FC<{ store: Store<AppState> }> = ({ store }) => {
  const limit = useSelected(store, (state) => state.limit)
  return (
    <>
      <Grid container style={{ height: '100%' }}>
        <Grid item xs={12}>
          <FormLabel component="label" id="length-slider-label" color="primary">
            Items
          </FormLabel>
        </Grid>
        <Grid item xs={12} style={{ height: '80%' }}>
          <Slider
            style={{ height: '100%' }}
            orientation="vertical"
            value={sliderPos(limit)}
            min={sliderPos(ALL_ENTRIES.length)}
            max={sliderPos(0)}
            aria-labelledby="length-slider-label"
            step={1}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => ALL_ENTRIES.length - value}
            marks={marks}
            onChange={(_event, value) =>
              store.edit((draft) => {
                draft.limit = sliderPos(Number(value))
              })
            }
          />
        </Grid>
      </Grid>
    </>
  )
}
