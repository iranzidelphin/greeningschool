import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { collection, addDoc, deleteDoc, doc, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../contexts/AuthContext";

const AdminAnnouncements = () => {
  const { user } = useAuth();

  const author = user?.displayName || "Admin";

  const [annTitle, setAnnTitle] = useState("");
  const [annMessage, setAnnMessage] = useState("");
  const [annDate, setAnnDate] = useState(() => new Date().toISOString().slice(0, 10)); // yyyy-mm-dd
  const [annIsPosting, setAnnIsPosting] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskMessage, setTaskMessage] = useState("");
  const [taskDate, setTaskDate] = useState(() => new Date().toISOString().slice(0, 10)); // yyyy-mm-dd
  const [taskIsPosting, setTaskIsPosting] = useState(false);

  const [announcements, setAnnouncements] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const [annSnap, taskSnap] = await Promise.all([
        getDocs(
          query(
            collection(db, "announcements"),
            orderBy("createdAt", "desc"),
            limit(10)
          )
        ),
        getDocs(query(collection(db, "tasks"), orderBy("createdAt", "desc"), limit(10)))
      ]);

      setAnnouncements(annSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setTasks(taskSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      setAnnouncements([]);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handlePostAnnouncement = async (e) => {
    e.preventDefault();
    if (!annTitle.trim() || !annMessage.trim()) return;

    setAnnIsPosting(true);
    try {
      await addDoc(collection(db, "announcements"), {
        title: annTitle.trim(),
        message: annMessage.trim(),
        date: annDate,
        priority: "normal",
        author,
        createdAt: new Date().toISOString()
      });
      setAnnTitle("");
      setAnnMessage("");
      setAnnDate(new Date().toISOString().slice(0, 10));
      await refresh();
    } finally {
      setAnnIsPosting(false);
    }
  };

  const handlePostTask = async (e) => {
    e.preventDefault();
    if (!taskTitle.trim() || !taskMessage.trim()) return;

    setTaskIsPosting(true);
    try {
      await addDoc(collection(db, "tasks"), {
        title: taskTitle.trim(),
        message: taskMessage.trim(),
        date: taskDate,
        priority: "normal",
        author,
        createdAt: new Date().toISOString()
      });
      setTaskTitle("");
      setTaskMessage("");
      setTaskDate(new Date().toISOString().slice(0, 10));
      await refresh();
    } finally {
      setTaskIsPosting(false);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!id) return;
    try {
      await deleteDoc(doc(db, "announcements", id));
      await refresh();
    } catch {
      // ignore
    }
  };

  const handleDeleteTask = async (id) => {
    if (!id) return;
    try {
      await deleteDoc(doc(db, "tasks", id));
      await refresh();
    } catch {
      // ignore
    }
  };

  return (
    <DashboardLayout
      requireAdmin={true}
      title="Announcements"
      subtitle="Create announcements + tasks visible to everyone"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Create New Announcement
          </h2>
          <form onSubmit={handlePostAnnouncement} className="space-y-4">
            <Input
              label="Title"
              placeholder="Enter announcement title"
              value={annTitle}
              onChange={(e) => setAnnTitle(e.target.value)}
              required
            />
            <Input
              label="Date"
              type="date"
              value={annDate}
              onChange={(e) => setAnnDate(e.target.value)}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                placeholder="Enter announcement message..."
                value={annMessage}
                onChange={(e) => setAnnMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                required
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              loading={annIsPosting}
              disabled={!annTitle.trim() || !annMessage.trim()}
              className="w-full"
            >
              Post Announcement
            </Button>
          </form>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Create New Task
          </h2>
          <form onSubmit={handlePostTask} className="space-y-4">
            <Input
              label="Title"
              placeholder="Enter task title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
            />
            <Input
              label="Date"
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                placeholder="Enter task description..."
                value={taskMessage}
                onChange={(e) => setTaskMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                required
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              loading={taskIsPosting}
              disabled={!taskTitle.trim() || !taskMessage.trim()}
              className="w-full"
            >
              Post Task
            </Button>
          </form>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Recent Announcements
          </h2>
          {loading ? (
            <p className="text-sm text-gray-600">Loading...</p>
          ) : (
            <div className="space-y-4">
              {announcements.map((a) => (
                <div key={a.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-start justify-between mb-2 gap-3">
                    <h3 className="font-semibold text-gray-900">{a.title}</h3>
                    <span className="text-xs text-gray-500">{a.date || ""}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{a.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Posted by {a.author}</span>
                    <button
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                      onClick={() => handleDeleteAnnouncement(a.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {announcements.length === 0 && (
                <p className="text-sm text-gray-600">No announcements yet.</p>
              )}
            </div>
          )}
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Tasks</h2>
          {loading ? (
            <p className="text-sm text-gray-600">Loading...</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((t) => (
                <div key={t.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-start justify-between mb-2 gap-3">
                    <h3 className="font-semibold text-gray-900">{t.title}</h3>
                    <span className="text-xs text-gray-500">{t.date || ""}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{t.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Posted by {t.author}</span>
                    <button
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                      onClick={() => handleDeleteTask(t.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {tasks.length === 0 && <p className="text-sm text-gray-600">No tasks yet.</p>}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnnouncements;
