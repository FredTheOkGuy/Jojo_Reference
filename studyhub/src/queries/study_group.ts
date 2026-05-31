/*
    Functions for creating documents in the firebase database 
    for the study groups.
*/

import { app, db } from "@/services/firebase/firebase";
import { GoogleGenAI } from "@google/genai";
import { addDoc, arrayRemove, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const storage = getStorage(app);

export async function createStudyGroup(groupName: string,
                          courseCode: string,
                          courseNumber: string,
                          creatorName: string,
                          studyLocation: string,
                          studyDateAndTime: Date,
                          maxStudents: number
){
    const docRef = await addDoc(collection(db, "study_groups"), {
        groupName: groupName,
        courseCode: courseCode,
        courseNumber: courseNumber,
        creatorName: creatorName,
        studyLocation: studyLocation,
        studyDateAndTime: studyDateAndTime,
        maxStudents: maxStudents,
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

export async function leaveStudyGroup(groupId: string, studentName: string) {
  await updateDoc(doc(db, "study_groups", groupId), {
    members: arrayRemove(studentName),
  });
}

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