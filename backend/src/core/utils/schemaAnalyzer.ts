import { Schema } from "mongoose";

export const analyzeSchemaPaths = (schema: Schema, prefix = "") => {
  const populatePaths: string[] = [];
  const refIdPaths: string[] = [];

  schema.eachPath((pathName: string, schemaType: any) => {
    const fullPath = prefix ? `${prefix}.${pathName}` : pathName;

    const opts = schemaType?.options || {};

    if (opts.ref) {
      populatePaths.push(fullPath);
      refIdPaths.push(fullPath);
    }

    if (schemaType.instance === "Array" && schemaType.caster?.options?.ref) {
      populatePaths.push(fullPath);
      refIdPaths.push(fullPath);
    }

    if (schemaType.schema instanceof Schema) {
      const nested = analyzeSchemaPaths(schemaType.schema, fullPath);
      populatePaths.push(...nested.populatePaths);
      refIdPaths.push(...nested.refIdPaths);
    }
  });

  return { populatePaths, refIdPaths };
};
