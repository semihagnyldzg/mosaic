'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/auth-provider';
import { createClient } from '@/lib/supabase/client';

interface SchoolRow {
  id: string;
  name: string;
  class_count?: number;
  student_count?: number;
}

export default function DistrictDashboard() {
  const { profile, signOut, loading: authLoading } = useAuth();
  const [schools, setSchools] = useState<SchoolRow[]>([]);
  const [districtName, setDistrictName] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (authLoading) return;
    if (!profile || profile.role !== 'district_admin') {
      router.push('/login');
      return;
    }

    const fetchDistrictData = async () => {
      try {
        // Fetch district details
        const { data: distData } = await supabase
          .from('districts')
          .select('name')
          .eq('id', profile.district_id)
          .single();

        if (distData) setDistrictName(distData.name);

        // Fetch schools belonging to this district
        const { data: schoolsData } = await supabase
          .from('schools')
          .select('id, name')
          .eq('district_id', profile.district_id);

        if (schoolsData) {
          const enrichedSchools = await Promise.all(
            schoolsData.map(async (school) => {
              // Get class count
              const { count: classCount } = await supabase
                .from('classes')
                .select('*', { count: 'exact', head: true })
                .eq('school_id', school.id);

              // Get student count
              const { count: studentCount } = await supabase
                .from('students')
                .select('*', { count: 'exact', head: true })
                .eq('school_id', school.id);

              return {
                ...school,
                class_count: classCount || 0,
                student_count: studentCount || 0,
              };
            })
          );
          setSchools(enrichedSchools);
        }
      } catch (err) {
        console.error('Error loading district details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDistrictData();
  }, [profile, authLoading, router, supabase]);

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#F9F8FC] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-[#5C2483]/30 border-t-[#5C2483] rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8FC] p-6 lg:p-10">
      <header className="max-w-6xl mx-auto flex justify-between items-center border-b border-zinc-200/60 pb-6 mb-8">
        <div>
          <div className="text-[#5C2483] text-xs font-bold tracking-wider uppercase">⚡ DISTRICT ADMIN PORTAL</div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight mt-1">
            {districtName || 'Springfield District'}
          </h1>
          <p className="text-zinc-600 text-sm mt-1">Signed in as {profile?.first_name} {profile?.last_name}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 py-2.5 px-5 rounded-md font-semibold text-sm transition-colors"
        >
          Sign Out
        </button>
        <a
          href="/index.html"
          target="_blank"
          className="ml-4 bg-[#5C2483]/10 border border-[#5C2483]/20 text-[#5C2483] hover:bg-[#5C2483]/20 py-2.5 px-5 rounded-md font-semibold text-sm transition-colors"
        >
          📚 Explore Curriculum
        </a>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        {/* District Overview Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-6 shadow-xl">
            <h3 className="text-zinc-600 text-sm font-semibold tracking-wider uppercase">District Schools</h3>
            <p className="text-3xl font-extrabold text-zinc-900 mt-2">{schools.length}</p>
          </div>
          <div className="bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-6 shadow-xl">
            <h3 className="text-zinc-600 text-sm font-semibold tracking-wider uppercase">Total Classrooms</h3>
            <p className="text-3xl font-extrabold text-zinc-900 mt-2">
              {schools.reduce((acc, curr) => acc + (curr.class_count || 0), 0)}
            </p>
          </div>
          <div className="bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-6 shadow-xl">
            <h3 className="text-zinc-600 text-sm font-semibold tracking-wider uppercase">Total Student Roster</h3>
            <p className="text-3xl font-extrabold text-zinc-900 mt-2">
              {schools.reduce((acc, curr) => acc + (curr.student_count || 0), 0)}
            </p>
          </div>
        </section>

        {/* School Directory table */}
        <section className="bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">School Directory</h2>
          {schools.length === 0 ? (
            <div className="text-center py-12 text-zinc-600">No schools enrolled in this district.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 text-xs font-bold text-[#5C2483] uppercase tracking-wider">
                    <th className="pb-3 pr-4">School Name</th>
                    <th className="pb-3 px-4">Classrooms</th>
                    <th className="pb-3 pl-4">Students Enrolled</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-base">
                  {schools.map(school => (
                    <tr key={school.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 pr-4 font-semibold text-zinc-900">{school.name}</td>
                      <td className="py-4 px-4 text-zinc-600">{school.class_count} classes</td>
                      <td className="py-4 pl-4 text-zinc-600">{school.student_count} students</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
