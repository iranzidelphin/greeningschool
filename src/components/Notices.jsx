import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import Card from "./Card";

const formatDate = (value) => {
  try {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (typeof value?.toDate === "function") return value.toDate().toLocaleDateString();
  } catch {
    // ignore
  }
  return "";
};

const Notices = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const [annSnap, taskSnap] = await Promise.all([
          getDocs(
            query(
              collection(db, "announcements"),
              orderBy("createdAt", "desc"),
              limit(3)
            )
          ),
          getDocs(
            query(collection(db, "tasks"), orderBy("createdAt", "desc"), limit(3))
          )
        ]);

        if (!mounted) return;

        setAnnouncements(
          annSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
        );
        setTasks(taskSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        // Keep UI working even if collections aren't created yet.
        if (!mounted) return;
        setAnnouncements([]);
        setTasks([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return null;
  if ((!announcements || announcements.length === 0) && (!tasks || tasks.length === 0))
    return null;

  return (
    <section className="max-w-7xl mx-auto mb-10 px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Announcements</h2>
          <div className="space-y-3">
            {announcements.map((a) => (
              <div key={a.id} className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-100">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{a.title}</p>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{a.message}</p>
                  </div>
                  <span className="text-xs text-slate-500 shrink-0">
                    {formatDate(a.date || a.createdAt)}
                  </span>
                </div>
              </div>
            ))}
            {announcements.length === 0 && (
              <p className="text-sm text-slate-600">No announcements yet.</p>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Tasks</h2>
          <div className="space-y-3">
            {tasks.map((t) => (
              <div key={t.id} className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-100">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{t.title}</p>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{t.message}</p>
                  </div>
                  <span className="text-xs text-slate-500 shrink-0">
                    {formatDate(t.date || t.createdAt)}
                  </span>
                </div>
              </div>
            ))}
            {tasks.length === 0 && <p className="text-sm text-slate-600">No tasks yet.</p>}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Notices;

