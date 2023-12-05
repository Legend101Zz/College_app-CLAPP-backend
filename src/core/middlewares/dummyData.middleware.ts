import { Request, Response, NextFunction } from 'express';
import mongoose, { Document, Schema } from 'mongoose';
import logger from '@core/utils/logger';

interface AddDummyDataOptions<T extends Document> {
  model: mongoose.Model<T>;
  dummyData?: T[];
  interfaceType: Schema<T>;
  omitFields?: (keyof T)[];
}

interface RenderFormOptions<T extends Document> {
  model: mongoose.Model<T>;
  interfaceType: Schema<T>;
  omitFields?: (keyof T)[];
}

const addDummyDataMiddleware =
  <T extends Document>({ model, dummyData }: AddDummyDataOptions<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.query.addDummyData === 'true') {
        // Add dummy data to MongoDB
        if (dummyData) {
          await model.insertMany(dummyData);
          logger.debug('Dummy data added to MongoDB.');
        }
      } else {
        res
          .status(200)
          .json({ error: 'please add dummy data or use another middleware' });
      }

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      // Handle errors if necessary
      logger.error('Error processing middleware:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const addDummyDataByrenderFormMiddleware =
  <T extends Document>({
    interfaceType,
    omitFields = [],
  }: RenderFormOptions<T>) =>
  (req: Request, res: Response) => {
    // Render HTML form with fields based on the interfaceType
    const formFields = Object.keys(interfaceType.obj)
      // @ts-ignore
      .filter((field) => !omitFields.includes(field))
      .map((field) => ({
        name: field,
        // eslint-disable-next-line security/detect-object-injection
        type: interfaceType.obj[field].instance,
      }));

    // Generate HTML markup for the form
    const formHtml = `
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }
  
      form {
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
  
      label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
      }
  
      input {
        width: 100%;
        padding: 8px;
        margin-bottom: 16px;
        box-sizing: border-box;
      }
  
      button {
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    </style>
    <form action="${req.originalUrl}" method="post">
      ${formFields
        .map(
          (field) => `
          <label for="${field.name}">${field.name}</label>
          <input type="${field.type}" name="${field.name}" required>
        `,
        )
        .join('')}
      <button type="submit">Submit</button>
    </form>
  `;

    // Send the HTML markup as the response
    res.send(formHtml);
  };

interface CreateEntityOptions<T extends Document> {
  model: mongoose.Model<T>;
  interfaceType: Schema<T>;
  omitFields?: (keyof T)[];
}

const createEntityMiddleware =
  <T extends Document>({
    model,
    interfaceType,
    omitFields = [],
  }: CreateEntityOptions<T>) =>
  async (req: Request, res: Response, next: Function) => {
    try {
      console.log(req.body);
      const entityData: Partial<T> = {};
      Object.keys(interfaceType.obj).forEach((field) => {
        // eslint-disable-next-line security/detect-object-injection
        if (!omitFields.includes(field as keyof T) && req.body[field]) {
          // eslint-disable-next-line security/detect-object-injection
          entityData[field as keyof T] = req.body[field];
        }
      });

      // eslint-disable-next-line new-cap
      const newEntity = new model(entityData);
      await newEntity.save();

      next();
    } catch (error) {
      logger.error('Error creating entity:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export {
  addDummyDataByrenderFormMiddleware,
  addDummyDataMiddleware,
  createEntityMiddleware,
};
