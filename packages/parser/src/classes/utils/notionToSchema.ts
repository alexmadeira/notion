import type { TProperty } from '@/notion/properties'

import {
  ZPropertyCheckbox,
  ZPropertyDate,
  ZPropertyFormula,
  ZPropertyNumber,
  ZPropertyRichText,
  ZPropertyTitle,
} from '@/notion/properties'

function id(property: TProperty) {
  const { formula } = ZPropertyFormula.parse(property)
  return formula.string ?? ''
}
function title(property: TProperty) {
  const { title } = ZPropertyTitle.parse(property)
  return title.length > 0 ? title[0].plain_text : ''
}
function string(property: TProperty) {
  const { rich_text: richText } = ZPropertyRichText.parse(property)
  return richText.reduce((a, v) => (a += v.plain_text), '')
}
function boolean(property: TProperty) {
  const { checkbox } = ZPropertyCheckbox.parse(property)
  return checkbox
}
function number(property: TProperty) {
  const { number } = ZPropertyNumber.parse(property)
  return number ?? 0
}
function date(property: TProperty) {
  const { date } = ZPropertyDate.parse(property)
  return date ? new Date(date.start) : null
}

export const notionToSchema = {
  id,
  title,
  string,
  boolean,
  number,
  date,
}
