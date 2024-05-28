import { DB, ID } from "../index";
import { DB_ID, COLLECTION_NOTES } from "../constants";
import type { INote } from "@/components/Notes/types/index";

export const createNote = async (name: string): Promise<INote> => {
  const newNote = {
    name,
    description: "",
    created_date: new Date(),
  };
  const response = await DB.createDocument(DB_ID, COLLECTION_NOTES, ID.unique(), newNote);
  return response as INote;
};

export const getAllNotes = async (): Promise<INote[]> => {
  const notesFromDB = await DB.listDocuments(DB_ID, COLLECTION_NOTES);
  return notesFromDB.documents as INote[];
};

export const getExactNoteDetails = async (
  noteDatabaseId: string,
  noteCollectionId: string,
  noteDocumentId: string,
): Promise<INote> => {
  const response = await DB.getDocument(noteDatabaseId, noteCollectionId, noteDocumentId);
  return response as INote;
};

export const deleteNote = async (noteId: string): Promise<void> => {
  await DB.deleteDocument(DB_ID, COLLECTION_NOTES, noteId);
};

export const updateNote = async (id: string, text: string): Promise<void> => {
  await DB.updateDocument(DB_ID, COLLECTION_NOTES, id, { description: text });
};
