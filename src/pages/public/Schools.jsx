import React, { useEffect, useMemo, useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import SchoolCard from "../../components/SchoolCard";
import Input from "../../components/Input";
import { getApprovedSchools } from "../../utils/firestoreSchema";

const Schools = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await getApprovedSchools();
        if (mounted) setSchools(data);
      } catch {
        if (mounted) setSchools([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredSchools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return schools;
    return schools.filter(
      (school) =>
        (school.name || "").toLowerCase().includes(q) ||
        (school.location || "").toLowerCase().includes(q)
    );
  }, [schools, searchQuery]);

  return (
    <PublicLayout>
      <div className="bg-emerald-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Participating Schools
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl">
            Discover schools across Rwanda that are making a difference in environmental conservation
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8 max-w-md">
          <Input
            type="text"
            placeholder="Search schools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-emerald-600">{schools.length}</div>
            <div className="text-sm text-gray-600">Total Schools</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {schools.reduce((acc, s) => acc + Number(s.activities || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Activities</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-emerald-600">6</div>
            <div className="text-sm text-gray-600">Districts</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-emerald-600">100%</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
        </div>

        {/* Schools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-slate-600 py-10">
              Loading schools...
            </div>
          ) : (
            filteredSchools.map((school) => (
              <SchoolCard
                key={school.id}
                school={{
                  ...school,
                  profileImage: school.profileImageUrl || school.profileImage,
                }}
                to={`/public/schools/${school.schoolId || school.id}`}
              />
            ))
          )}
        </div>

        {filteredSchools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No schools found</h3>
            <p className="text-gray-600">Try adjusting your search query</p>
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

export default Schools;