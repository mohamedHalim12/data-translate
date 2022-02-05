/**
 * @typedef {import('mongoose').Types.ObjectId} ObjectId
 * @typedef {import('mongoose').Model} Model
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
