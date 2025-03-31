<script setup lang="ts">
import { ref } from "vue";
import * as XLSX from "xlsx";
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

import type { Transaction } from '@/models/Transaction'
import categories from '../../documents/categories.json'
import people from '../../documents/people.json'
import { Person } from "@/models/Person";

const monthMap: Record<string, string> = {
  "Enero": "01", "Febrero": "02", "Marzo": "03", "Abril": "04",
  "Mayo": "05", "Junio": "06", "Julio": "07", "Agosto": "08",
  "Septiembre": "09", "Octubre": "10", "Noviembre": "11", "Diciembre": "12"
};

const fileInput = ref(null);
const transactionsCollection = collection(db, "transactions"); // Referencia a Firestore

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target?.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.readAsArrayBuffer(file);

  reader.onload = (e) => {
    const data = e.target?.result;
    if (!data) return;
    const workbook = XLSX.read(new Uint8Array(data as ArrayBuffer), { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // Convertir datos a objetos Transaction
    const transactions = jsonData.map((row: any) => {
      return {
        description: row["DescripcionMovimiento"],
        amount: Number(row["Valor"]),
        type: 'income',
        transactionDate: convertToMonthFormat(row["Mes"]),
        createdAt: new Date(),
        updatedAt: new Date(),
        category: categories[4],
        notes: row["DescripcionMovimiento"],
        responsible: findResponsible(row["Responsable"])
      };
    });

    uploadToFirebase(transactions);
  };
};

const uploadToFirebase = async (transactions: any) => {
  for (const transaction of transactions) {
    const formattedTransaction: Transaction = {
      description: transaction.description || "",
      amount: transaction.amount || 0,
      type: transaction.type || "income",
      transactionDate: transaction.transactionDate || "",
      createdAt: new Date(),
      updatedAt: new Date(),
      category: transaction.category || null,
      notes: transaction.notes || "",
      responsible: transaction.responsible,
      responsibleId: transaction.responsible.id
    } as Transaction;

    await addDoc(transactionsCollection, formattedTransaction);
  }
  alert("✅ Transacciones subidas a Firebase!");
}

const convertToMonthFormat = (dateStr: string): string => {
  // Elimina espacios extra y divide por "/"
  const parts = dateStr.replace(/\s+/g, " ").trim().split(" /");
  
  if (parts.length !== 2) return "";

  const monthName = parts[0].trim();
  const year = parts[1].trim();
  const monthNumber = monthMap[monthName];

  return year && monthNumber ? `${year}-${monthNumber}` : "";
};

const findResponsible = (responsible: string): Person => {
  let person = {} as Person;
  if (responsible === "Elber")  {
    person = people[0];
  }
  if (responsible === "Alfonso") {
    person = people[1];
  }
  if (responsible === "David") {
    person = people[2];
  }
  if (responsible === "Wilson") {
    person = people[3];
  }
  if (responsible === "Frijol") {
    person = people[4];
  }
  if (responsible === "Plátano") {
    person = people[5];
  }
  return person;
};
</script>

<template>
  <div>
    <h2>Subir archivo Excel</h2>
    <input type="file" ref="fileInput" @change="handleFileUpload" accept=".xlsx, .xls" />
  </div>
</template>
