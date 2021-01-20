import Notification from './notification.model';

export const index = ({ user }) => Notification.find({ user }).populate('involvedUser');
export const view = async ({ user }) => {
  await Notification.updateMany({ user: user._id }, { $set: { viewed: true } });

  return Notification.find({ user })
    .populate('involvedUser')
    .sort({ date: -1 });
};
