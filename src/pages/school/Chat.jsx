import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  addDoc,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../contexts/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../components/Card";
import Button from "../../components/Button";

const SchoolChat = () => {
  const { user, userData } = useAuth();
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [loadingSchools, setLoadingSchools] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState("");

  const currentSchoolId = userData?.schoolId || null;

  const chatId = useMemo(() => {
    if (!currentSchoolId || !selectedSchool?.schoolId) return null;
    return [currentSchoolId, selectedSchool.schoolId].sort().join("_");
  }, [currentSchoolId, selectedSchool]);

  // Load all schools except the current user's school
  useEffect(() => {
    const fetchSchools = async () => {
      if (!currentSchoolId) return;
      setLoadingSchools(true);
      setError("");
      try {
        const schoolsRef = collection(db, "schools");
        const snapshot = await getDocs(schoolsRef);
        const allSchools = snapshot.docs.map((docSnap) => docSnap.data());
        const otherSchools = allSchools.filter(
          (s) => s.schoolId && s.schoolId !== currentSchoolId
        );
        setSchools(otherSchools);
      } catch (err) {
        console.error("Error fetching schools:", err);
        setError("Failed to load schools. Please try again.");
      } finally {
        setLoadingSchools(false);
      }
    };

    fetchSchools();
  }, [currentSchoolId]);

  // Listen to messages in real time when a chat is selected
  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      return;
    }

    setLoadingMessages(true);
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setMessages(list);
        setLoadingMessages(false);
      },
      (err) => {
        console.error("Error listening for messages:", err);
        setError("Failed to listen for messages.");
        setLoadingMessages(false);
      }
    );

    return () => unsubscribe();
  }, [chatId]);

  const ensureChatDocument = async (otherSchool) => {
    if (!currentSchoolId || !otherSchool?.schoolId) return null;

    const id = [currentSchoolId, otherSchool.schoolId].sort().join("_");
    const chatRef = doc(db, "chats", id);
    const existing = await getDoc(chatRef);

    if (!existing.exists()) {
      await setDoc(chatRef, {
        participants: [currentSchoolId, otherSchool.schoolId],
        createdAt: serverTimestamp(),
        lastMessage: "",
        lastUpdated: serverTimestamp(),
      });
    }

    return id;
  };

  const handleSelectSchool = async (school) => {
    setError("");
    setSelectedSchool(school);
    try {
      await ensureChatDocument(school);
    } catch (err) {
      console.error("Error starting chat:", err);
      setError("Failed to start chat. Please try again.");
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatId || !currentSchoolId || !selectedSchool?.schoolId) return;
    if (!messageText.trim()) return;

    const text = messageText.trim();
    setMessageText("");
    setError("");

    try {
      const messagesRef = collection(db, "chats", chatId, "messages");
      await addDoc(messagesRef, {
        senderId: currentSchoolId,
        receiverId: selectedSchool.schoolId,
        text,
        createdAt: serverTimestamp(),
        read: false,
      });

      // Update chat metadata
      const chatRef = doc(db, "chats", chatId);
      await setDoc(
        chatRef,
        {
          lastMessage: text,
          lastUpdated: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <DashboardLayout title="School Chat" subtitle="Chat with other schools in real time.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
        {/* Left panel: schools list */}
        <Card className="lg:col-span-1 flex flex-col">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">
            Schools
          </h2>
          {loadingSchools ? (
            <p className="text-sm text-slate-500">Loading schools...</p>
          ) : schools.length === 0 ? (
            <p className="text-sm text-slate-500">
              No other schools found to chat with.
            </p>
          ) : (
            <ul className="space-y-2 overflow-y-auto">
              {schools.map((school) => (
                <li key={school.schoolId}>
                  <button
                    type="button"
                    onClick={() => handleSelectSchool(school)}
                    className={`w-full text-left px-3 py-2 rounded-lg border text-sm ${
                      selectedSchool?.schoolId === school.schoolId
                        ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                        : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="font-medium">
                      {school.name || "Unnamed school"}
                    </div>
                    {school.location && (
                      <div className="text-xs text-slate-500">
                        {school.location}
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Right panel: chat */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedSchool ? (
            <>
              <div className="border-b border-slate-100 pb-3 mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Chat with {selectedSchool.name || "School"}
                  </h2>
                  {selectedSchool.location && (
                    <p className="text-xs text-slate-500">
                      {selectedSchool.location}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-1">
                {loadingMessages ? (
                  <p className="text-sm text-slate-500">Loading messages...</p>
                ) : messages.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    No messages yet. Say hello!
                  </p>
                ) : (
                  messages.map((msg) => {
                    const isOwn = msg.senderId === currentSchoolId;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${
                          isOwn ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                            isOwn
                              ? "bg-emerald-600 text-white rounded-br-sm"
                              : "bg-slate-100 text-slate-900 rounded-bl-sm"
                          }`}
                        >
                          <div>{msg.text}</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <form
                onSubmit={handleSendMessage}
                className="mt-auto pt-2 border-t border-slate-100 flex gap-2"
              >
                <input
                  type="text"
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!messageText.trim()}
                >
                  Send
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-slate-500">
              Select a school on the left to start chatting.
            </div>
          )}

          {error && (
            <p className="mt-2 text-xs text-red-500" role="alert">
              {error}
            </p>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SchoolChat;

