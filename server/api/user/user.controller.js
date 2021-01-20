import createError from 'http-errors';
import User from './user.model';

export const show = async ({ params: { username } }) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw createError(404, 'Could not find a user with this username');
  }

  return user;
};

export const getByMail = async ({ params: { email } }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(404, 'Could not find a user with this email');
  }

  return user;
};

export const update = async ({ user, params: { id }, body }) => {
  if (!user._id.equals(id) && !user.admin) {
    throw createError(403);
  }

  const { name, email } = body;

  const result = await User.findByIdAndUpdate(id, { $set: { name, email } });

  if (!result) {
    throw createError(404);
  }
};

export const me = async ({ user }) => user;
