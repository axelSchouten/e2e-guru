import { exec } from "child_process";
import { ClauseType, Clause, sqlOperators } from "./type";

export async function cmd(command:string) {
    const { default: stripAnsi } = await import('strip-ansi');
    return new Promise( 
        (succes,error) => {
            exec(
                command, 
                (err, stdout, stderr) => {
                    if (err || stderr) {
                        return error(err || stderr);
                    }
                    return succes(stripAnsi(stdout));
                }
            );
        }
    );
}

export async function buildSQLQuery (
    objectName: string,
    fields: string[] = ['id'],
    clauses: (Clause|ClauseType)[] | null = null,
    limit: number = 1
) {

    function processClause (clause: (Clause|ClauseType)) {
        if ('field' in clause) {
            const { field, operand, value }: ClauseType = clause;
            const defineTypeOfValue = typeof value === 'string' ? `'${value}'`: value;
            return `${field} ${sqlOperators[operand]} ${defineTypeOfValue}`
        } else {
            const groupCondition: Clause = clause;
            const conditionsStr: string = groupCondition.conditions.map(processClause).join(`${groupCondition.logic}`);
            if (groupCondition.not) {
                return `NOT (${conditionsStr})`;
            }
            return `(${conditionsStr})`;
        }
    }

    return `
        SELECT ${fields.join()}
        FROM ${objectName}
        ${ clauses && `WHERE ${clauses.map(processClause).join(' AND ')}` }
        LIMIT ${limit}
    `
}