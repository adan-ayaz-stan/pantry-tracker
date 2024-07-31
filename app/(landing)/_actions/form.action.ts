"use server";

import { db } from "@/lib/db/firebase";
import { doc, setDoc } from "firebase/firestore";

type SubmitData = {
  name: string;
  email: string;
  message: string;
};

export async function submitForm(data: SubmitData) {
  const { name, email, message } = data;

  try {
    await setDoc(doc(db, "messages", email + ` at ${new Date()}`), {
      name,
      email,
      message,
    });
    return true;
  } catch (err) {
    return false;
  }
}
