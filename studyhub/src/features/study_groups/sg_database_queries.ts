/*
    Functions for creating documents in the firebase database 
    for the study groups.
*/

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase/firebase";

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
    console.log("Document written with ID: ", docRef.id);
}