// 3rd party:
// Express:
import express from 'express';
// Node:
import fs from 'fs/promises';
import path from 'path';

// Types, interfaces and enumns:
import type { Router } from 'express';
interface Cell {
  id: string;
  content: string;
  type: 'code' | 'text';
}

export default function createCellsRouter(
  filename: string,
  dir: string
): Router {
  const router = express.Router();

  router.use(express.json());

  const filePath = path.join(dir, filename);

  router.get('/cells', async (request, response) => {
    try {
      // Trying to read the file:
      const result = await fs.readFile(filePath, { encoding: 'utf-8' });

      // Parsing a list of cells:
      const parsedResult = JSON.parse(result);
      // Sending list of cells back to the browser:

      response.send(parsedResult);
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'ENOENT'
      ) {
        // If no such file exists, add a default list of cells:
        await fs.writeFile(filePath, '[]', 'utf-8');
        response.send([]);
      } else {
        throw error;
      }
    }
  });
  router.post('/cells', async (request, response) => {
    // Acquiring a list of cells from the request object:
    const { cells }: { cells: Cell[] } = request.body;
    // Serializing the list of cells:
    const serializedCells = JSON.stringify(cells);
    // Writing the cells to the file:
    await fs.writeFile(filePath, serializedCells, 'utf-8');

    response.status(201).send({ serializedCells });
  });

  return router;
}
