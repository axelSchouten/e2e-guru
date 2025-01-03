type AttributesOutput = {
    type: string;
    url: string;
}

type RecordsOutPut = {
    attributes: AttributesOutput
    [key: string] : any
}

type QueryOutPut = {
    status: string
    result: { 
        records: RecordsOutPut[]
        totalSize: number 
        done: boolean
    }
    warning: any[]
    [key: string]: any
}

type Clause = {
    logic?: 'AND' | 'OR'
    not?: boolean
    conditions: ClauseType[] 
}

type ClauseType = {
    field: string
    operand: 'gt' | 'gte' | 'lt' | 'lte' | 'qto' | 'like'
    value: string | number | Date | string[]
}

const sqlOperators = {
    "gt" : '>',
    "gte" : '>=',
    "lt": '<',
    "lte": '<=',
    "qto": '=',
    "like": 'LIKE'
}


declare global {
    interface String {
        tr : (arg:any) => string
    }
}

String.prototype.tr = function (arg:any) {
    return this.replace(/\{\{(\w+)\}\}/g, (m, key) => arg[key]);
};

export {
    QueryOutPut,
    RecordsOutPut,
    AttributesOutput,
    Clause,
    ClauseType,
    sqlOperators
}