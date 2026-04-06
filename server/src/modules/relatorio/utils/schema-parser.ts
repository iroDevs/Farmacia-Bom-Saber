export function parsePrismaSchema(schema: string) {
  const models: Record<string, { modelName: string; columns: string[] }> = {};
  const modelRegex = /model\s+([A-Za-z0-9_]+)\s*{([\s\S]*?)}/g;
  let m: RegExpExecArray | null;
  while ((m = modelRegex.exec(schema)) !== null) {
    const modelName = m[1];
    const body = m[2];
    const mapMatch = body.match(/@@map\("([^\"]+)"\)/);
    const tableName = mapMatch ? mapMatch[1] : modelName.toLowerCase();

    const fieldRegex = /^\s*([A-Za-z0-9_]+)\s+/gm;
    const columns: string[] = [];
    let f: RegExpExecArray | null;
    while ((f = fieldRegex.exec(body)) !== null) {
      const fieldName = f[1];
      if (!fieldName.startsWith('@@') && !fieldName.startsWith('@')) {
        columns.push(fieldName);
      }
    }

    models[tableName] = { modelName, columns };
  }

  return models;
}
