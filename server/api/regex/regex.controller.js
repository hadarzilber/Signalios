import Regex from './regex.model';

export const addNew = ({ body }, res) => {
  const regex = new Regex({ name: body.name, regex: body.regex });
  regex.save();
  res.sendStatus(200);
};
