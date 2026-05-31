/*
    Functions for creating documents in the firebase database 
    for the study groups.
*/

// -------------------------------- Imports --------------------------------
import { app, db } from "@/services/firebase/firebase";
import { GoogleGenAI } from "@google/genai";
import {
  addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc,
  onSnapshot, orderBy, query, serverTimestamp, updateDoc
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const storage = getStorage(app);

// Study group creation and management functions
export async function createStudyGroup(groupName: string,
                          courseCode: string,
                          courseNumber: string,
                          creatorName: string,
                          studyAddress: string,
                          studyRoom: string,
                          studyDate: Date,
                          studyTimeStart: Date,
                          studyTimeEnd: Date,
                          maxStudents: number,
                          isPrivate: boolean

){
    const docRef = await addDoc(collection(db, "study_groups"), {
        groupName: groupName,
        courseCode: courseCode,
        courseNumber: courseNumber,
        creatorName: creatorName,
        studyAddress: studyAddress,
        studyRoom: studyRoom,
        studyDate: studyDate,
        studyTimeStart: studyTimeStart,
        studyTimeEnd: studyTimeEnd,
        maxStudents: maxStudents,
        isPrivate: isPrivate,
        members: [creatorName],
        createdAt: serverTimestamp(),
    });

    await addDoc(collection(db, "study_groups", docRef.id, "chat_messages"), {
        sender: "System",
        message: `${creatorName} Created the group.`,
        timestamp: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
}

export async function joinStudyGroup(groupId: string, studentName: string) {
  await updateDoc(doc(db, "study_groups", groupId), {
    members: arrayUnion(studentName),
  });
}

export async function leaveStudyGroup(groupId: string, studentName: string, userId: string) {
  await Promise.all([
    updateDoc(doc(db, "study_groups", groupId), {
      members: arrayRemove(studentName),
    }),
    updateDoc(doc(db, "users", userId), {
      groupIds: arrayRemove(groupId),
    }),
  ]);
}

export async function deleteStudyGroup(groupId: string) {
    await deleteDoc(doc(db, "study_groups", groupId));
}

export async function  editDate(groupId: string, newDate: Date) {
  await updateDoc(doc(db, "study_groups", groupId), {
    studyDate: newDate,
  });
}

export async function editTime(groupId: string, newStartTime: Date, newEndTime: Date) {
  await updateDoc(doc(db, "study_groups", groupId), {
    studyTimeStart: newStartTime,
    studyTimeEnd: newEndTime,
  });
}

export async function editLocation(groupId: string, newAddress: string, newRoom: string) {
  await updateDoc(doc(db, "study_groups", groupId), {
    studyAddress: newAddress,
    studyRoom: newRoom,
  });
}

export async function editMaxStudents(groupId: string, newMax: number) {
  await updateDoc(doc(db, "study_groups", groupId), {
    maxStudents: newMax,
  });
}

export async function editCourse(groupId: string, newCourseCode: string, newCourseNumber: string) {
  await updateDoc(doc(db, "study_groups", groupId), {
    courseCode: newCourseCode,
    courseNumber: newCourseNumber,
  });
}

// Documents
export async function uploadDocument(groupId : string,
                                     file: File,
                                     uploaderName: string
                                    ){
    const storageRef = ref(storage, `study_groups/${groupId}/docs/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    await addDoc(collection(db, "study_groups", groupId, "docs"),
        {
            name: file.name,
            size: file.size,
            type: file.type,
            url: downloadURL,
            uploadedBy: uploaderName,
            uploadedAt: serverTimestamp()
        }
    );

    console.log("Document uploaded: ", file.name);
}

export async function generateStudyGuide(
  file: File,
  startTime: Date,
  endTime: Date,
  chapters: string,
  groupId: string
) {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const totalMinutes = Math.round((endTime.getTime() - startTime.getTime()) / 60000);

  const prompt = `
You are helping a student plan a focused study session.

Study window: ${startTime.toLocaleString()} to ${endTime.toLocaleString()} (${totalMinutes} minutes total).
Chapters to study: ${chapters}

Using the attached document, create a study guide that:
- Focuses ONLY on the chapters listed above.
- Breaks the available time into a realistic schedule with time blocks.
- For each block, lists the key concepts, definitions, and important points to review.
- Ends with a short list of self-test questions.

Keep it clear and concise so the student can follow it during the session.
`.trim();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        inlineData: {
          mimeType: file.type,
          data: base64,
        },
      },
      { text: prompt },
    ],
  });

  const studyGuide = response.text ?? "No study guide generated.";

  await addDoc(collection(db, "study_groups", groupId), {
    studyGuide: studyGuide,
    createdAt: serverTimestamp(),
  });
}

// Chat functions
export async function sendMessage(
                                 groupId: string,
                                 senderName: string,
                                 message: string
                                 ){
    await addDoc(collection(db, "study_groups", groupId, "chat_messages"), {
        sender: senderName,
        message: message,
        timestamp: serverTimestamp(),
    });
    console.log("Message sent: ", message);
}

export function listenToMessages(
  groupId: string,
  callback: (messages: any[]) => void
) {
  const q = query(
    collection(db, "study_groups", groupId, "chat_messages"),
    orderBy("timestamp", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(messages);
  });
}

