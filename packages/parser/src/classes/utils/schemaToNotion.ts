import {
  TSchemaValue,
  ZSchemaBooleanValue,
  ZSchemaDateValue,
  ZSchemaNumberValue,
  ZSchemaStringValue,
} from '@/classes/schema'

import dayjs from 'dayjs'

function title(value: TSchemaValue) {
  const content = ZSchemaStringValue.parse(value)

  return {
    title: [
      {
        text: {
          content,
        },
      },
    ],
  }
}

function string(value: TSchemaValue) {
  const content = ZSchemaStringValue.parse(value)

  return {
    title: [
      {
        text: {
          content,
        },
      },
    ],
  }
}

function boolean(value: TSchemaValue) {
  const checkbox = ZSchemaBooleanValue.parse(value)

  return {
    checkbox,
  }
}

function number(value: TSchemaValue) {
  const number = ZSchemaNumberValue.parse(value)
  return {
    number,
  }
}

function date(value: TSchemaValue) {
  const date = ZSchemaDateValue.parse(value)

  return {
    date: {
      start: dayjs(date).format('YYYY-MM-DD'),
    },
  }
}

export const schemaToNotion = {
  title,
  string,
  boolean,
  number,
  date,
}
