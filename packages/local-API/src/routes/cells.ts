// 3rd party:
// Express:
import express from 'express';
// Node:
import fs from 'fs/promises';

// Types, interfaces and enumns:
import type { Router } from 'express';

export default function createCellsRouter(
  filename: string,
  dir: string
): Router {
  const router = express.Router();

  router.get('/cells', async (request, response) => {
    // Checking if the cells storage file exists:
    // If no such file exists, add a default list of cells:
    // Reading the file:
    // Parsing a list of cells:
    // Sending list of cells back to the browser:
  });
  router.post('/cells', async (request, response) => {
    // Acquiring a list of cells from the request object:
    // Serializing the list of cells:
    // Writing the cells to the file:
  });

  return router;
}
