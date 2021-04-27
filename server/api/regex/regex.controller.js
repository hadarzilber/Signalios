import Regex from './regex.model';

export const addNew = ({ body },res) => {
    const regex = new Regex({ name: body.name, regex: createRegex(body.regex) })
    regex.save()
    res.sendStatus(200)
};

