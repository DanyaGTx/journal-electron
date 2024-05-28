import dayjs from "dayjs";

export interface INote {
  $id: string;
  name: string;
  description?: string;
  create_date: dayjs.Dayjs;
  $createdAt: string;
  $updatedAt: string;
  $permissions: [];
  $databaseId: string;
  $collectionId: string;
}

export interface INotesDB {
  total: number;
  documents: INote[];
}
