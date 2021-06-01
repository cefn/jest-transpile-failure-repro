import React, { FC } from 'react'
import { Chip, FormLabel, Grid } from '@material-ui/core'
import {
  History,
  Timelapse,
  Category,
  DragHandleOutlined,
  Work,
  School,
  Code,
  Memory,
  Bathtub,
  People,
  Settings,
  Palette,
  SportsHandball,
  FormatQuote,
  Language,
} from '@material-ui/icons'
import { Store } from '@lauf/lauf-store'
import { useSelected } from '@lauf/lauf-store-react'
import { List as MovableList, arrayMove } from 'react-movable'
import type { AppState } from '../../types'
import { ALL_ENTRIES } from '../../data'

export const PriorityList: FC<{ store: Store<AppState> }> = ({ store }) => {
  const scorePriority = useSelected(store, (state) => state.scorePriority)
  const limit = useSelected(store, (state) => state.limit)
  const disabled = limit === ALL_ENTRIES.length
  return (
    <MovableList
      values={[...scorePriority]}
      onChange={({ oldIndex, newIndex }) =>
        store.edit((draft) => {
          draft.scorePriority = arrayMove(
            draft.scorePriority,
            oldIndex,
            newIndex
          )
        })
      }
      renderList={({ children, props }) => (
        <>
          <FormLabel component="label" color="primary">
            Priority
          </FormLabel>
          <Grid container direction="column" {...props}>
            {children}
          </Grid>
        </>
      )}
      renderItem={({ value, props }) => (
        <Grid item {...props}>
          <Chip
            disabled={disabled}
            label={value}
            color={disabled ? 'default' : 'primary'}
            size="small"
            style={{ width: '100%' }}
            icon={
              // value === "boost" ? (
              //   <FavoriteIcon />
              // ) :
              value === 'recency' ? (
                <History />
              ) : value === 'duration' ? (
                <Timelapse />
              ) : value === 'employment' ? (
                <Work />
              ) : value === 'education' ? (
                <School />
              ) : value === 'society' ? (
                <Language />
              ) : value === 'coding' ? (
                <Code />
              ) : value === 'electronics' ? (
                <Memory />
              ) : value === 'invention' ? (
                <Bathtub />
              ) : value === 'management' ? (
                <People />
              ) : value === 'machine learning' ? (
                <Settings />
              ) : value === 'art' ? (
                <Palette />
              ) : value === 'design' ? (
                <Category />
              ) : value === 'sport' ? (
                <SportsHandball />
              ) : value === 'writing' ? (
                <FormatQuote />
              ) : (
                <DragHandleOutlined />
              )
            }
          />
        </Grid>
      )}
    />
  )
}

// for society HomeWork, Language
// for code CodeIcon
// for electronics MemoryIcon (BuildIcon, MouseIcon)
// for invention Emoji (bulb), Bath
// for management PeopleIcon SupervisedUserIcon
// for machinelearning SettingsIcon, StorageIcon
// for art PaletteIcon BrushIcon
// for design CategoryIcon
// for sports SportsHandball
// for writing FormatQuote
