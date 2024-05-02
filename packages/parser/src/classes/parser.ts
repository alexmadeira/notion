import type { IParser } from '@/classes/parser'
import type {
  TPropertyCheckbox,
  TPropertyDate,
  TPropertyEmail,
  TPropertyMultiSelect,
  TPropertyNumber,
  TPropertyRichText,
  TPropertySelect,
  TPropertyTitle,
  TPropertyUrl,
} from '@/notion/properties'

import {
  ZPropertyCheckbox,
  ZPropertyDate,
  ZPropertyEmail,
  ZPropertyMultiSelect,
  ZPropertyNumber,
  ZPropertyRichText,
  ZPropertySelect,
  ZPropertyTitle,
  ZPropertyUrl,
} from '@/notion/properties'

export class Parser implements IParser {
  private notImplementedFunction(propertie: string) {
    throw new Error(`${propertie} not Implemented`)
  }

  public title(titlePropertie: TPropertyTitle) {
    const { title } = ZPropertyTitle.parse(titlePropertie)
    return title.length ? title[0].plain_text : ''
  }

  public date(datePropertie: TPropertyDate) {
    const { date } = ZPropertyDate.parse(datePropertie)
    return date ? new Date(date.start) : null
  }

  public number(numberPropertie: TPropertyNumber) {
    const { number } = ZPropertyNumber.parse(numberPropertie)
    return number ?? 0
  }

  public checkbox(checkboxPropertie: TPropertyCheckbox) {
    const { checkbox } = ZPropertyCheckbox.parse(checkboxPropertie)
    return checkbox
  }

  public select(selectPropertie: TPropertySelect) {
    const { select } = ZPropertySelect.parse(selectPropertie)
    return select ?? null
  }

  public multi_select(multiSelectPropertie: TPropertyMultiSelect) {
    const { multi_select: multiSelect } =
      ZPropertyMultiSelect.parse(multiSelectPropertie)
    return multiSelect ?? []
  }

  public rich_text(richTextPropertie: TPropertyRichText) {
    const { rich_text: richText } = ZPropertyRichText.parse(richTextPropertie)
    return richText.reduce((a, v) => (a += v.plain_text), '')
  }

  public url(urlPropertie: TPropertyUrl) {
    const { url } = ZPropertyUrl.parse(urlPropertie)
    return url ?? '#'
  }

  public email(emailPropertie: TPropertyEmail) {
    const { email } = ZPropertyEmail.parse(emailPropertie)
    return email ?? null
  }

  public files = () => this.notImplementedFunction('files')
  public status = () => this.notImplementedFunction('status')
  public people = () => this.notImplementedFunction('people')
  public formula = () => this.notImplementedFunction('formula')
  public relation = () => this.notImplementedFunction('relation')
  public unique_id = () => this.notImplementedFunction('unique_id')
  public created_by = () => this.notImplementedFunction('created_by')
  public phone_number = () => this.notImplementedFunction('phone_number')
  public created_time = () => this.notImplementedFunction('created_time')
  public verification = () => this.notImplementedFunction('verification')
  public last_edited_by = () => this.notImplementedFunction('last_edited_by')
  public last_edited_time = () =>
    this.notImplementedFunction('last_edited_time')
}
