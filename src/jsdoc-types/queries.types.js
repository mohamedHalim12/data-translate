/**
 * @typedef {import("mongoose").Types.ObjectId} ObjectId
 * @typedef {import("mongoose").Model} Model
 */

/**
 * @typedef {{ count: number; next: number; totalData: number;data: any[];langs: {fr: string;km: string;};}} QueriedSentences
 * */

/**
 * @typedef {(limit?: number, meta?: boolean) => Promise<QueriedSentences> } RandomQueryFunc
 * @typedef {{translated:RandomQueryFunc, untranslated:RandomQueryFunc}} RandomQueriesFunction
 */

/**
 * @typedef {( skip?: number, limit?: number, meta?: boolean) => Promise<QueriedSentences> } NonRandomQueryFuncType
 * @typedef {{translated:NonRandomQueryFuncType, untranslated:NonRandomQueryFuncType}} NonRandomQueriesFunction
 * */

/**
 * @typedef {RandomQueriesFunction}
 * @typedef {NonRandomQueriesFunction}
 */

/**
 * @typedef {{text_vo:string,translated_text:string, translated_by:string, translation_date:Date, accepted_by: string|ObjectId }} SentenceData
 * @typedef {SentenceData & {text_id:string}} SentenceDataWithId
 * @typedef {{ count: number; next: number; totalData: number;data: SentenceDataWithId[];langs: {fr: string;km: string;};}} ResponseSentences

 */

/**
 * @typedef {{
 *  translated_text:string,
 *  translated_by:string,
 *  translation_date,
 *  propId:string
 * }} Proposition
 *
 * @typedef {{
 *  idText_vo:string,
 *  propositions:Proposition[]
 *  accepted_by:string,
 *  acception_date:Date
 *  createdAt:Date
 *  updatedAt:Date *
 * }} WaitingQueueData
 */
