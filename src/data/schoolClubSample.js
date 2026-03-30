/**
 * Sample club / school data for UI. Replace with API/Firestore in production.
 */

export const loggedInSchoolProfile = {
  name: "Green Valley High School",
  location: "Kigali, Rwanda",
  profileImage:
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
  clubPresident: {
    name: "Jean Uwase",
    detail: "Student leader — Senior 6",
  },
  teacherMentor: {
    name: "Mrs. Claire Mukamana",
    detail: "ARCOS club mentor / Biology",
  },
  totalMembers: 28,
  members: [
    { id: 1, name: "Jean Uwase", role: "President" },
    { id: 2, name: "Marie Ingabire", role: "Vice President" },
    { id: 3, name: "Eric Ndayisaba", role: "Secretary" },
    { id: 4, name: "Grace Uwimana", role: "Treasurer" },
    { id: 5, name: "David Habimana", role: "Member" },
    { id: 6, name: "Sandrine Kayitesi", role: "Member" },
    { id: 7, name: "Patrick Nkurunziza", role: "Member" },
    { id: 8, name: "Divine Ishimwe", role: "Member" },
  ],
  activityProjects: [
    { id: 1, title: "Campus tree planting", progress: 85 },
    { id: 2, title: "Plastic recycling drive", progress: 62 },
    { id: 3, title: "Solar awareness week", progress: 40 },
    { id: 4, title: "Community clean-up", progress: 95 },
  ],
};

export const publicSchoolsDetailed = [
  {
    id: 1,
    name: "Kigali International Academy",
    location: "Kigali, Rwanda",
    activities: 45,
    status: "approved",
    joinedDate: "January 15, 2022",
    profileImage:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
    clubPresident: { name: "Aline Uwase", detail: "Student leader" },
    teacherMentor: { name: "Mr. James Nkurunziza", detail: "Environmental science" },
    totalMembers: 42,
    members: [
      { id: 1, name: "Aline Uwase", role: "President" },
      { id: 2, name: "Kevin Mugisha", role: "Vice President" },
      { id: 3, name: "Yvette Mukamana", role: "Secretary" },
      { id: 4, name: "Bosco Ndayisaba", role: "Member" },
    ],
    activityProjects: [
      { id: 1, title: "Urban garden", progress: 78 },
      { id: 2, title: "Waste sorting", progress: 55 },
      { id: 3, title: "Water conservation", progress: 90 },
    ],
  },
  {
    id: 2,
    name: "Eco Warriors High School",
    location: "Musanze, Rwanda",
    activities: 32,
    status: "approved",
    joinedDate: "March 22, 2022",
    profileImage:
      "https://images.unsplash.com/photo-1580582932707-520aed937d7a?w=800&h=600&fit=crop",
    clubPresident: { name: "Thierry Habineza", detail: "Student leader" },
    teacherMentor: { name: "Ms. Diane Uwimana", detail: "Club supervisor" },
    totalMembers: 35,
    members: [
      { id: 1, name: "Thierry Habineza", role: "President" },
      { id: 2, name: "Chantal Mukamana", role: "Treasurer" },
      { id: 3, name: "Eric Nsengiyumva", role: "Member" },
    ],
    activityProjects: [
      { id: 1, title: "Forest awareness hike", progress: 70 },
      { id: 2, title: "Composting pilot", progress: 45 },
    ],
  },
  {
    id: 3,
    name: "Green Sprouts Primary",
    location: "Huye, Rwanda",
    activities: 28,
    status: "approved",
    joinedDate: "May 10, 2022",
    profileImage:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
    clubPresident: { name: "Ineza Kayitesi", detail: "Student leader" },
    teacherMentor: { name: "Mr. Paul Niyonzima", detail: "Teacher in charge" },
    totalMembers: 24,
    members: [
      { id: 1, name: "Ineza Kayitesi", role: "President" },
      { id: 2, name: "Fabrice Ndayishimiye", role: "Member" },
    ],
    activityProjects: [
      { id: 1, title: "School garden", progress: 88 },
      { id: 2, title: "Paper recycling", progress: 50 },
    ],
  },
  {
    id: 4,
    name: "Rwanda Environmental School",
    location: "Rubavu, Rwanda",
    activities: 56,
    status: "approved",
    joinedDate: "July 5, 2022",
    profileImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
    clubPresident: { name: "Olivier Nkurikiye", detail: "Student leader" },
    teacherMentor: { name: "Mrs. Béatrice Uwase", detail: "Mentor" },
    totalMembers: 51,
    members: [
      { id: 1, name: "Olivier Nkurikiye", role: "President" },
      { id: 2, name: "Diane Mukamana", role: "Secretary" },
    ],
    activityProjects: [
      { id: 1, title: "Lake shore clean-up", progress: 72 },
      { id: 2, title: "Eco club newsletter", progress: 60 },
    ],
  },
  {
    id: 5,
    name: "Sustainable Future Academy",
    location: "Nyagatare, Rwanda",
    activities: 19,
    status: "approved",
    joinedDate: "September 18, 2022",
    profileImage:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",
    clubPresident: { name: "Samuel Ndayisaba", detail: "Student leader" },
    teacherMentor: { name: "Mr. Emmanuel Habimana", detail: "Supervisor" },
    totalMembers: 18,
    members: [
      { id: 1, name: "Samuel Ndayisaba", role: "President" },
    ],
    activityProjects: [
      { id: 1, title: "Energy audit", progress: 35 },
    ],
  },
  {
    id: 6,
    name: "Nature Guardians School",
    location: "Karongi, Rwanda",
    activities: 41,
    status: "approved",
    joinedDate: "November 3, 2022",
    profileImage:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=600&fit=crop",
    clubPresident: { name: "Ange Uwimana", detail: "Student leader" },
    teacherMentor: { name: "Ms. Florence Niyonsaba", detail: "Teacher in charge" },
    totalMembers: 33,
    members: [
      { id: 1, name: "Ange Uwimana", role: "President" },
      { id: 2, name: "Eric Nsabimana", role: "Member" },
    ],
    activityProjects: [
      { id: 1, title: "Birdwatching & habitat", progress: 65 },
      { id: 2, title: "Reforestation partner site", progress: 58 },
    ],
  },
];

export function getPublicSchoolById(id) {
  const numericId = Number(id);
  return publicSchoolsDetailed.find((s) => s.id === numericId) || null;
}
