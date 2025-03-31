import { Category } from "./Category";
import { Person } from "./Person";

export interface Transaction {
    id?: string;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    transactionDate: string;
    createdAt: Date; // Fecha de creación del registro
    updatedAt?: Date; // Fecha de última actualización (opcional)
    category?: Category; 
    notes?: string; 
    responsibleId?: number; 
    responsible?: Person;
  }