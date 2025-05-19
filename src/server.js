import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAllContacts, getContactById } from './services/contacts.js';

dotenv.config();
const PORT = Number(process.env.PORT || 3000);

export const setupServer = () => {
  const app = express();

  app.use(
    pino({
      transport: { target: 'pino-pretty', options: { colorize: true } },
    }),
  );
  app.use(cors());

  // Маршрут для отримання всіх контактів
  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (e) {
      res
        .status(500)
        .json({ message: `Error fetching contacts: ${e.message}` });
    }
  });

  // Маршрут для отримання контакту за ID
  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const contact = await getContactById(req.params.contactId);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${req.params.contactId}!`,
        data: contact,
      });
    } catch (e) {
      res.status(500).json({ message: `Error fetching contact: ${e.message}` });
    }
  });

  // Обробка неіснуючих маршрутів
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
