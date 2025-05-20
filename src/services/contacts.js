import { Contact } from '../models/contactModel.js';
import mongoose from 'mongoose';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return await Contact.findById(id);
};
