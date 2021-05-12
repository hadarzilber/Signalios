import createError from 'http-errors';

const xlsxFile = require('read-excel-file/node');

export const show = async ({ pairName }) => {
  const result = await xlsxFile(`../../../${pairName}.csv`);

  if (!result) {
    throw createError(404);
  }

  return result;
};
