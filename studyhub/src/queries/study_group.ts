/*
    Functions for creating documents in the firebase database 
    for the study groups.
*/

import { app, db } from "@/services/firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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