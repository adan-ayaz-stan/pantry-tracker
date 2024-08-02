"use server";

import { db, storage } from "@/lib/db/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { auth } from "@clerk/nextjs/server";
import { convertToSlug } from "@/lib/utils";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  orderBy,
  query,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";

type TaddPantryItem = {
  image: string;
  title: string;
  expiration_date: Date;
  type: string;
  quantity: number;
};
export async function addPantryItem(item: TaddPantryItem) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const slug = convertToSlug(
      item.title + " " + item.expiration_date + " " + item.type
    );
    const userItemStorageRef = ref(
      storage,
      "users/" + userId + "/" + slug + ".png"
    );

    await uploadString(userItemStorageRef, item.image, "base64")
      .then(async (value) => {
        // Get image URL
        const url = await getDownloadURL(value.ref);

        // Get firestore
        await setDoc(doc(db, "users", userId, "pantry", slug + ".png"), {
          title: item.title,
          expiration_date: item.expiration_date,
          type: item.type,
          quantity: item.quantity,
          image: url,
        });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  } catch (err) {
    throw err;
  }
}

// GET PANTRY ITEMS

export type TgetPantryItem = {
  id: string;
  title: string;
  expiration_date: Timestamp;
  type: string;
  quantity: number;
  image: string;
};

export async function getPantryItems() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const itemsRef = collection(db, "users", userId, "pantry");
    const q = query(itemsRef, orderBy("expiration_date", "asc"));

    const items = await getDocs(q);

    const data: TgetPantryItem[] = [];

    items.forEach((item) => {
      const pantryItem = item.data() as TgetPantryItem;

      data.push({
        ...pantryItem,
        id: item.id,
        expiration_date: pantryItem.expiration_date.toDate() as any,
      });
    });

    return data;
  } catch (err) {
    throw err;
  }
}

// Get Item Image
export async function getItemImageURL(fullpath: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const imageRef = ref(storage, fullpath);

    return await getDownloadURL(imageRef);
  } catch (err) {
    throw err;
  }
}

// Delete Pantry Item
export async function deletePantryItem(id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    await deleteDoc(doc(db, "users", userId, "pantry", id));
  } catch (err) {
    throw err;
  }
}
