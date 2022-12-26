type Indexed<T = any> = {
  [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

function set(
  object: Indexed | unknown,
  path: string,
  value: unknown,
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any,
  );

  return merge(object as Indexed, result);
}

function deepParseJson(jsonString: any): any {
  if (typeof jsonString === 'string') {
    try {
      return deepParseJson(JSON.parse(jsonString));
    } catch (err) {
      return jsonString;
    }
  }

  if (Array.isArray(jsonString)) {
    return jsonString.map((value) => deepParseJson(value));
  }

  if (typeof jsonString === 'object' && jsonString !== null) {
    return Object.keys(jsonString).reduce((obj: Record<string, any>, key) => {
      const value = jsonString[key];
      obj[key] = deepParseJson(value);
      return obj;
    }, {});
  }

  return jsonString;
}

const toDate = (date: string) => new Intl.DateTimeFormat('ru', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}).format(new Date(date));

export {
  deepParseJson, set, merge, Indexed, toDate,
};
