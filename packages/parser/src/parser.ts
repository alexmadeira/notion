import type { IParser } from '@/parser'
import type {
  TPropertieCheckbox,
  TPropertieDate,
  TPropertieEmail,
  TPropertieMultiSelect,
  TPropertieNumber,
  TPropertieRichText,
  TPropertieSelect,
  TPropertieTitle,
  TPropertieUrl,
} from '@/properties'

import {
  ZPropertieCheckbox,
  ZPropertieDate,
  ZPropertieEmail,
  ZPropertieMultiSelect,
  ZPropertieNumber,
  ZPropertieRichText,
  ZPropertieSelect,
  ZPropertieTitle,
  ZPropertieUrl,
} from '@/properties'

export class Parser implements IParser {
  private notImplementedFunction(propertie: string) {
    throw new Error(`${propertie} not Implemented`)
  }

  public title(titlePropertie: TPropertieTitle) {
    const { title } = ZPropertieTitle.parse(titlePropertie)
    return title.length ? title[0].plain_text : ''
  }

  public date(datePropertie: TPropertieDate) {
    const { date } = ZPropertieDate.parse(datePropertie)
    return date ? new Date(date.start) : null
  }

  public number(numberPropertie: TPropertieNumber) {
    const { number } = ZPropertieNumber.parse(numberPropertie)
    return number ?? 0
  }

  public checkbox(checkboxPropertie: TPropertieCheckbox) {
    const { checkbox } = ZPropertieCheckbox.parse(checkboxPropertie)
    return checkbox
  }

  public select(selectPropertie: TPropertieSelect) {
    const { select } = ZPropertieSelect.parse(selectPropertie)
    return select ?? null
  }

  public multi_select(multiSelectPropertie: TPropertieMultiSelect) {
    const { multi_select: multiSelect } =
      ZPropertieMultiSelect.parse(multiSelectPropertie)
    return multiSelect ?? []
  }

  public rich_text(richTextPropertie: TPropertieRichText) {
    const { rich_text: richText } = ZPropertieRichText.parse(richTextPropertie)
    return richText.reduce((a, v) => (a += v.plain_text), '')
  }

  public url(urlPropertie: TPropertieUrl) {
    const { url } = ZPropertieUrl.parse(urlPropertie)
    return url ?? '#'
  }

  public email(emailPropertie: TPropertieEmail) {
    const { email } = ZPropertieEmail.parse(emailPropertie)
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
