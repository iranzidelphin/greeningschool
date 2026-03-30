import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

// ------------------- USERS -------------------
export async function createUser(
  uid,
  email,
  displayName,
  role = "school",
  schoolId = null
) {
  await setDoc(doc(db, "users", uid), {
    uid,
    email,
    displayName,
    photoURL: null,
    role,
    schoolId,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  });
}

export async function getUser(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

// ------------------- ANNOUNCEMENTS -------------------
export async function createAnnouncement(title, message, priority, author) {
  await addDoc(collection(db, "announcements"), {
    title,
    message,
    date: new Date().toISOString().split("T")[0], // yyyy-mm-dd
    priority,
    author,
    createdAt: new Date().toISOString(),
  });
}

export async function getAnnouncements() {
  const snap = await getDocs(collection(db, "announcements"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ------------------- TASKS -------------------
export async function createTask(title, message, priority, author) {
  await addDoc(collection(db, "tasks"), {
    title,
    message,
    date: new Date().toISOString().split("T")[0],
    priority,
    author,
    createdAt: new Date().toISOString(),
  });
}

export async function getTasks() {
  const snap = await getDocs(collection(db, "tasks"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ------------------- SCHOOLS -------------------
export async function createSchool(
  schoolId,
  name,
  location,
  clubPresident,
  teacherMentor
) {
  await setDoc(doc(db, "schools", schoolId), {
    schoolId,
    name,
    location,
    profileImageUrl: null,
    clubPresident,
    teacherMentor,
    totalMembers: 0,
    status: "pending",
    createdAt: new Date().toISOString(),
  });
}

export async function getApprovedSchools() {
  const q = query(collection(db, "schools"), where("status", "==", "approved"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getSchool(schoolId) {
  const snap = await getDoc(doc(db, "schools", schoolId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function setSchoolStatus(schoolId, status) {
  await updateDoc(doc(db, "schools", schoolId), { status });
}

export async function getSchoolMembers(schoolId) {
  const snap = await getDocs(collection(db, "schools", schoolId, "members"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getSchoolProjects(schoolId) {
  const snap = await getDocs(collection(db, "schools", schoolId, "projects"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ------------------- ACTIVITIES -------------------
// activities are stored as a top-level collection for easy public browsing & admin moderation
export async function createActivity(activity) {
  const ref = await addDoc(collection(db, "activities"), {
    ...activity,
    status: activity.status || "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function getApprovedActivities({ limitCount = 50 } = {}) {
  const q = query(
    collection(db, "activities"),
    where("status", "==", "approved"),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getSchoolActivities(schoolId, { limitCount = 50 } = {}) {
  const q = query(
    collection(db, "activities"),
    where("schoolId", "==", schoolId),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function setActivityStatus(activityId, status) {
  await updateDoc(doc(db, "activities", activityId), {
    status,
    updatedAt: new Date().toISOString(),
  });
}

export async function getAllActivities({ limitCount = 200 } = {}) {
  const q = query(
    collection(db, "activities"),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

