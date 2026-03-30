import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";
import Card from "../../components/Card";
import ProgressBar from "../../components/ProgressBar";
import { getSchool, getSchoolMembers, getSchoolProjects, getSchoolActivities } from "../../utils/firestoreSchema";

const SchoolDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [school, setSchool] = useState(null);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const s = await getSchool(id);
        if (!s) {
          if (mounted) setSchool(null);
          return;
        }
        const [m, p, a] = await Promise.all([
          getSchoolMembers(id),
          getSchoolProjects(id),
          getSchoolActivities(id, { limitCount: 10 }),
        ]);
        if (!mounted) return;
        setSchool(s);
        setMembers(m);
        setProjects(p);
        setActivities(a);
      } catch {
        if (!mounted) return;
        setSchool(null);
        setMembers([]);
        setProjects([]);
        setActivities([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (!loading && !school) {
    return (
      <PublicLayout>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">School not found</h1>
          <Link to="/public/schools" className="text-emerald-600 font-medium hover:underline">
            Back to schools
          </Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="bg-emerald-700 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <img
            src={school?.profileImageUrl || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop"}
            alt={school?.name || "School"}
            className="w-full max-w-xs h-48 md:h-56 object-cover rounded-2xl border-4 border-white/20 shadow-lg"
          />
          <div>
            <p className="text-emerald-200 text-sm mb-2">Participating school</p>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">{school?.name || "School"}</h1>
            <p className="text-emerald-100">{school?.location || ""}</p>
            <p className="mt-4 text-sm text-emerald-200">
              {activities.length} recent activities
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 mb-2">
              Club president
            </p>
            <p className="text-lg font-semibold text-slate-900">{school?.clubPresident?.name || "—"}</p>
            <p className="text-sm text-slate-600 mt-1">{school?.clubPresident?.detail || ""}</p>
          </Card>
          <Card>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 mb-2">
              Teacher in charge
            </p>
            <p className="text-lg font-semibold text-slate-900">{school?.teacherMentor?.name || "—"}</p>
            <p className="text-sm text-slate-600 mt-1">{school?.teacherMentor?.detail || ""}</p>
          </Card>
          <Card className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 mb-2">
              Total club members
            </p>
            <p className="text-4xl font-bold text-emerald-600">{school?.totalMembers ?? members.length}</p>
          </Card>
        </div>

        <Card>
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Activity progress</h2>
          <div className="space-y-5">
            {projects.map((project) => (
              <ProgressBar
                key={project.id}
                label={project.title || "Progress"}
                progress={Number(project.progress || 0)}
                size="md"
              />
            ))}
            {projects.length === 0 && (
              <p className="text-sm text-slate-600">No projects yet.</p>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Club members</h2>
          <ul className="divide-y divide-slate-100">
            {members.map((m) => (
              <li key={m.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-sm">
                    {(m.name || "?").charAt(0)}
                  </div>
                  <span className="font-medium text-slate-900">{m.name || "Member"}</span>
                </div>
                <span className="text-sm text-slate-500">{m.role || "Member"}</span>
              </li>
            ))}
          </ul>
          {members.length === 0 && <p className="text-sm text-slate-600 mt-3">No members yet.</p>}
        </Card>

        <div className="text-center">
          <Link
            to="/public/schools"
            className="inline-flex text-emerald-700 font-medium hover:underline"
          >
            ← All schools
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
};

export default SchoolDetail;
