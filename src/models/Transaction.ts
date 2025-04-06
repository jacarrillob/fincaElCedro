export interface Transaction {
    id?: string;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    transactionDate: string;
    createdAt: Date; // Fecha de creación del registro
    updatedAt?: Date; // Fecha de última actualización (opcional)
    categoryId?: number; 
    notes?: string; 
    responsibleId?: number; 
  }

  export interface MonthInfo {
    number: string;
    name: string;
  }