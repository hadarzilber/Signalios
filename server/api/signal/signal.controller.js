import createError from 'http-errors';
import User from '../user/user.model';
import Notification from '../notification/notification.model';
import Signal from './signal.model';

// const isOwner = ({ user, list }) => list.user.equals(user._id);
// const isCollaborator = ({ user, list }) => list.collaborators.find(x => x._id.equals(user._id));

export const index = ({ user }) => Signal.find({});
export const archived = () =>
  Signal.find({ archived: true, removed: false }).select('-tasks -items');
export const removed = () => Signal.find({ removed: true }).select('-tasks -items');

// export const show = async ({ user, params: { id } }) => {
//   const list = await Signal.findById(id)
//     .populate({ path: 'collaborators', select: 'email name _id' })
//     .populate('user');

//   if (!list || (!isOwner({ list, user }) && !isCollaborator({ list, user }))) {
//     throw createError(404);
//   }

//   return list;
// };

export const create = async ({ user, body }, res) => {
  const { name, template } = body;

  let type;

  const list = await Signal.create({
    name,
    user,
    type,
    collaborators: [user],
    lastEdited: new Date()
  });

  if (!list) {
    throw createError(400);
  }

  return list;
};

const updateList = async ({ user, id, ...setters }) => {
  const list = await Signal.findById(id).populate('user');

  // if (!list || (!isOwner({ user, list }) && !isCollaborator({ user, list }))) {
  //   throw createError(400);
  // }

  const result = await Signal.findByIdAndUpdate(
    list._id,
    { $set: { ...setters, lastEdited: new Date() } },
    { new: true }
  )
    .populate('user')
    .populate({ path: 'collaborators', select: 'name email' });

  if (!result) {
    throw createError(400);
  }

  return result;
};

export const update = async ({ user, params: { id }, body }) => {
  const { items = [], tasks = [] } = body;

  return updateList({ user, id, items, tasks });
};

export const archive = async ({ user, params: { id } }) => updateList({ user, id, archived: true });
export const unarchive = async ({ user, params: { id } }) =>
  updateList({ user, id, archived: false });
export const remove = async ({ user, params: { id } }) => updateList({ user, id, removed: true });

export const deleteForever = async ({ user, params: { id } }) => {
  const list = await Signal.findById(id).populate('user');

  // if (!list || (!isOwner({ user, list }) && !isCollaborator({ user, list }))) {
  //   throw createError(400);
  // }

  const result = await Signal.findByIdAndDelete(list._id);

  if (!result) {
    throw createError(400);
  }
};

export const deleteAll = async ({ user }, res) => {
  const { ok } = await Signal.deleteMany({ user, removed: true });

  if (ok !== 1) {
    throw createError(400);
  }

  res.sendStatus(200);
};

export const restore = async ({ user, params: { id } }) => updateList({ user, id, removed: false });

export const share = async ({ user, params: { id }, body }) => {
  const { collaborators } = body;
  const users = await User.find({ email: { $in: collaborators.map(x => x.email) } });

  const list = await Signal.findById(id);

  const addedUsers = users.filter(x => !list.collaborators.includes(x._id));

  if (!list) {
    throw createError(400);
  }

  const result = await Signal.findByIdAndUpdate(
    id,
    {
      $set: {
        collaborators: users
      }
    },
    { new: true }
  ).populate('collaborators user');

  if (!result) {
    throw createError(400);
  }

  try {
    await Promise.all(
      addedUsers
        .filter(x => x._id !== user._id)
        .map(x =>
          Notification.create({
            involvedUser: user,
            user: x,
            content: `${user.name.first} ${user.name.last} has shared his list ${list.name} with you`,
            date: new Date()
          })
        )
    );
  } catch (error) {
    throw createError(400, 'Failed in sending some of the Notifications');
  }

  return result;
};
