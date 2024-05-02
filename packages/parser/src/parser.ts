import { IParser } from '@/parser'

export class Parser implements IParser {
  public title(prop) {
    return prop.title.length > 0 ? prop.title[0].plain_text : ''
  }
  // date = (v) => {
  //   return v.date ? new Date(v.date.start) : null
  // },
  // number= (v) => v.number ?? 0,
  // select= (v) => v.select?.name ?? null,
  // multi_select= (v) => v.multi_select?.map((v) => v.name),
  // people= (v) =>
  //   v.people.map((person) => {
  //     if (isFullUser(person)) {
  //       return person.name ?? ''
  //     }
  //     return ''
  //   }),
  // checkbox= (v) => v.checkbox,
  // rich_text= (v) => v.rich_text.reduce((a, v) => (a += v.plain_text), ''),
  // files= (v) =>
  //   v.files.map((f) => {
  //     // Hacky hack, external URLs expire hourly
  //     // Need to download these
  //     return {
  //       name: f.name,
  //       url:
  //         f.type === 'external'
  //           ? f.external.url
  //           : f.type === 'file'
  //             ? f.file.url
  //             : '',
  //     }
  //   }),
  // url= () =>'notImplementedFunction',
  // formula= () =>'notImplementedFunction',
  // relation= () =>'notImplementedFunction',
  // rollup= () =>'notImplementedFunction',
  // email= () =>'notImplementedFunction',
  // phone_number= () =>'notImplementedFunction',
  // last_edited_by= () =>'notImplementedFunction',
  // last_edited_time= () =>'notImplementedFunction',
  // created_by= () =>'notImplementedFunction',
  // created_time= () =>'notImplementedFunction',
  // status= () =>'notImplementedFunction',
}
